// ====================================
// Database Configuration
// ====================================
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const useSSL = String(process.env.DB_SSL || 'false').toLowerCase() === 'true';
const rejectUnauthorized = String(process.env.DB_SSL_REJECT_UNAUTHORIZED || 'true').toLowerCase() === 'true';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wedding_planning',
    port: process.env.DB_PORT || 3306,
    ssl: useSSL ? { rejectUnauthorized } : undefined
};

// Create connection pool
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function ensureSchema() {
    const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const connection = await mysql.createConnection({
        ...dbConfig,
        multipleStatements: true
    });

    try {
        try {
            await connection.query(schemaSql);
            console.log('✅ Database schema ensured');
        } catch (schemaErr) {
            // Ignore duplicate index / key errors which can occur if schema was partially applied
            if (schemaErr && schemaErr.code === 'ER_DUP_KEYNAME') {
                console.warn('⚠️ Duplicate index detected while applying schema — continuing');
            } else {
                throw schemaErr;
            }
        }
        // Seed sample data if packages table is empty
        try {
            const [rows] = await connection.query('SELECT COUNT(*) AS cnt FROM packages');
            const count = rows && rows[0] ? rows[0].cnt : 0;
            if (count === 0) {
                try {
                    // Insert minimal safe seed data for packages and venues (avoid executing large SQL file)
                    await connection.query(
                        `INSERT INTO packages (package_name, package_type, price, decoration, food_menu, photography_hours, guest_capacity, is_active) VALUES
                        (?, 'Silver', 50000, 'Basic floral and light decoration', 'Indian cuisine, appetizers, desserts', 6, 200, TRUE),
                        (?, 'Gold', 75000, 'Premium floral arrangement with theme decoration', 'Multi-cuisine, gourmet menu, bar service', 10, 400, TRUE),
                        (?, 'Premium', 125000, 'Luxury theme-based decoration with special effects', '5-star catering, chef special, premium beverages', 12, 600, TRUE)
                        `,
                        ['Silver - Basic Package', 'Gold - Premium Package', 'Premium - Luxury Package']
                    );

                    await connection.query(
                        `INSERT INTO venues (venue_name, location, city, capacity, price_per_day, amenities, phone, email, availability_status, rating) VALUES
                        (?, 'Gulshan', 'Dhaka', 500, 150000, 'AC, Parking, Catering, Sound System, Stage', '+8801234567890', 'grandballroom@venue.com', 'Available', 4.8),
                        (?, 'Narayanganj', 'Narayanganj', 300, 100000, 'Garden, Pool, AC Hall, Catering Facility', '+8801234567891', 'riverside@venue.com', 'Available', 4.6),
                        (?, 'Banani', 'Dhaka', 400, 120000, 'Multiple halls, AC, Parking, Decoration Support', '+8801234567892', 'skygarden@venue.com', 'Available', 4.7)
                        `,
                        ['Grand Ballroom Dhaka', 'Riverside Resort', 'Sky Garden Convention']
                    );

                    console.log('✅ Minimal seed data (packages, venues) inserted');
                } catch (innerErr) {
                    console.error('Failed to insert minimal seed data:', innerErr.message || innerErr);
                }
            } else {
                console.log('ℹ️ Sample data already present, skipping seeding');
            }
        } catch (seedErr) {
            console.error('Error while checking/seeding sample data:', seedErr.message || seedErr);
        }

        try {
            await connection.query(`
                CREATE TABLE IF NOT EXISTS seed_metadata (
                    seed_name VARCHAR(100) PRIMARY KEY,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            const [venueSeedRows] = await connection.query(
                'SELECT COUNT(*) AS cnt FROM seed_metadata WHERE seed_name = ?',
                ['district_venues_v1']
            );
            const seedAlreadyApplied = venueSeedRows && venueSeedRows[0] ? venueSeedRows[0].cnt > 0 : false;

            if (!seedAlreadyApplied) {
                const districtVenues = [
                    ['Dhaka Grand Palace', 'Gulshan', 'Dhaka', 500, 155000, 4.8, 'Elegant ballroom with premium catering and lighting'],
                    ['Dhaka Royal Garden', 'Banani', 'Dhaka', 420, 145000, 4.7, 'Luxury garden venue for modern wedding receptions'],
                    ['Dhaka Pearl Center', 'Dhanmondi', 'Dhaka', 350, 125000, 4.6, 'Classic indoor hall with stylish decor support'],
                    ['Dhaka Sky View Hall', 'Uttara', 'Dhaka', 450, 135000, 4.7, 'Rooftop-inspired venue with panoramic city views'],
                    ['Dhaka Regent Banquet', 'Mirpur', 'Dhaka', 380, 118000, 4.5, 'Sophisticated banquet hall for medium gatherings'],

                    ['Chittagong Sea Pearl', 'Panchlaish', 'Chittagong', 400, 132000, 4.6, 'Seaside mood venue with elegant wedding setup'],
                    ['Chittagong Ocean Garden', 'Khulshi', 'Chittagong', 480, 148000, 4.8, 'Premium venue with floral theme and wide stage'],
                    ['Chittagong Hilltop Palace', 'Nasirabad', 'Chittagong', 360, 115000, 4.5, 'Hilltop venue with private atmosphere and event support'],
                    ['Chittagong Imperial Hall', 'Agrabad', 'Chittagong', 520, 160000, 4.9, 'Grand hall ideal for large luxury wedding events'],
                    ['Chittagong Marina Court', 'Patenga', 'Chittagong', 300, 98000, 4.4, 'Affordable court venue with modern amenities'],

                    ['Sylhet Tea Garden Resort', 'Zindabazar', 'Sylhet', 420, 140000, 4.7, 'Green and airy venue inspired by tea garden charm'],
                    ['Sylhet Royal Orchid', 'Amberkhana', 'Sylhet', 350, 122000, 4.6, 'Premium hall with warm lighting and elegant decor'],
                    ['Sylhet Blossom Point', 'Uposhohor', 'Sylhet', 280, 95000, 4.4, 'Intimate event space for stylish celebrations'],
                    ['Sylhet Garden Valley', 'Tilagor', 'Sylhet', 500, 150000, 4.8, 'Large garden venue for outdoor ceremonies'],
                    ['Sylhet River View Club', 'Moglabazar', 'Sylhet', 320, 110000, 4.5, 'River-facing venue with serene wedding ambiance'],

                    ['Barishal River Crown', 'Sadar Road', 'Barishal', 300, 90000, 4.4, 'Budget-friendly venue with premium service'],
                    ['Barishal Emerald Hall', 'Rupatoli', 'Barishal', 380, 112000, 4.5, 'Modern hall suited for elegant receptions'],
                    ['Barishal Riverside Bliss', 'Nathullabad', 'Barishal', 420, 128000, 4.7, 'Beautiful river-side venue for memorable celebrations'],
                    ['Barishal Crown Garden', 'Band Road', 'Barishal', 250, 86000, 4.3, 'Compact garden venue for cozy wedding events'],
                    ['Barishal Palace Park', 'Airport Road', 'Barishal', 450, 134000, 4.6, 'Stylish park venue with outdoor setup support'],

                    ['Noakhali Aqua Palace', 'Maijdee', 'Noakhali', 340, 98000, 4.4, 'Calm and spacious venue for family weddings'],
                    ['Noakhali Elegant Court', 'Chowmuhani', 'Noakhali', 300, 92000, 4.3, 'Urban court venue with tasteful decoration'],
                    ['Noakhali Sunset Garden', 'Begumganj', 'Noakhali', 410, 115000, 4.6, 'Open garden venue with soft evening light'],
                    ['Noakhali Grand Horizon', 'Sonaimuri', 'Noakhali', 470, 129000, 4.7, 'Large hall for premium wedding experiences'],
                    ['Noakhali Royal Stream', 'Kabirhat', 'Noakhali', 260, 87000, 4.2, 'Simple and elegant venue with stream-side feel'],

                    ['Rajshahi Silk Palace', 'Shaheb Bazar', 'Rajshahi', 430, 130000, 4.7, 'Royal themed venue with premium styling'],
                    ['Rajshahi Mango Garden', 'Kazla', 'Rajshahi', 350, 108000, 4.5, 'Garden venue inspired by the city’s natural charm'],
                    ['Rajshahi Golden Hall', 'Boalia', 'Rajshahi', 500, 158000, 4.8, 'Large luxury hall perfect for grand celebrations'],
                    ['Rajshahi Heritage Court', 'Laxmipur', 'Rajshahi', 290, 94000, 4.3, 'Heritage-inspired venue with intimate ambiance'],
                    ['Rajshahi River Breeze', 'Padma Garden', 'Rajshahi', 380, 121000, 4.6, 'Fresh riverside venue for elegant weddings']
                ];

                const venueInsertSql = `
                    INSERT INTO venues (venue_name, location, city, capacity, price_per_day, description, amenities, phone, email, availability_status, rating) VALUES
                    ${districtVenues.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, \'Available\', ?)').join(',\n')}
                `;

                const venueInsertValues = districtVenues.flatMap(([name, location, city, capacity, price, rating, description]) => [
                    name,
                    location,
                    city,
                    capacity,
                    price,
                    description,
                    'AC, Parking, Catering, Stage, Sound System',
                    `+8801${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
                    `${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}@venue.com`,
                    rating
                ]);

                await connection.query(venueInsertSql, venueInsertValues);
                await connection.query('INSERT INTO seed_metadata (seed_name) VALUES (?)', ['district_venues_v1']);
                console.log('✅ District venue seed data inserted');
            } else {
                console.log('ℹ️ District venue seed already applied');
            }
        } catch (districtSeedErr) {
            console.error('Error while seeding district venues:', districtSeedErr.message || districtSeedErr);
        }
    } finally {
        await connection.end();
    }
}

// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

// Get connection for queries
async function getConnection() {
    return pool.getConnection();
}

// Execute query
async function query(sql, values = []) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(sql, values);
        return result;
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    getConnection,
    query,
    testConnection,
    ensureSchema
};
