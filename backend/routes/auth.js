const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Google credential token is required' });
    }

    // Verify the Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { name, email, picture: image } = payload;

    if (!email) {
      return res.status(400).json({ error: 'Email could not be retrieved from Google ID token' });
    }

    // Check if this email is in the pre-defined admin list
    const adminEmailsStr = process.env.ADMIN_EMAILS || "";
    const adminEmails = adminEmailsStr.split(",").map(e => e.trim().toLowerCase());

    // Check database system config for dynamic admin emails
    const PageBlock = require('../models/PageBlock');
    const configBlock = await PageBlock.findOne({ type: 'SYSTEM_CONFIG' });
    if (configBlock) {
      try {
        const configContent = JSON.parse(configBlock.content || '{}');
        if (configContent.adminEmails) {
          const dbEmails = configContent.adminEmails.split(',').map(e => e.trim().toLowerCase());
          adminEmails.push(...dbEmails);
        }
      } catch (e) {
        console.error('Error parsing adminEmails in google login:', e);
      }
    }

    const isAdmin = adminEmails.includes(email.toLowerCase());
    const role = isAdmin ? "ADMIN" : "USER";

    // Find and update or create (no duplicates)
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      user.name = name || user.name;
      user.image = image || user.image;
      user.role = role; // Update role in case env configuration changed
      await user.save();
    } else {
      user = new User({
        name,
        email: email.toLowerCase(),
        image,
        role
      });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Google Auth backend error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// ─── USER MANAGEMENT (RBAC) ──────────────────────────────────────────────────

// GET /api/auth/users - List all users
router.get('/users', async (req, res) => {
  try {
    const adminEmailsStr = process.env.ADMIN_EMAILS || "";
    const adminEmails = adminEmailsStr.split(",").map(e => e.trim().toLowerCase());

    const PageBlock = require('../models/PageBlock');
    const configBlock = await PageBlock.findOne({ type: 'SYSTEM_CONFIG' });
    if (configBlock) {
      try {
        const configContent = JSON.parse(configBlock.content || '{}');
        if (configContent.adminEmails) {
          const dbEmails = configContent.adminEmails.split(',').map(e => e.trim().toLowerCase());
          adminEmails.push(...dbEmails);
        }
      } catch (e) {
        console.error('Error parsing adminEmails in users listing:', e);
      }
    }

    const callerEmail = req.headers['x-user-email'];

    if (!callerEmail || !adminEmails.includes(callerEmail.toLowerCase())) {
      return res.status(403).json({ error: 'Access denied: caller is not an admin' });
    }

    const users = await User.find({}).sort({ createdAt: -1 });
    const formatted = users.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      image: u.image
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
  }
});

// POST /api/auth/users - Add a new admin or user
router.post('/users', async (req, res) => {
  try {
    const callerEmail = req.headers['x-user-email'];
    const caller = await User.findOne({ email: callerEmail?.toLowerCase() });
    if (!caller || (caller.role !== 'ADMIN' && caller.role !== 'MASTER')) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, email, role, password } = req.body;
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      role,
      password // Plain text or placeholder is fine as primary login is Google SSO
    });
    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user: ' + error.message });
  }
});

// PUT /api/auth/users/:id/role - Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const callerEmail = req.headers['x-user-email'];
    const caller = await User.findOne({ email: callerEmail?.toLowerCase() });
    if (!caller || caller.role !== 'MASTER') {
      return res.status(403).json({ error: 'Access denied: Only Master Admin can manage roles' });
    }

    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role: ' + error.message });
  }
});

// DELETE /api/auth/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const callerEmail = req.headers['x-user-email'];
    const caller = await User.findOne({ email: callerEmail?.toLowerCase() });
    if (!caller || caller.role !== 'MASTER') {
      return res.status(403).json({ error: 'Access denied: Only Master Admin can delete users' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user: ' + error.message });
  }
});

module.exports = router;
