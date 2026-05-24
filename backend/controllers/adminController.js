// ====================================
// Admin Controller
// ====================================
const db = require('../config/database');

// Get dashboard stats
exports.getDashboard = async (req, res) => {
    try {
        const totalBookings = await db.query('SELECT COUNT(*) as count FROM bookings');
        const totalUsers = await db.query('SELECT COUNT(*) as count FROM users WHERE role = "user"');
        const totalRevenue = await db.query('SELECT SUM(amount) as total FROM payments WHERE status = "Completed"');
        const pendingBookings = await db.query('SELECT COUNT(*) as count FROM bookings WHERE status = "Pending"');

        res.json({
            totalBookings: totalBookings[0].count,
            totalUsers: totalUsers[0].count,
            totalRevenue: totalRevenue[0].total || 0,
            pendingBookings: pendingBookings[0].count
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await db.query(
            'SELECT b.*, u.first_name, u.last_name, p.package_name FROM bookings b LEFT JOIN users u ON b.user_id = u.user_id LEFT JOIN packages p ON b.package_id = p.package_id'
        );
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// Approve booking
exports.approveBooking = async (req, res) => {
    try {
        await db.query('UPDATE bookings SET status = "Approved" WHERE booking_id = ?', [req.params.bookingId]);
        res.json({ message: 'Booking approved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve booking' });
    }
};

// Reject booking
exports.rejectBooking = async (req, res) => {
    try {
        const { reason } = req.body;
        await db.query('UPDATE bookings SET status = "Rejected" WHERE booking_id = ?', [req.params.bookingId]);
        res.json({ message: 'Booking rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject booking' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.query('SELECT user_id, first_name, last_name, email, phone, city, created_at FROM users WHERE role = "user"');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE user_id = ? AND role = "user"', [req.params.userId]);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Create package
exports.createPackage = async (req, res) => {
    try {
        const { package_name, package_type, price, decoration, food_menu, photography_hours, guest_capacity } = req.body;
        const result = await db.query(
            'INSERT INTO packages (package_name, package_type, price, decoration, food_menu, photography_hours, guest_capacity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [package_name, package_type, price, decoration, food_menu, photography_hours, guest_capacity]
        );
        res.status(201).json({ package_id: result.insertId, message: 'Package created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create package' });
    }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await db.query('SELECT * FROM packages');
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

// Update package
exports.updatePackage = async (req, res) => {
    try {
        const { price, decoration, food_menu, photography_hours, guest_capacity } = req.body;
        await db.query(
            'UPDATE packages SET price = ?, decoration = ?, food_menu = ?, photography_hours = ?, guest_capacity = ? WHERE package_id = ?',
            [price, decoration, food_menu, photography_hours, guest_capacity, req.params.packageId]
        );
        res.json({ message: 'Package updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update package' });
    }
};

// Delete package
exports.deletePackage = async (req, res) => {
    try {
        await db.query('DELETE FROM packages WHERE package_id = ?', [req.params.packageId]);
        res.json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete package' });
    }
};

// Create venue
exports.createVenue = async (req, res) => {
    try {
        const { venue_name, location, city, capacity, price_per_day, amenities, phone, email } = req.body;
        const result = await db.query(
            'INSERT INTO venues (venue_name, location, city, capacity, price_per_day, amenities, phone, email, availability_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [venue_name, location, city, capacity, price_per_day, amenities, phone, email, 'Available']
        );
        res.status(201).json({ venue_id: result.insertId, message: 'Venue created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create venue' });
    }
};

// Get all venues
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await db.query('SELECT * FROM venues');
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch venues' });
    }
};

// Update venue
exports.updateVenue = async (req, res) => {
    try {
        const { venue_name, location, city, capacity, price_per_day, availability_status } = req.body;
        await db.query(
            'UPDATE venues SET venue_name = ?, location = ?, city = ?, capacity = ?, price_per_day = ?, availability_status = ? WHERE venue_id = ?',
            [venue_name, location, city, capacity, price_per_day, availability_status, req.params.venueId]
        );
        res.json({ message: 'Venue updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update venue' });
    }
};

// Delete venue
exports.deleteVenue = async (req, res) => {
    try {
        await db.query('DELETE FROM venues WHERE venue_id = ?', [req.params.venueId]);
        res.json({ message: 'Venue deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete venue' });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Approve review
exports.approveReview = async (req, res) => {
    try {
        await db.query('UPDATE reviews SET status = "Approved" WHERE review_id = ?', [req.params.reviewId]);
        res.json({ message: 'Review approved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve review' });
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        await db.query('DELETE FROM reviews WHERE review_id = ?', [req.params.reviewId]);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
    try {
        const bookingsByPackage = await db.query('SELECT package_name, COUNT(*) as count FROM bookings b JOIN packages p ON b.package_id = p.package_id GROUP BY package_name');
        const revenueByMonth = await db.query('SELECT MONTH(payment_date) as month, SUM(amount) as revenue FROM payments WHERE status = "Completed" GROUP BY MONTH(payment_date)');

        res.json({
            bookingsByPackage,
            revenueByMonth
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};
// (Gallery endpoints removed — galleries feature disabled)
