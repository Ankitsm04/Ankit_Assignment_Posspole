const Job = require('../models/Job');

exports.addJob = async (req, res) => {
  const { jobTitle, companyName, location, jobType, salary, description, requiredSkills } = req.body;

  try {
    const job = new Job({
      employer: req.user.id,
      jobTitle,
      companyName,
      location,
      jobType,
      salary,
      description,
      requiredSkills,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.editJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    let job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    await Job.findByIdAndDelete(jobId);
    res.json({ msg: 'Job deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
