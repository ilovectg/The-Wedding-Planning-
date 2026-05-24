// ====================================
// Authentication Middleware
// ====================================
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        if (!decoded.role) {
            decoded.role = 'user';
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
