const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { Parser } = require('json2csv');

exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const jobCount = await Job.countDocuments();
    const applicationCount = await Application.countDocuments();

    res.json({
      totalUsers: userCount,
      totalJobs: jobCount,
      totalApplications: applicationCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json({ msg: 'Job deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student', '-password')
      .populate('job');
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application)
      return res.status(404).json({ msg: 'Application not found' });
    res.json({ msg: 'Application deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.exportJobsCSV = async (req, res) => {
  try {
    const jobs = await Job.find();
    const fields = [
      'jobTitle',
      'companyName',
      'location',
      'jobType',
      'salary',
      'description',
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(jobs);

    res.header('Content-Type', 'text/csv');
    res.attachment('jobs.csv');
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.exportApplicationsCSV = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student')
      .populate('job');

    const data = applications.map((app) => ({
      studentName: app.student.name,
      studentEmail: app.student.email,
      jobTitle: app.job.jobTitle,
      companyName: app.job.companyName,
      resumeUrl: app.resumeUrl,
      coverLetter: app.coverLetter,
      appliedAt: app.appliedAt,
    }));

    const fields = [
      'studentName',
      'studentEmail',
      'jobTitle',
      'companyName',
      'resumeUrl',
      'coverLetter',
      'appliedAt',
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('applications.csv');
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
