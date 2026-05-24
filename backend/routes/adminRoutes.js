// ====================================
// Admin Routes
// ====================================
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Admin middleware
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};

// Dashboard
router.get('/dashboard', auth, adminAuth, adminController.getDashboard);

// Bookings management
router.get('/bookings', auth, adminAuth, adminController.getAllBookings);
router.put('/bookings/:bookingId/approve', auth, adminAuth, adminController.approveBooking);
router.put('/bookings/:bookingId/reject', auth, adminAuth, adminController.rejectBooking);

// Users management
router.get('/users', auth, adminAuth, adminController.getAllUsers);
router.delete('/users/:userId', auth, adminAuth, adminController.deleteUser);

// Packages management
router.post('/packages', auth, adminAuth, adminController.createPackage);
router.get('/packages', auth, adminAuth, adminController.getAllPackages);
router.put('/packages/:packageId', auth, adminAuth, adminController.updatePackage);
router.delete('/packages/:packageId', auth, adminAuth, adminController.deletePackage);

// Venues management
router.post('/venues', auth, adminAuth, adminController.createVenue);
router.get('/venues', auth, adminAuth, adminController.getAllVenues);
router.put('/venues/:venueId', auth, adminAuth, adminController.updateVenue);
router.delete('/venues/:venueId', auth, adminAuth, adminController.deleteVenue);

// Reviews management
router.get('/reviews', auth, adminAuth, adminController.getAllReviews);
router.put('/reviews/:reviewId/approve', auth, adminAuth, adminController.approveReview);
router.delete('/reviews/:reviewId', auth, adminAuth, adminController.deleteReview);

// Analytics
router.get('/analytics', auth, adminAuth, adminController.getAnalytics);
// Gallery endpoints removed — feature disabled

module.exports = router;
