const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const applicationController = require('../controllers/applicationController');
const upload = require('../middleware/upload');

router.post('/', protect, authorizeRoles(['Student']), upload.single('resume'),applicationController.applyToJob);
router.get('/', protect, applicationController.getApplications);

module.exports = router;