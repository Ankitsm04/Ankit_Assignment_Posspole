const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    const resumePath = req.file ? req.file.path : null;

    const existingApp = await Application.findOne({ student: req.user.id, job: jobId });
    if (existingApp) 
      return res.status(400).json({ msg: 'Already applied' });

    const application = new Application({
      student: req.user.id,
      job: jobId,
      resumeUrl: resumePath,
      coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id }).populate('job');
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
