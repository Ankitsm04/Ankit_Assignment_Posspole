const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/dashboard', protect, authorizeRoles(['Admin']), adminController.getDashboardStats);
router.get('/users', protect, authorizeRoles(['Admin']), adminController.getAllUsers);
router.put('/users/block/:id', protect, authorizeRoles(['Admin']), adminController.blockUser);
router.put('/users/unblock/:id', protect, authorizeRoles(['Admin']), adminController.unblockUser);
router.delete('/users/:id', protect, authorizeRoles(['Admin']), adminController.deleteUser);
router.get('/jobs', protect, authorizeRoles(['Admin']), adminController.getAllJobs);
router.delete('/jobs/:id', protect, authorizeRoles(['Admin']), adminController.deleteJob);
router.get('/applications', protect, authorizeRoles(['Admin']), adminController.getAllApplications);
router.delete('/applications/:id', protect, authorizeRoles(['Admin']), adminController.deleteApplication);
router.get('/export/jobs', protect, authorizeRoles(['Admin']), adminController.exportJobsCSV);
router.get('/export/applications', protect, authorizeRoles(['Admin']), adminController.exportApplicationsCSV);

module.exports = router;
