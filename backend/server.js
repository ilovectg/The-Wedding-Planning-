// ====================================
// Main Server File
// ====================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import database
const db = require('./config/database');

const app = express();

// ====================================
// Middleware
// ====================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================================
// Basic Route
// ====================================
app.get('/', (req, res) => {
    res.json({
        message: '🌸 The Best Wedding Planning Services API',
        version: '1.0.0',
        status: 'Running',
        endpoints: {
            auth: '/api/auth',
            bookings: '/api/bookings',
            admin: '/api/admin'
        }
    });
});

// ====================================
// Health Check
// ====================================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ====================================
// API Routes
// ====================================
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ====================================
// Error Handling
// ====================================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// ====================================
// 404 Handler
// ====================================
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        availableEndpoints: [
            '/api/auth/register',
            '/api/auth/login',
            '/api/bookings',
            '/api/admin/dashboard'
        ]
    });
});

// ====================================
// Start Server
// ====================================
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // Ensure schema exists before serving requests.
        await db.ensureSchema();

        // Test database connection
        await db.testConnection();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════════════════════╗
║  🌸 The Best Wedding Planning Services                    ║
║  Backend API Server                                        ║
╚════════════════════════════════════════════════════════════╝

🎉 Server running on http://localhost:${PORT}

📝 API Endpoints:
   Authentication:
   - POST   /api/auth/register
   - POST   /api/auth/login
   - POST   /api/auth/forgot-password
   - GET    /api/auth/profile

   Bookings:
   - POST   /api/bookings/create
   - GET    /api/bookings/my-bookings
   - GET    /api/bookings/:bookingId
   - POST   /api/bookings/:bookingId/review

   Admin:
   - GET    /api/admin/dashboard
   - GET    /api/admin/bookings
   - POST   /api/admin/packages
   - POST   /api/admin/venues

⚙️  Environment: ${process.env.NODE_ENV || 'development'}
🔒 JWT Expiry: ${process.env.JWT_EXPIRE || '7d'}

💡 Tip: Use /api/health to check server status
            `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
