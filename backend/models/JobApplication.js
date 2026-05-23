const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String },
  interestedRole: { type: String, required: true },
  resumeUrl: { type: String },
  status: { type: String, default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
