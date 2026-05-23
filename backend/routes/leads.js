const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { requireAdmin } = require('../middleware/auth');

// POST /api/leads - Submit a new contact query
router.post('/', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const lead = new Lead({
      name,
      email,
      company: company || '',
      message
    });

    await lead.save();
    res.status(201).json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save query: ' + error.message });
  }
});

// GET /api/leads - Get all contact queries (Admin only)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queries: ' + error.message });
  }
});

// PUT /api/leads/:id - Update contact query status (Admin only)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Query not found' });
    }
    if (status !== undefined) lead.status = status;
    await lead.save();
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update query status: ' + error.message });
  }
});

// DELETE /api/leads/:id - Delete a contact query (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete query: ' + error.message });
  }
});

module.exports = router;
