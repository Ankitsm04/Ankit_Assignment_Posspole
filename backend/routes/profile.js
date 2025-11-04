const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const profileController = require('../controllers/profileController');

router.get('/', protect, profileController.getProfile);
router.put('/', protect, profileController.updateProfile);

module.exports = router;
