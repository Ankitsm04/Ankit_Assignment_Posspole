const ProfileStudent = require('../models/ProfileStudent');
const ProfileEmployer = require('../models/ProfileEmployer');

exports.getProfile = async (req, res) => {
  try {
    let profile;
    if (req.user.role === 'Student') {
      profile = await ProfileStudent.findOne({ user: req.user.id });
    } else if (req.user.role === 'Employer') {
      profile = await ProfileEmployer.findOne({ user: req.user.id });
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let profile;
    if (req.user.role === 'Student') {
      profile = await ProfileStudent.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, upsert: true }
      );
    } else if (req.user.role === 'Employer') {
      profile = await ProfileEmployer.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, upsert: true }
      );
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
