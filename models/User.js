// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  instruments: {
    type: [String],
    required: false
  },
  bands: {
    type: [String],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
