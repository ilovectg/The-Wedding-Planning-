# ⚡ Quick Start Guide - 5 মিনিটে শুরু করুন

## 🚀 দ্রুত শুরু

### Step 1: Database Setup (2 মিনিট)

```bash
# MySQL কনসোল খুলুন
mysql -u root -p

# SQL file চালান
source database/schema.sql

# Verify করুন
USE wedding_planning;
SHOW TABLES;
```

### Step 2: Backend চালু করুন (1 মিনিট)

```bash
cd backend
npm install
npm start
```

✅ দেখবেন: `🎉 Server running on http://localhost:5000`

### Step 3: Frontend খুলুন (1 মিনিট)

```bash
# ব্রাউজারে খুলুন:
http://localhost:3000/frontend/index.html

# অথবা Python server দিয়ে
python -m http.server 3000
```

### Step 4: টেস্ট করুন (1 মিনিট)

#### Registration Test:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "phone": "+8801234567890",
    "password": "Test@123"
  }'
```

#### Expected Response:
```json
{
  "message": "Registration successful",
  "user_id": 1
}
```

---

## 🎯 Key Features ত্বরিত রেফারেন্স

### Login Flow
```
Registration → Email Verification → Login → Get Token → Access Protected Routes
```

### Booking Flow
```
Select Package → Fill Details → Choose Services → Review → Submit → Confirmation
```

### Admin Flow
```
Admin Login → Dashboard → Approve Bookings → Manage Packages → View Analytics
```

---

## 📱 ফ্রন্টএন্ড পেজ ম্যাপ

| পেজ | URL | বর্ণনা |
|-----|-----|--------|
| 🏠 হোম | `/frontend/index.html` | ল্যান্ডিং পেজ |
| 📋 প্যাকেজ | `/frontend/pages/packages.html` | প্যাকেজ ডিসপ্লে |
| 💰 বাজেট | `/frontend/pages/budget-calculator.html` | বাজেট ক্যালকুলেটর |
| 📅 বুকিং | `/frontend/pages/booking.html` | অনলাইন বুকিং ফর্ম |
| 🔐 লগইন | `/frontend/pages/login.html` | ইউজার লগইন |
| 📝 রেজিস্ট্রেশন | `/frontend/pages/registration.html` | নতুন অ্যাকাউন্ট |

---

## 🔧 সাধারণ সমস্যা সমাধান

### ❌ "Cannot GET /api/health"
```bash
# চেক করুন সার্ভার চলছে কিনা
npm start
# পোর্ট 5000 ব্যবহৃত হচ্ছে কিনা
lsof -i :5000
```

### ❌ "Database connection failed"
```bash
# MySQL চলছে কিনা চেক করুন
mysql -u root -p
# credentials verify করুন
# .env ফাইল check করুন
```

### ❌ CORS Error
```javascript
// main.js এ verify করুন
const API_URL = 'http://localhost:5000/api';
```

---

## 📊 ডেটা টাইপ রেফারেন্স

### User Object
```json
{
  "user_id": 1,
  "first_name": "Ayesha",
  "last_name": "Khan",
  "email": "ayesha@example.com",
  "phone": "+8801234567890",
  "city": "Dhaka",
  "is_verified": true,
  "role": "user"
}
```

### Booking Object
```json
{
  "booking_id": 1,
  "user_id": 1,
  "bride_name": "Ayesha Khan",
  "groom_name": "Karim Ahmed",
  "event_date": "2026-06-15",
  "guest_count": 200,
  "budget": 500000,
  "package_id": 1,
  "status": "Pending"
}
```

### Package Object
```json
{
  "package_id": 1,
  "package_type": "Gold",
  "price": 75000,
  "guest_capacity": 400,
  "photography_hours": 10
}
```

---

## 🎓 লার্নিং পাথ

### শিখতে হবে এই অর্ডারে:
1. **Frontend HTML/CSS** - Structure এবং styling
2. **JavaScript Basics** - Event handling, API calls
3. **Node.js Backend** - Server creation, routes
4. **MySQL Queries** - Database operations
5. **Authentication** - JWT, sessions
6. **REST APIs** - Best practices

---

## 💾 উপকারী কমান্ড

```bash
# Backend শুরু করুন (development)
npm run dev

# Backend শুরু করুন (production)
npm start

# নতুন dependencies add করুন
npm install package-name

# MySQL backup করুন
mysqldump -u root -p wedding_planning > backup.sql

# MySQL restore করুন
mysql -u root -p wedding_planning < backup.sql

# Node processes দেখুন
ps aux | grep node

# Port kill করুন (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🌐 Production Deploy চেকলিস্ট

- [ ] Database migration করা
- [ ] Environment variables সেট করা
- [ ] SSL Certificate সেট করা
- [ ] Error logging enable করা
- [ ] Database backup সেটআপ করা
- [ ] Monitoring সেটআপ করা
- [ ] CDN configure করা

---

## 📚 প্রয়োজনীয় Resources

- **Node.js**: https://nodejs.org/
- **MySQL**: https://www.mysql.com/
- **Express**: https://expressjs.com/
- **Bootstrap**: https://getbootstrap.com/
- **JWT**: https://jwt.io/

---

## ✨ পরবর্তী ফিচার টু-ডু

- [ ] Admin Dashboard
- [ ] Payment Gateway (Bkash/Nagad)
- [ ] Email Notifications
- [ ] SMS Alerts
- [ ] Mobile App (React Native)
- [ ] Live Chat
- [ ] Video Conferencing
- [ ] Analytics Dashboard
- [ ] Guest Management
- [ ] Invitation Cards

---

**Happy Coding! 🎉**

শুরু করুন এবং প্রথম বুকিং পান আজই!
