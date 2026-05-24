require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

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
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
