const express = require('express');
const router = express.Router();
const PageBlock = require('../models/PageBlock');
const { requireAdmin } = require('../middleware/auth');

// Helper to ensure default config and nav blocks exist
async function ensureDefaultBlocks() {
  try {
    let config = await PageBlock.findOne({ type: 'SYSTEM_CONFIG' });
    if (!config) {
      const defaultConfig = {
        siteName: "Laara Innovations",
        contactEmail: "info@laarainnovations.com",
        clientCountLimit: 120,
        yearsOfExperience: 3,
        siteLogo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg",
        adminEmails: "admin@laarainnovations.com,vishnu24.igm@gmail.com,afsheenmd2006@gmail.com,laarainnovations26@gmail.com"
      };
      config = new PageBlock({
        type: 'SYSTEM_CONFIG',
        title: 'System Configuration',
        content: JSON.stringify(defaultConfig),
        order: 0,
        isActive: true
      });
      await config.save();
    }

    let navLinks = await PageBlock.findOne({ type: 'NAV_LINKS' });
    if (!navLinks) {
      const defaultNavLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/drone-rd", label: "Research" },
        { href: "/software", label: "Products" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact Us" }
      ];
      navLinks = new PageBlock({
        type: 'NAV_LINKS',
        title: 'Navigation Links',
        content: JSON.stringify(defaultNavLinks),
        order: 1,
        isActive: true
      });
      await navLinks.save();
    }

    let papersBlock = await PageBlock.findOne({ type: 'RESEARCH_PAPERS' });
    if (!papersBlock) {
      const defaultPapers = [
        {
          id: "1",
          title: "Aerodynamic Optimization of Quad-Blade Propellers",
          type: "Whitepaper",
          date: "2024-03",
          category: "Aerodynamics",
          size: "2.4 MB",
          fileUrl: ""
        },
        {
          id: "2",
          title: "Carbon Fiber Composite Material Analysis",
          type: "Technical Spec",
          date: "2024-02",
          category: "Materials",
          size: "1.8 MB",
          fileUrl: ""
        },
        {
          id: "3",
          title: "Noise Reduction in High-RPM Propellers",
          type: "Research Paper",
          date: "2024-01",
          category: "Acoustics",
          size: "3.1 MB",
          fileUrl: ""
        },
        {
          id: "4",
          title: "Thrust-to-Weight Ratio Benchmarking Study",
          type: "Benchmark Report",
          date: "2023-12",
          category: "Performance",
          size: "4.2 MB",
          fileUrl: ""
        },
        {
          id: "5",
          title: "Graphene-Enhanced Blade Manufacturing Process",
          type: "Technical Spec",
          date: "2023-11",
          category: "Manufacturing",
          size: "2.9 MB",
          fileUrl: ""
        }
      ];
      papersBlock = new PageBlock({
        type: 'RESEARCH_PAPERS',
        title: 'Research Papers',
        content: JSON.stringify(defaultPapers),
        order: 10,
        isActive: true
      });
      await papersBlock.save();
    }

    let milestonesBlock = await PageBlock.findOne({ type: 'PROJECT_MILESTONES' });
    if (!milestonesBlock) {
      const defaultMilestones = [
        {
          id: "1",
          title: "Concept Development",
          description: "Initial design parameters and theoretical framework",
          status: "completed",
          date: "Q1 2024"
        },
        {
          id: "2",
          title: "Computational Modeling",
          description: "CFD simulations and aerodynamic analysis",
          status: "completed",
          date: "Q2 2024"
        },
        {
          id: "3",
          title: "Material Selection",
          description: "Testing composite materials for optimal performance",
          status: "completed",
          date: "Q3 2024"
        },
        {
          id: "4",
          title: "Prototype Manufacturing",
          description: "First physical prototypes in production",
          status: "in-progress",
          date: "Q4 2024"
        },
        {
          id: "5",
          title: "Wind Tunnel Testing",
          description: "Real-world aerodynamic validation",
          status: "upcoming",
          date: "Q1 2025"
        },
        {
          id: "6",
          title: "Field Trials",
          description: "Live drone testing and performance optimization",
          status: "upcoming",
          date: "Q2 2025"
        }
      ];
      milestonesBlock = new PageBlock({
        type: 'PROJECT_MILESTONES',
        title: 'Project Milestones',
        content: JSON.stringify(defaultMilestones),
        order: 11,
        isActive: true
      });
      await milestonesBlock.save();
    }
  } catch (error) {
    console.error('Error seeding default blocks:', error);
  }
}

// Get all active blocks
router.get('/blocks', async (req, res) => {
  try {
    await ensureDefaultBlocks();
    const blocks = await PageBlock.find({ isActive: true }).sort({ order: 1 });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

// Get system config
router.get('/config', async (req, res) => {
  try {
    await ensureDefaultBlocks();
    const config = await PageBlock.findOne({ type: 'SYSTEM_CONFIG' });
    res.json(config ? JSON.parse(config.content) : null);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch config' });
  }
});

// ─── ADMIN-ONLY WRITES ───────────────────────────────────────────────────────
// All routes below require the requesting user to be in ADMIN_EMAILS

// Add a new block
router.post('/blocks', requireAdmin, async (req, res) => {
  try {
    const newBlock = new PageBlock(req.body);
    await newBlock.save();
    res.status(201).json({ success: true, block: newBlock });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add block' });
  }
});

// Update a block
router.put('/blocks/:id', requireAdmin, async (req, res) => {
  try {
    const existingBlock = await PageBlock.findById(req.params.id);
    if (!existingBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    let mergedContent = req.body.content;
    if (existingBlock.type === 'SYSTEM_CONFIG' && req.body.content) {
      try {
        const oldData = JSON.parse(existingBlock.content || '{}');
        const newData = JSON.parse(req.body.content || '{}');
        mergedContent = JSON.stringify({ ...oldData, ...newData });
      } catch (e) {
        console.error('Failed to merge config content:', e);
      }
    }

    existingBlock.content = mergedContent;
    if (req.body.title !== undefined) existingBlock.title = req.body.title;
    if (req.body.order !== undefined) existingBlock.order = req.body.order;
    if (req.body.isActive !== undefined) existingBlock.isActive = req.body.isActive;

    await existingBlock.save();
    res.json({ success: true, block: existingBlock });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update block: ' + error.message });
  }
});



// Delete a block
router.delete('/blocks/:id', requireAdmin, async (req, res) => {
  try {
    await PageBlock.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete block' });
  }
});

// ─── FILE UPLOAD FOR CMS ─────────────────────────────────────────────────────
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

router.post('/upload', requireAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file: ' + error.message });
  }
});

module.exports = router;
