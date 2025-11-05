const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/signup', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Include a valid email').isEmail(),
  check('password', 'Password min 8 chars, 1 special char, 1 number').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
  check('role', 'Role must be Student or Employer').isIn(['Student', 'Employer']),
], authController.signup);

router.post('/login', [
  check('email', 'Include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], authController.login);

router.post('/logout', authController.logout);

module.exports = router;