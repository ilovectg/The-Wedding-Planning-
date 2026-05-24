// ====================================
// Authentication Routes
// ====================================
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.get('/profile', auth, authController.getUserProfile);
router.put('/profile', auth, authController.updateProfile);
router.post('/logout', auth, authController.logout);
router.post('/change-password', auth, authController.changePassword);

module.exports = router;
