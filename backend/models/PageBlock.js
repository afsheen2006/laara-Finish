const mongoose = require('mongoose');

const pageBlockSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PageBlock', pageBlockSchema);
