const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const JobApplication = require('../models/JobApplication');
const { requireAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up upload directory for CVs
const uploadDir = path.join(__dirname, '../../frontend/public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ── PUBLIC ROUTES ──────────────────────────────────────────────────────────

// Helper to seed default careers
async function ensureDefaultCareers() {
  try {
    const count = await Career.countDocuments();
    if (count === 0) {
      await Career.insertMany([
        {
          title: "Full Stack Web Developer",
          deadline: "2026-06-30",
          description: "We are looking for a passionate MERN stack developer to build and scale interactive landing pages, dashboards, and database integrations. Experience with React, Node.js, and state management is a plus."
        },
        {
          title: "Drone Hardware Engineer",
          deadline: "2026-07-15",
          description: "Join our R&D lab to prototype advanced carbon-fiber drone structures and optimize computational aerodynamics. Experience with CFD simulation, carbon compositing, and circuit design is required."
        }
      ]);
      console.log('Seeded default careers successfully.');
    }
  } catch (err) {
    console.error("Failed to seed default careers:", err);
  }
}

// Seed careers once on backend startup
ensureDefaultCareers();

// GET /api/careers - Fetch all career listings
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({}).sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch careers: ' + error.message });
  }
});

// POST /api/careers/apply - Submit application with CV upload
router.post('/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, mobile, interestedRole, qualification } = req.body;
    if (!name || !email || !mobile || !interestedRole) {
      return res.status(400).json({ error: 'Name, email, mobile, and job title are required' });
    }

    let resumeUrl = '';
    if (req.file) {
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    const application = new JobApplication({
      name,
      email,
      mobile,
      qualification: qualification || 'N/A',
      interestedRole,
      resumeUrl
    });

    await application.save();
    res.status(201).json({ success: true, application });
  } catch (error) {
    console.error('Job application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application: ' + error.message });
  }
});

// ── ADMIN ROUTES ───────────────────────────────────────────────────────────

// POST /api/careers - Add a new career listing
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, deadline, description } = req.body;
    if (!title || !deadline || !description) {
      return res.status(400).json({ error: 'Title, deadline, and description are required' });
    }

    const career = new Career({ title, deadline, description });
    await career.save();
    res.status(201).json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add career: ' + error.message });
  }
});

// PUT /api/careers/:id - Update an existing career listing
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { title, deadline, description } = req.body;
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }

    if (title !== undefined) career.title = title;
    if (deadline !== undefined) career.deadline = deadline;
    if (description !== undefined) career.description = description;

    await career.save();
    res.json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update career: ' + error.message });
  }
});

// DELETE /api/careers/:id - Delete a career listing
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete career: ' + error.message });
  }
});

// GET /api/careers/applications - Retrieve all submissions
router.get('/applications', requireAdmin, async (req, res) => {
  try {
    const applications = await JobApplication.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + error.message });
  }
});

// PUT /api/careers/applications/:id/status - Update application status (Admin only)
router.put('/applications/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    if (status !== undefined) application.status = status;
    await application.save();
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status: ' + error.message });
  }
});

// DELETE /api/careers/applications/:id - Delete an application
router.delete('/applications/:id', requireAdmin, async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application: ' + error.message });
  }
});

module.exports = router;
