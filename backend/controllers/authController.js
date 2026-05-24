// ====================================
// Authentication Controller
// ====================================
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Email configuration
const emailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Generate JWT Token
const generateToken = (userId, role = 'user') => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// Register User
exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;

        // Validate input
        if (!first_name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user exists
        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailVerificationEnabled = process.env.ENABLE_EMAIL_VERIFICATION === 'true';
        const verificationToken = emailVerificationEnabled
            ? jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' })
            : null;

        // Insert user
        const result = emailVerificationEnabled
            ? await db.query(
                'INSERT INTO users (first_name, last_name, email, phone, password, verification_token, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [first_name, last_name, email, phone, hashedPassword, verificationToken, 'user']
            )
            : await db.query(
                'INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
                [first_name, last_name, email, phone, hashedPassword, 'user']
            );

        // Send verification email only when email credentials are configured.
        // Registration should still succeed even if email delivery fails.
        const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.FRONTEND_URL;

        if (emailVerificationEnabled && emailConfigured) {
            try {
                await emailTransporter.sendMail({
                    to: email,
                    subject: 'Verify your email - The Best Wedding Planning',
                    html: `
                        <h2>Welcome to The Best Wedding Planning Services!</h2>
                        <p>Please verify your email by clicking the link below:</p>
                        <a href="${process.env.FRONTEND_URL}/pages/verify-email.html?token=${verificationToken}">
                            Verify Email
                        </a>
                    `
                });
            } catch (mailError) {
                console.warn('Verification email could not be sent, but registration succeeded:', mailError.message);
            }
        }

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify.',
            user_id: result.insertId
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Registration failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Find user in DB
        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            // Allow login using environment-set admin credentials when DB has no admin record
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = generateToken(0, 'admin');
                return res.json({
                    token,
                    user: { user_id: 0, first_name: 'Admin', last_name: '', email, role: 'admin' }
                });
            }
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check if email is verified
        if (!user.is_verified && process.env.ENABLE_EMAIL_VERIFICATION === 'true') {
            return res.status(401).json({ error: 'Please verify your email first' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user.user_id, user.role);

        res.json({
            token,
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users WHERE user_id = ?', [req.user.userId]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];
        res.json({
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, phone, city, address } = req.body;

        await db.query(
            'UPDATE users SET first_name = ?, last_name = ?, phone = ?, city = ?, address = ? WHERE user_id = ?',
            [first_name, last_name, phone, city, address, req.user.userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const users = await db.query('SELECT password FROM users WHERE user_id = ?', [req.user.userId]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValid = await bcrypt.compare(oldPassword, users[0].password);
        if (!isValid) {
            return res.status(401).json({ error: 'Incorrect old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, req.user.userId]);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password' });
    }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await db.query('UPDATE users SET is_verified = true, verification_token = NULL WHERE email = ?', [decoded.email]);

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await emailTransporter.sendMail({
            to: email,
            subject: 'Reset your password - The Best Wedding Planning',
            html: `
                <p>Click the link below to reset your password:</p>
                <a href="${process.env.FRONTEND_URL}/pages/reset-password.html?token=${resetToken}">
                    Reset Password
                </a>
            `
        });

        res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send reset email' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, decoded.email]);

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};

// Logout
exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};
