// Simple script to check a user record by email
require('dotenv').config();
const db = require('../config/database');

async function findUser(email) {
    try {
        const rows = await db.query('SELECT user_id, first_name, last_name, email, phone, is_verified, role, created_at FROM users WHERE email = ?', [email]);
        if (!rows || rows.length === 0) {
            console.log('NOT_FOUND');
            return;
        }

        console.log(JSON.stringify(rows[0], null, 2));
    } catch (err) {
        console.error('ERROR', err.message || err);
    } finally {
        process.exit(0);
    }
}

const email = process.argv[2];
if (!email) {
    console.error('Usage: node check-user.js <email>');
    process.exit(1);
}

findUser(email);
