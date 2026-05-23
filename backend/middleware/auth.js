const PageBlock = require('../models/PageBlock');

/**
 * requireAdmin middleware
 * Reads the user's email from the Authorization header (Bearer <email>)
 * or from x-user-email header, then checks it against ADMIN_EMAILS.
 * 
 * In production, replace with JWT verification.
 */
const requireAdmin = async (req, res, next) => {
  // Accept email via x-user-email header OR a simple bearer token that IS the email
  const authHeader = req.headers['authorization'] || '';
  const emailHeader = req.headers['x-user-email'] || '';

  const email = emailHeader || authHeader.replace('Bearer ', '').trim();

  if (!email) {
    return res.status(401).json({ error: 'Unauthorized: No user email provided' });
  }

  try {
    const adminEmailsStr = process.env.ADMIN_EMAILS || '';
    const adminEmails = adminEmailsStr.split(',').map(e => e.trim().toLowerCase());

    // Retrieve dynamically added admin emails from database SYSTEM_CONFIG block
    const configBlock = await PageBlock.findOne({ type: 'SYSTEM_CONFIG' });
    if (configBlock) {
      try {
        const configContent = JSON.parse(configBlock.content || '{}');
        if (configContent.adminEmails) {
          const dbEmails = configContent.adminEmails.split(',').map(e => e.trim().toLowerCase());
          adminEmails.push(...dbEmails);
        }
      } catch (e) {
        console.error('Error parsing adminEmails in middleware:', e);
      }
    }

    if (!adminEmails.includes(email.toLowerCase())) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    req.userEmail = email.toLowerCase();
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Auth middleware internal error: ' + error.message });
  }
};

module.exports = { requireAdmin };
