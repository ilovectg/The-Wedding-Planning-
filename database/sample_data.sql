-- ====================================
-- Sample Data for Testing
-- Wedding Planning Database
-- ====================================

USE wedding_planning;

-- ====================================
-- Sample Users (Test Accounts)
-- ====================================
INSERT INTO users (first_name, last_name, email, phone, password, is_verified, role) VALUES
('Ayesha', 'Khan', 'ayesha@example.com', '+8801234567890', '$2a$10$N9qo8uLOickgx2ZMRZoVe.nM1F2w8R7mVqP3XFe9VQ', true, 'user'),
('Karim', 'Ahmed', 'karim@example.com', '+8801987654321', '$2a$10$N9qo8uLOickgx2ZMRZoVe.nM1F2w8R7mVqP3XFe9VQ', true, 'user'),
('Admin', 'User', 'admin@wedding.com', '+8801112223333', '$2a$10$N9qo8uLOickgx2ZMRZoVe.nM1F2w8R7mVqP3XFe9VQ', true, 'admin');

-- ====================================
-- Sample Packages
-- ====================================
INSERT INTO packages (package_name, package_type, price, decoration, food_menu, photography_hours, guest_capacity, is_active) VALUES
('Silver - Basic Package', 'Silver', 50000, 'Basic floral and light decoration', 'Indian cuisine, appetizers, desserts', 6, 200, true),
('Gold - Premium Package', 'Gold', 75000, 'Premium floral arrangement with theme decoration', 'Multi-cuisine, gourmet menu, bar service', 10, 400, true),
('Premium - Luxury Package', 'Premium', 125000, 'Luxury theme-based decoration with special effects', '5-star catering, chef special, premium beverages', 12, 600, true);

-- ====================================
-- Sample Venues
-- ====================================
INSERT INTO venues (venue_name, location, city, capacity, price_per_day, amenities, phone, email, availability_status, rating) VALUES
('Grand Ballroom Dhaka', 'Gulshan, Dhaka', 'Dhaka', 500, 150000, 'AC, Parking, Catering, Sound System, Stage', '+8801234567890', 'grandballroom@venue.com', 'Available', 4.8),
('Riverside Resort', 'Narayanganj', 'Narayanganj', 300, 100000, 'Garden, Pool, AC Hall, Catering Facility', '+8801234567891', 'riverside@venue.com', 'Available', 4.6),
('Sky Garden Convention', 'Banani, Dhaka', 'Dhaka', 400, 120000, 'Multiple halls, AC, Parking, Decoration Support', '+8801234567892', 'skygarden@venue.com', 'Available', 4.7),
('Beach Resort Chittagong', 'Cox\\'s Bazar', 'Chittagong', 200, 80000, 'Beach view, AC, Catering, Bonfire', '+8801234567893', 'beach@venue.com', 'Available', 4.5);

-- ====================================
-- Sample Services
-- ====================================
INSERT INTO services (service_name, service_type, provider_name, description, price, phone, email, rating, is_available) VALUES
('Delicious Catering Co.', 'Catering', 'Chef Rahman', 'Premium catering with diverse menu options', 15000, '+8801111111111', 'catering@provider.com', 4.9, true),
('Flower Magic', 'Decoration', 'Fatima Flowers', 'Traditional and modern flower decoration', 25000, '+8801111111112', 'flowers@provider.com', 4.8, true),
('Snap Moments Photography', 'Photography', 'Aziz Photography', 'Professional photography and videography', 20000, '+8801111111113', 'photography@provider.com', 4.9, true),
('Glam Studio Makeup', 'Makeup', 'Sonia Makeup Artist', 'Bridal and family makeup services', 12000, '+8801111111114', 'makeup@provider.com', 4.7, true),
('Sound Paradise DJ', 'DJ', 'DJ Robi', 'DJ services with modern sound system', 10000, '+8801111111115', 'dj@provider.com', 4.8, true),
('Royal Car Rental', 'CarRental', 'Ahmed Rent', 'Premium car rental for wedding', 5000, '+8801111111116', 'cars@provider.com', 4.6, true);

-- ====================================
-- Sample Bookings
-- ====================================
INSERT INTO bookings (user_id, bride_name, groom_name, event_date, guest_count, budget, package_id, venue_id, phone, email, notes, status) VALUES
(1, 'Ayesha Khan', 'Karim Ahmed', '2026-06-15', 200, 500000, 2, 1, '+8801234567890', 'ayesha@example.com', 'Love decorations with flowers and lights', 'Approved'),
(2, 'Mona Hassan', 'Rauf Khan', '2026-07-20', 250, 600000, 3, 3, '+8801987654321', 'karim@example.com', 'Want evening wedding', 'Pending'),
(1, 'Sana Islam', 'Rahim Ali', '2026-08-10', 150, 400000, 1, 2, '+8801234567890', 'ayesha@example.com', 'Simple and elegant function', 'Approved');

-- ====================================
-- Sample Reviews
-- ====================================
INSERT INTO reviews (booking_id, user_id, rating, comment, status) VALUES
(1, 1, 5, 'Excellent service! The wedding was perfect. Highly recommended!', 'Approved'),
(1, 1, 5, 'Amazing decoration and food quality. Best experience ever!', 'Approved'),
(3, 1, 4, 'Good service overall. Could have been better with more customization.', 'Approved');

-- ====================================
-- Sample Gallery
-- ====================================
INSERT INTO gallery (title, description, category, image_url, event_date, uploaded_by) VALUES
('Beautiful Bride', 'Wedding day bride portrait', 'Photography', 'https://via.placeholder.com/400x300', '2026-06-15', 1),
('Reception Hall', 'Decorated reception hall with theme', 'Decoration', 'https://via.placeholder.com/400x300', '2026-06-15', 1),
('Delicious Food', 'Multi-cuisine wedding feast', 'Food', 'https://via.placeholder.com/400x300', '2026-06-15', 1),
('Couple Portrait', 'Romantic couple portrait', 'Photography', 'https://via.placeholder.com/400x300', '2026-06-15', 1);

-- ====================================
-- Sample Decoration Themes
-- ====================================
INSERT INTO decoration_themes (theme_name, theme_type, description, price, featured) VALUES
('Royal Elegance', 'Royal', 'Gold and maroon themed royal decoration', 50000, true),
('Traditional Beauty', 'Traditional', 'Bengali traditional decoration with fabric and lights', 35000, true),
('Flower Paradise', 'Floral', 'All floral decoration with premium flowers', 45000, true),
('Beach Romance', 'Beach', 'Sea-side theme with blue and white decoration', 40000, false),
('Modern Minimalist', 'Modern', 'Contemporary design with clean lines', 30000, false);

-- ====================================
-- Sample Wishlist Items
-- ====================================
INSERT INTO wishlist (user_id, item_type, item_id, item_name, item_price) VALUES
(1, 'Venue', 1, 'Grand Ballroom Dhaka', 150000),
(1, 'Package', 2, 'Gold Package', 75000),
(1, 'Service', 3, 'Snap Moments Photography', 20000),
(1, 'Decoration', 1, 'Royal Elegance Theme', 50000);

-- ====================================
-- Sample Notifications
-- ====================================
INSERT INTO notifications (user_id, type, title, message, is_read) VALUES
(1, 'Booking', 'Booking Approved', 'Your wedding booking has been approved!', false),
(1, 'Payment', 'Payment Confirmed', 'Payment of 500000 BDT received successfully', false),
(1, 'Reminder', 'Wedding Countdown', 'Your wedding is in 10 days!', true),
(2, 'System', 'Welcome', 'Welcome to The Best Wedding Planning Services', true);

-- ====================================
-- Display all test data
-- ====================================
SELECT '===== TEST DATA OVERVIEW =====' as Status;
SELECT CONCAT('Users:', COUNT(*)) as Count FROM users;
SELECT CONCAT('Packages:', COUNT(*)) as Count FROM packages;
SELECT CONCAT('Venues:', COUNT(*)) as Count FROM venues;
SELECT CONCAT('Services:', COUNT(*)) as Count FROM services;
SELECT CONCAT('Bookings:', COUNT(*)) as Count FROM bookings;
SELECT CONCAT('Reviews:', COUNT(*)) as Count FROM reviews;
SELECT CONCAT('Gallery:', COUNT(*)) as Count FROM gallery;
