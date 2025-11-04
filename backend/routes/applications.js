const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const applicationController = require('../controllers/applicationController');

router.post('/', protect, authorizeRoles(['Student']), applicationController.applyToJob);
router.get('/', protect, applicationController.getApplications);

module.exports = router;