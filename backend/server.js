require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ──────────────────────────────────────────────────────────────
const rawFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
let frontendOrigin = rawFrontendUrl.trim();
try {
  const urlObj = new URL(frontendOrigin);
  frontendOrigin = urlObj.origin;
} catch (e) {
  // Keep original if it doesn't parse as a standard URL
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || frontendOrigin === origin || origin.match(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

const path = require('path');
const uploadDir = path.join(__dirname, '../frontend/public/uploads');
app.use('/uploads', express.static(uploadDir));

// ── Request Logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cms', require('./routes/cms'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/leads', require('./routes/leads'));

app.get('/', (req, res) => {
  res.send('Laara Innovations MERN Backend is running!');
});

// ── Health check (useful for deployment platforms) ───────────────────────────
app.get('/api/health', async (req, res) => {
  const mongoose = require('mongoose');
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', database: dbStatus, timestamp: new Date().toISOString() });
});

// ── Start server only after DB connects ─────────────────────────────────────
const start = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('⚠️ Warning: Database connection failed during startup. The server will run, but database operations will fail.');
  }

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
