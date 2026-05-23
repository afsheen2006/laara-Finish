const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'USER' },
  image: { type: String },
  occupation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
