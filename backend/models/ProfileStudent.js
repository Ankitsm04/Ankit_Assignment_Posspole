const mongoose = require('mongoose');

const ProfileStudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phoneNumber: String,
  education: String,
  skills: [String],
  resumeUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('ProfileStudent', ProfileStudentSchema);
