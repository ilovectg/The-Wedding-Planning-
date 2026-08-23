# 🌸 The Best Wedding Planning Services

### A Full-Stack Wedding Planning & Event Booking Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-E34F26?style=for-the-badge" alt="Frontend"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/API-30%2B-6A5ACD?style=for-the-badge" alt="API"/>
</p>

<p align="center">
  <b>Plan • Customize • Book • Celebrate</b>
</p>

---

## 💍 About the Project

**The Best Wedding Planning Services** is a full-stack web application designed to simplify the process of planning and organizing weddings.

The platform brings essential wedding services into one place—from selecting packages and venues to calculating budgets, booking event services, managing payments, and collecting reviews.

The system provides separate functionality for **customers and administrators**, with a backend API and relational MySQL database supporting the platform.

---

# ✨ Core Features

## 🔐 Authentication & Account Management

Users can securely manage their accounts through:

* User registration
* Form validation
* Email verification
* Login & authentication
* Password management
* Forgot-password functionality

---

## 💎 Wedding Packages

Choose from three predefined wedding packages:

| Package        | Purpose                     |
| -------------- | --------------------------- |
| 🥈 **Silver**  | Essential wedding services  |
| 🥇 **Gold**    | Extended wedding package    |
| 👑 **Premium** | Complete premium experience |

Each package can contain its own collection of wedding-related services and pricing information.

---

## 🏛️ Venue Booking

The platform provides a multi-step venue booking experience:

```text
Choose Venue
     ↓
Select Date
     ↓
Choose Services
     ↓
Review Booking
     ↓
Confirm Booking
```

This makes the booking process easier to understand and manage.

---

## 💰 Interactive Budget Calculator

The built-in budget calculator helps users estimate wedding expenses dynamically.

It can:

* Calculate estimated costs
* Combine package selections
* Recommend packages
* Update totals in real time
* Help users plan within their budget

---

# 🎀 Event Services

Users can select from multiple wedding-related services:

* 🍽️ Catering
* 🌸 Decoration
* 📸 Photography
* 💄 Makeup
* 🎵 DJ / Music
* 🚗 Car Rental

Services are managed through the backend and stored in the database.

---

# 📝 Online Booking

The platform includes a multi-step online booking form with:

* Input validation
* Service selection
* Booking information
* Confirmation flow

The completed booking is processed through the backend API and stored in the database.

---

# ⭐ Reviews & Ratings

Customers can provide feedback after using services.

### Review System

* ⭐ 5-star rating
* 💬 Written comments
* 🛡️ Admin approval
* 📊 Stored review records

Reviews are stored in the `reviews` table.

---

# 🔔 Notification System

The application supports notifications related to:

* Booking updates
* Payment notifications
* Reminders

This helps users stay informed about important events throughout the booking process.

---

# 🎨 Theme & Decoration Preview

Users can explore different decoration concepts through predefined themes.

Decoration themes are maintained through the:

```text
decoration_themes
```

database table.

This provides a structured way to manage wedding decoration options.

---

# 👨‍💼 Admin Dashboard

The platform includes an administrative backend for managing the system.

### Admin capabilities include:

* Admin authentication
* Booking management
* Package management
* API-based administration
* Administrative logs
* Review approval

The backend uses dedicated authentication middleware and management endpoints.

---

# 🏗️ System Architecture

```text
                    🌸 WEDDING PLATFORM
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      🖥️ FRONTEND                  ⚙️ BACKEND
             │                           │
      HTML / CSS / JS              Node.js API
             │                           │
             │              ┌────────────┼────────────┐
             │              │            │            │
             │              ▼            ▼            ▼
             │        Authentication  Booking     Admin
             │              │            │            │
             └──────────────┼────────────┼────────────┘
                            │
                            ▼
                       🗄️ MySQL
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Users          Bookings       Services
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                       Payments
                            │
                            ▼
                       Reviews
```

---

# 🔄 Booking Workflow

The complete booking experience follows a structured flow:

```text
             User
              │
              ▼
       Browse Packages
              │
              ▼
        Select Venue
              │
              ▼
        Choose Date
              │
              ▼
       Select Services
              │
              ▼
       Calculate Budget
              │
              ▼
        Confirm Booking
              │
              ▼
           Payment
              │
              ▼
        Notification
              │
              ▼
        Review & Rating
```

---

# 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* REST-style API architecture
* Backend controllers
* Authentication middleware

### Database

* MySQL
* Relational database design
* SQL schema & sample data

---

# 📡 Backend API

The backend contains **30+ API endpoints** covering major application functionality.

### API Areas

```text
Authentication
      │
      ├── User Registration
      ├── Login
      ├── Verification
      └── Password Management

Bookings
      │
      ├── Venue Booking
      ├── Service Selection
      └── Booking Management

Packages
      │
      └── Package Management

Payments
      │
      └── Payment Operations

Reviews
      │
      └── Rating & Comments

Notifications
      │
      └── Booking / Payment Updates

Admin
      │
      ├── Booking Management
      ├── Package Management
      └── Review Approval
```

---

# 🗄️ Database Design

The application uses a relational MySQL database.

### Main Tables

```text
users
packages
venues
services
bookings
payments
reviews
decoration_themes
booking_services
admin_logs
```

Additional database structures support authentication, booking relationships, services, notifications, and other application functionality.

---

# 📂 Project Structure

```text
The-Wedding-Planning-/
│
├── frontend/
│   ├── pages/
│   │   ├── login
│   │   ├── registration
│   │   ├── packages
│   │   ├── booking
│   │   └── budget-calculator
│   │
│   └── js/
│       └── main.js
│
├── backend/
│   ├── controllers/
│   └── server.js
│
├── database/
│   ├── schema.sql
│   └── sample_data.sql
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* A modern web browser

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/ilovectg/The-Wedding-Planning-.git
```

```bash
cd The-Wedding-Planning-
```

---

## 2️⃣ Setup the Database

Open MySQL:

```bash
mysql -u root -p
```

Then execute:

```sql
source database/schema.sql;
source database/sample_data.sql;
```

This creates the required database structure and sample data.

---

## 3️⃣ Start the Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The backend server runs on:

```text
http://localhost:5000
```

---

## 4️⃣ Start the Frontend

Open:

```text
frontend/index.html
```

in a browser.

Alternatively, serve the `frontend` directory using a local static server.

---

# 📌 Important Files

| File / Directory           | Purpose                  |
| -------------------------- | ------------------------ |
| `frontend/pages/`          | Main frontend pages      |
| `frontend/js/main.js`      | Frontend JavaScript      |
| `backend/server.js`        | Backend entry point      |
| `backend/controllers/`     | Backend controller logic |
| `database/schema.sql`      | Database structure       |
| `database/sample_data.sql` | Sample database records  |

---

# 📊 Project Highlights

```text
                  🌸 WEDDING PLATFORM
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
   👰 CUSTOMER         💼 SERVICES       👨‍💼 ADMIN
       │                 │                 │
       ▼                 ▼                 ▼
  Registration        Packages          Dashboard
  Login               Venues            Bookings
  Booking             Catering          Packages
  Budget              Decoration        Reviews
  Reviews             Photography       Notifications
                         │
                         ▼
                      🗄️ MySQL
```

### Implementation Highlights

* 🔐 Complete authentication flow
* 💎 Multiple wedding packages
* 🏛️ Multi-step venue booking
* 💰 Dynamic budget calculation
* 🎀 Multiple event services
* ⭐ Review & rating system
* 🔔 Notification system
* 🎨 Decoration themes
* 💳 Payment-related functionality
* 👨‍💼 Administrative management
* 📡 30+ backend API endpoints
* 🗄️ Relational MySQL database

---

# 🧠 What This Project Demonstrates

This project demonstrates practical experience in:

* Full-stack web application development
* REST API development
* Node.js backend architecture
* MySQL database design
* Authentication & authorization
* CRUD operations
* Multi-step form handling
* Booking system design
* Relational database relationships
* Frontend-backend communication
* Administrative workflows
* User review systems

---

# 🔮 Future Improvements

Potential improvements include:

* [ ] Online payment gateway integration
* [ ] Real-time booking availability
* [ ] Advanced venue search & filtering
* [ ] Calendar-based booking management
* [ ] Image gallery for venues and decorations
* [ ] Personalized wedding recommendations
* [ ] Real-time notification delivery
* [ ] Advanced analytics dashboard
* [ ] Responsive mobile-first redesign
* [ ] Automated testing

---

# ⚠️ Disclaimer

This project is developed as a **software engineering and web development project** for demonstrating full-stack application concepts.

Any payment, authentication, email, or notification functionality should be properly secured and configured before being used in a production environment.

---

# 👩‍💻 Creator

**Sadia Nur Safa**

Built as a full-stack wedding planning and event management platform.

---

<p align="center">

### 🌸 Plan Your Day. Personalize Your Celebration. Make It Memorable. 💍

</p>
