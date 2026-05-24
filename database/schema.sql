-- ====================================
-- The Best Wedding Planning Services
-- Database Schema
-- ====================================

-- Create Database
CREATE DATABASE IF NOT EXISTS wedding_planning;
USE wedding_planning;

-- ====================================
-- 1. USERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(50),
    country VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ====================================
-- 2. PACKAGES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS packages (
    package_id INT PRIMARY KEY AUTO_INCREMENT,
    package_name VARCHAR(100) NOT NULL,
    package_type ENUM('Silver', 'Gold', 'Premium') NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    decoration LONGTEXT,
    food_menu LONGTEXT,
    photography_hours INT,
    guest_capacity INT,
    features TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ====================================
-- 3. VENUES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS venues (
    venue_id INT PRIMARY KEY AUTO_INCREMENT,
    venue_name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(50),
    capacity INT,
    price_per_day DECIMAL(10, 2),
    description TEXT,
    amenities LONGTEXT,
    image_url VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    availability_status ENUM('Available', 'Booked', 'Maintenance') DEFAULT 'Available',
    rating DECIMAL(3, 2),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ====================================
-- 4. SERVICES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(100) NOT NULL,
    service_type ENUM('Catering', 'Decoration', 'Photography', 'Makeup', 'DJ', 'CarRental') NOT NULL,
    provider_name VARCHAR(150),
    description TEXT,
    price DECIMAL(10, 2),
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    image_url VARCHAR(255),
    rating DECIMAL(3, 2),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- 5. BOOKINGS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bride_name VARCHAR(100) NOT NULL,
    groom_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    guest_count INT,
    budget DECIMAL(12, 2),
    package_id INT,
    venue_id INT,
    phone VARCHAR(20),
    email VARCHAR(255),
    notes TEXT,
    status ENUM('Pending', 'Approved', 'Rejected', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(package_id),
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id)
);

-- ====================================
-- 6. BOOKING_SERVICES TABLE (Many-to-Many)
-- ====================================
CREATE TABLE IF NOT EXISTS booking_services (
    booking_service_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

-- ====================================
-- 7. PAYMENTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_method ENUM('Bkash', 'Nagad', 'Card', 'Bank Transfer') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ====================================
-- 8. GALLERY TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS gallery (
    gallery_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category ENUM('Wedding', 'Decoration', 'Food', 'Photography') DEFAULT 'Wedding',
    image_url VARCHAR(255) NOT NULL,
    video_url VARCHAR(255),
    event_date DATE,
    uploaded_by INT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);

-- ====================================
-- 9. REVIEWS & RATINGS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    user_id INT NOT NULL,
    service_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    helpful_count INT DEFAULT 0,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);

-- ====================================
-- 10. WISHLIST TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_type ENUM('Venue', 'Package', 'Service', 'Decoration') NOT NULL,
    item_id INT,
    item_name VARCHAR(150),
    item_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ====================================
-- 11. NOTIFICATIONS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('Booking', 'Payment', 'Reminder', 'System') DEFAULT 'System',
    title VARCHAR(150),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ====================================
-- 12. DECORATION_THEMES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS decoration_themes (
    theme_id INT PRIMARY KEY AUTO_INCREMENT,
    theme_name VARCHAR(100) NOT NULL,
    theme_type ENUM('Royal', 'Traditional', 'Floral', 'Beach', 'Modern', 'Vintage') NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    price DECIMAL(10, 2),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- 13. ADMIN_LOGS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS admin_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    action VARCHAR(150),
    description TEXT,
    table_name VARCHAR(50),
    record_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ====================================
-- CREATE INDEXES FOR PERFORMANCE
-- ====================================
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_booking_date ON bookings(event_date);
CREATE INDEX idx_payment_booking ON payments(booking_id);
CREATE INDEX idx_review_user ON reviews(user_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_notification_user ON notifications(user_id);
CREATE INDEX idx_gallery_date ON gallery(event_date);
