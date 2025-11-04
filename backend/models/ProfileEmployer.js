const mongoose = require('mongoose');

const ProfileEmployerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: String,
  companyDescription: String,
  logoUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('ProfileEmployer', ProfileEmployerSchema);
