const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) 
      return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id, role: user.role }};
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role }};
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getDashboardStats = async (req,res) => {
  try{
    const studentCount = await User.countDocuments({role: 'Student'});
    const employerCount = await User.countDocuments({role : 'Employer'});
    const jobCount = await Job.countDocuments();
    const applicationCount = await Application.countDocuments({role : 'Employer'});
    
    const fullTimeJobs = await Job.countDocuments({jobType : 'Full-time'});
    const internshipJobs = await Job.countDocuments({jobType : 'Internship'});

    res.json({
      user: {student: studentCount, employers: employerCount },
      jobs : jobCount,
      applications: applicationCount,
      jobCategories: { fullTime: fullTimeJobs, internships: internshipJobs }
    });  
  } catch(error){
  }
}
