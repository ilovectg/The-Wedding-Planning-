# 🌸 The Best Wedding Planning Services

## Implemented Features

Core features (completed):
- User registration and login (registration form, validation, email verification, authentication, password , forgot-password).
- Wedding packages (three package types: Silver, Gold, Premium; detailed package pages and package management APIs).
- Venue booking system (multi-step booking flow: venue selection, date selection, service selection, booking confirmation).
- Budget calculator (interactive calculator with package recommendations and real-time cost calculation).
- Event services (catering, decoration, photography, makeup, DJ/music, car rental; services stored in `services` table).
- Online booking form (multi-step booking form with validation and confirmation).
- Admin dashboard setup (dashboard API structure, admin authentication middleware, booking and package management endpoints).

Advanced / additional features (completed):
- Review & rating system (review submission, 5-star rating, comments, admin approval; `reviews` table).
- Notification system (booking and payment notifications, reminders; )`
- Theme & decoration preview (5 decoration themes stored in `decoration_themes` table).

## Backend & Database
- API endpoints: 30+ endpoints implemented (authentication, bookings, admin functions, packages, payments, wishlist, notifications).
- Database: 13 tables implemented: `users`, `packages`, `venues`, `services`, `bookings`, `payments`, `reviews`,  `decoration_themes`, `booking_services`, `admin_logs`.

## Getting Started (how to run the implemented project)
1. Database setup
```bash
mysql -u root -p
source database/schema.sql
source database/sample_data.sql
```

2. Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

3. Frontend
Open `frontend/index.html` in your browser or serve the `frontend` folder from a static server.

## Files of interest
- Frontend pages: `frontend/pages/` (login, registration, packages, booking, budget-calculator, etc.)
- Frontend JS: `frontend/js/main.js`
- Backend entry: `backend/server.js`
- Backend controllers: `backend/controllers/`
- Database schema: `database/schema.sql`

**Created by:** Sadia Nur Safa

