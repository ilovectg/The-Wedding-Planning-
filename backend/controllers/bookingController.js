// ====================================
// Booking Controller
// ====================================
const db = require('../config/database');

// Get all venues
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await db.query('SELECT * FROM venues WHERE availability_status = "Available"');
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch venues' });
    }
};

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await db.query('SELECT * FROM services WHERE is_available = true');
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
};

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const {
            bride_name,
            groom_name,
            event_date,
            guest_count,
            budget,
            package_id,
            venue_id,
            phone,
            email,
            notes
        } = req.body;

        const result = await db.query(
            `INSERT INTO bookings 
            (user_id, bride_name, groom_name, event_date, guest_count, budget, package_id, venue_id, phone, email, notes, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.user.userId, bride_name, groom_name, event_date, guest_count, budget, package_id, venue_id, phone, email, notes, 'Pending']
        );

        res.status(201).json({
            message: 'Booking created successfully',
            booking_id: result.insertId
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            error: 'Failed to create booking',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await db.query(
            'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.userId]
        );
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// Get booking details
exports.getBookingDetails = async (req, res) => {
    try {
        const bookings = await db.query(
            'SELECT * FROM bookings WHERE booking_id = ? AND user_id = ?',
            [req.params.bookingId, req.user.userId]
        );

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(bookings[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking details' });
    }
};

// Update booking
exports.updateBooking = async (req, res) => {
    try {
        const { bride_name, groom_name, event_date, guest_count, notes } = req.body;

        await db.query(
            'UPDATE bookings SET bride_name = ?, groom_name = ?, event_date = ?, guest_count = ?, notes = ? WHERE booking_id = ? AND user_id = ?',
            [bride_name, groom_name, event_date, guest_count, notes, req.params.bookingId, req.user.userId]
        );

        res.json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
    try {
        await db.query(
            'UPDATE bookings SET status = "Rejected" WHERE booking_id = ? AND user_id = ?',
            [req.params.bookingId, req.user.userId]
        );

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};

// Add review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const result = await db.query(
            'INSERT INTO reviews (booking_id, user_id, rating, comment, status) VALUES (?, ?, ?, ?, ?)',
            [req.params.bookingId, req.user.userId, rating, comment, 'Pending']
        );

        res.status(201).json({
            message: 'Review submitted successfully',
            review_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
};

// Get booking reviews
exports.getBookingReviews = async (req, res) => {
    try {
        const reviews = await db.query(
            'SELECT * FROM reviews WHERE booking_id = ? AND status = "Approved"',
            [req.params.bookingId]
        );
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { item_type, item_id, item_name, item_price } = req.body;

        const result = await db.query(
            'INSERT INTO wishlist (user_id, item_type, item_id, item_name, item_price) VALUES (?, ?, ?, ?, ?)',
            [req.user.userId, item_type, item_id, item_name, item_price]
        );

        res.status(201).json({ message: 'Added to wishlist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to wishlist' });
    }
};

// Get wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await db.query(
            'SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.userId]
        );
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM wishlist WHERE wishlist_id = ? AND user_id = ?',
            [req.params.wishlistId, req.user.userId]
        );

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
};
