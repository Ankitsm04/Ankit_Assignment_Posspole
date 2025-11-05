const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const jobController = require('../controllers/jobController');

router.post('/', protect, authorizeRoles(['Employer']), jobController.addJob);
router.put('/:id', protect, authorizeRoles(['Employer']), jobController.editJob);
router.delete('/:id', protect, authorizeRoles(['Employer']), jobController.deleteJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);

module.exports = router;
