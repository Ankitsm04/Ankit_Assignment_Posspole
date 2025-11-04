const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-time', 'Internship'], required: true },
  salary: Number,
  description: { type: String, required: true },
  requiredSkills: [String],
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
