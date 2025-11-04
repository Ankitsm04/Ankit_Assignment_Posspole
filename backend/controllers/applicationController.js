const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  const { jobId, resumeUrl, coverLetter } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    const existingApplication = await Application.findOne({
      student: req.user.id,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({ msg: 'Already applied to this job' });
    }

    const application = new Application({
      student: req.user.id,
      job: jobId,
      resumeUrl,
      coverLetter,
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
