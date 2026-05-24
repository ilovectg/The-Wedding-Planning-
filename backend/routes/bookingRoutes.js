// ====================================
// Booking Routes
// ====================================
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Public routes
router.get('/venues', bookingController.getAllVenues);
router.get('/services', bookingController.getAllServices);

// Protected routes
router.post('/create', auth, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getUserBookings);
// Wishlist (define before param routes to avoid shadowing)
router.post('/wishlist/add', auth, bookingController.addToWishlist);
router.get('/wishlist', auth, bookingController.getWishlist);
router.delete('/wishlist/:wishlistId', auth, bookingController.removeFromWishlist);

// Param-based routes (bookingId)
router.get('/:bookingId', auth, bookingController.getBookingDetails);
router.put('/:bookingId', auth, bookingController.updateBooking);
router.delete('/:bookingId', auth, bookingController.cancelBooking);

// Reviews
router.post('/:bookingId/review', auth, bookingController.addReview);
router.get('/:bookingId/reviews', bookingController.getBookingReviews);


module.exports = router;
