const mongoose = require('mongoose');

const ProfileAdminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactNumber: { type: String },
  permissions: [String],
}, { timestamps: true });

module.exports = mongoose.model('ProfileAdmin', ProfileAdminSchema);