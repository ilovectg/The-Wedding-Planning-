# 🌸 The Best Wedding Planning Services - Implementation Guide

## 📋 সম্পূর্ণ সেটআপ এবং ডেভেলপমেন্ট গাইড

---

## 1️⃣ প্রথম পর্যায়: পরিবেশ প্রস্তুতি

### A. MySQL Database Setup

```bash
# MySQL কনসোল খুলুন এবং নিচের কমান্ড চালান
mysql -u root -p

# Database তৈরি করুন
source /path/to/database/schema.sql

# Database verify করুন
USE wedding_planning;
SHOW TABLES;
```

### B. Node.js Backend Setup

```bash
# Backend ফোল্ডারে যান
cd backend

# Dependencies ইনস্টল করুন
npm install

# .env ফাইল তৈরি করুন (example থেকে কপি করুন)
cp .env.example .env

# Edit করুন .env ফাইল আপনার configuration সহ
# - DB_PASSWORD
# - JWT_SECRET
# - EMAIL_USER এবং EMAIL_PASSWORD

# Server শুরু করুন (Development)
npm run dev

# অথবা Production
npm start
```

---

## 2️⃣ Frontend Setup

### Local Development

```bash
# সরাসরি frontend/index.html খুলুন ব্রাউজারে
# অথবা একটি local server ব্যবহার করুন:

# Python ব্যবহার করে
python -m http.server 8000

# Node.js ব্যবহার করে
npm install -g http-server
http-server frontend
```

---

## 3️⃣ প্রজেক্ট স্ট্রাকচার ব্যাখ্যা

```
Wedding MobileAPP/
├── frontend/
│   ├── index.html              # হোম পেজ
│   ├── css/
│   │   └── main.css            # প্রধান স্টাইলশীট
│   ├── js/
│   │   └── main.js             # ইউটিলিটি ফাংশন এবং API কল
│   └── pages/
│       ├── login.html          # লগইন পেজ
│       ├── registration.html    # রেজিস্ট্রেশন পেজ
│       ├── packages.html        # প্যাকেজ ডিসপ্লে
│       ├── budget-calculator.html  # বাজেট ক্যালকুলেটর
│       └── booking.html         # অনলাইন বুকিং
│
├── backend/
│   ├── server.js               # মেইন সার্ভার ফাইল
│   ├── package.json            # ডিপেন্ডেন্সি
│   ├── .env                    # এনভায়রনমেন্ট ভেরিয়েবল
│   ├── config/
│   │   └── database.js         # ডাটাবেস কানেকশন
│   ├── routes/
│   │   ├── authRoutes.js       # অথেন্টিকেশন রুট
│   │   ├── bookingRoutes.js    # বুকিং রুট
│   │   └── adminRoutes.js      # এডমিন রুট
│   ├── controllers/
│   │   ├── authController.js   # অথেন্টিকেশন লজিক
│   │   ├── bookingController.js # বুকিং লজিক
│   │   └── adminController.js  # এডমিন লজিক
│   └── middleware/
│       └── auth.js             # JWT মিডলওয়্যার
│
├── database/
│   └── schema.sql              # ডাটাবেস টেবিল স্ট্রাকচার
│
└── README.md                   # প্রজেক্ট পরিচয়
```

---

## 4️⃣ মূল ফিচার বাস্তবায়ন

### Feature 1: User Registration & Login ✅

**ফ্রন্টএন্ড:**
- `frontend/pages/registration.html` - রেজিস্ট্রেশন ফর্ম
- `frontend/pages/login.html` - লগইন ফর্ম

**ব্যাকএন্ড:**
- `POST /api/auth/register` - নতুন ইউজার তৈরি
- `POST /api/auth/login` - ইউজার লগইন

**Database:**
- `users` টেবিল

---

### Feature 2: Wedding Packages ✅

**ফ্রন্টএন্ড:**
- `frontend/pages/packages.html` - সব প্যাকেজ দেখান

**ব্যাকএন্ড:**
- `GET /api/admin/packages` - সব প্যাকেজ
- `POST /api/admin/packages` - নতুন প্যাকেজ (শুধু এডমিন)

**Database:**
- `packages` টেবিল (Silver, Gold, Premium)

---

### Feature 3: Online Booking ✅

**ফ্রন্টএন্ড:**
- `frontend/pages/booking.html` - 4-স্টেপ বুকিং ফর্ম

**ব্যাকএন্ড:**
- `POST /api/bookings/create` - বুকিং তৈরি করা
- `GET /api/bookings/my-bookings` - ইউজারের বুকিং
- `PUT /api/bookings/:bookingId` - বুকিং আপডেট

**Database:**
- `bookings` টেবিল

---

### Feature 4: Budget Calculator ✅

**ফ্রন্টএন্ড:**
- `frontend/pages/budget-calculator.html` - স্মার্ট ক্যালকুলেটর

**লজিক:**
- গেস্ট কাউন্ট থেকে খরচ গণনা
- প্যাকেজ সাজেশন
- বাজেট এনালাইসিস

---

### Feature 5: Admin Dashboard (TODO)

**করার কাজ:**
1. Admin login পেজ তৈরি (`admin-login.html`)
2. Admin dashboard (`admin-dashboard.html`)
3. Booking management interface
4. Package management interface
5. Revenue analytics

---

## 5️⃣ API Endpoints তালিকা

### Authentication Endpoints
```
POST   /api/auth/register             → নতুন ইউজার
POST   /api/auth/login                → লগইন করা
POST   /api/auth/forgot-password      → পাসওয়ার্ড ভুলে যাওয়া
POST   /api/auth/reset-password       → পাসওয়ার্ড রিসেট
GET    /api/auth/verify-email/:token  → ইমেইল ভেরিফাই
GET    /api/auth/profile              → ইউজার প্রোফাইল (Protected)
PUT    /api/auth/profile              → প্রোফাইল আপডেট (Protected)
```

### Booking Endpoints
```
GET    /api/bookings/venues           → সব ভেন্যু
GET    /api/bookings/services         → সব সার্ভিস
POST   /api/bookings/create           → বুকিং তৈরি (Protected)
GET    /api/bookings/my-bookings      → মাই বুকিং (Protected)
GET    /api/bookings/:bookingId       → বুকিং ডিটেইল (Protected)
PUT    /api/bookings/:bookingId       → বুকিং আপডেট (Protected)
DELETE /api/bookings/:bookingId       → বুকিং ক্যান্সেল (Protected)
POST   /api/bookings/:bookingId/review → রিভিউ এড করা (Protected)
```

### Admin Endpoints
```
GET    /api/admin/dashboard           → ড্যাশবোর্ড স্ট্যাটস (Admin Only)
GET    /api/admin/bookings            → সব বুকিং (Admin Only)
PUT    /api/admin/bookings/:id/approve → বুকিং অনুমোদন (Admin Only)
POST   /api/admin/packages            → প্যাকেজ তৈরি (Admin Only)
GET    /api/admin/users               → সব ইউজার (Admin Only)
GET    /api/admin/analytics           → অ্যানালিটিক্স (Admin Only)
```

---

## 6️⃣ Testing API (Postman/Curl)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Ayesha",
    "last_name": "Khan",
    "email": "ayesha@example.com",
    "phone": "+8801234567890",
    "password": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ayesha@example.com",
    "password": "SecurePass123"
  }'
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "bride_name": "Ayesha Khan",
    "groom_name": "Karim Ahmed",
    "event_date": "2026-06-15",
    "guest_count": 200,
    "budget": 500000,
    "package_id": 1,
    "phone": "+8801234567890",
    "email": "ayesha@example.com"
  }'
```

---

## 7️⃣ Frontend এবং Backend কানেক্ট করা

### main.js এ API Configuration
```javascript
const API_URL = 'http://localhost:5000/api';

// Token save করা (login এর পরে)
localStorage.setItem('token', response.token);

// Protected API call
const token = localStorage.getItem('token');
headers = {
    'Authorization': `Bearer ${token}`
}
```

---

## 8️⃣ নিরাপত্তা টিপস

✅ **করুন:**
- সবসময় HTTPS ব্যবহার করুন (production এ)
- Strong JWT Secret ব্যবহার করুন
- Password hash করুন (bcryptjs)
- CORS properly configure করুন
- Input validation করুন
- SQL Injection থেকে সুরক্ষিত থাকুন (parameterized queries)

❌ **করবেন না:**
- Sensitive data localStorage এ store করবেন না
- Password plaintext এ save করবেন না
- JWT secret hardcode করবেন না
- Environment variables public করবেন না

---

## 9️⃣ দ্রুত ডিপ্লয়মেন্ট চেকলিস্ট

### Development থেকে Production
- [ ] Database credentials সেট করা
- [ ] JWT Secret পরিবর্তন করা
- [ ] Email credentials configure করা
- [ ] Error logging সেট করা
- [ ] HTTPS enable করা
- [ ] Rate limiting add করা
- [ ] CORS properly configure করা
- [ ] Environment variables সেট করা

---

## 🔟 Troubleshooting

### Problem: Database connection failed
```
সমাধান:
1. MySQL running আছে কিনা চেক করুন
2. Database credentials verify করুন
3. Database create হয়েছে কিনা চেক করুন
```

### Problem: CORS error
```
সমাধান:
1. Backend এ CORS enable আছে কিনা চেক করুন
2. Frontend URL সঠিক কিনা চেক করুন
3. Headers সঠিক আছে কিনা চেক করুন
```

### Problem: JWT token invalid
```
সমাধান:
1. Token expire হয়নি কিনা চেক করুন
2. JWT Secret same আছে কিনা চেক করুন
3. Authorization header properly format হয়েছে কিনা
```

---

## 📚 পরবর্তী ধাপ

### এখনই করার মতো:
1. ✅ Database schema সেট করা
2. ✅ Authentication সিস্টেম
3. ✅ Booking system
4. ✅ Budget calculator
5. ⏳ Admin Dashboard (পরবর্তী)
6. ⏳ Payment Gateway (পরবর্তী)
7. ⏳ Email notifications (পরবর্তী)
8. ⏳ Mobile responsive (পরবর্তী)

---

## 💡 প্রজেক্ট লাইভ করার সময়

- Heroku এ Deploy করুন
- AWS Lambda/RDS ব্যবহার করুন
- Firebase (সহজ অপশন)
- Render/Railway (সহজ ডিপ্লয়মেন্ট)

---

## 📞 সাপোর্ট

যেকোনো সমস্যার জন্য চেক করুন:
- GitHub Issues
- Stack Overflow
- Backend console logs
- Browser Developer Tools

---

**Created:** May 2026  
**Last Updated:** May 2026  
**Version:** 1.0.0
