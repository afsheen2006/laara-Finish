const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  projectType: { type: String },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'NEW' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
