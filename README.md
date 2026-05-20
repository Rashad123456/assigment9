# 🏆 SportNest - Sports Facility Booking Management System

A full-stack sports facility booking platform built with the MERN Stack and Firebase Authentication.

## 🌐 Live URL

> Add your live URL here after deployment

---

## 📌 Purpose

SportNest allows users to explore available sports facilities such as football turfs, badminton courts, swimming lanes, and tennis courts, and make bookings for specific dates and time slots. Facility owners can list and manage their venues.

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Password + Google)
- 🏟️ Browse all sports facilities with search & filter
- 📅 Book facilities with date and time slot selection
- 👤 User dashboard to view and cancel bookings
- ➕ Add your own sports facility (with image upload)
- ✏️ Edit and delete your facilities
- 🌙 Dark mode toggle
- 🔒 JWT authentication stored in HTTPOnly cookies
- 📱 Fully responsive — mobile, tablet, desktop
- 🎨 Clean, recruiter-friendly UI

---

## 🛠️ NPM Packages Used

### Client
| Package | Purpose |
|---------|---------|
| react | UI library |
| react-router-dom | Client-side routing |
| firebase | Authentication |
| axios | HTTP requests |
| react-hot-toast | Toast notifications |
| sweetalert2 | Confirmation dialogs |
| react-icons | Icon library |
| tailwindcss | Utility-first CSS |

### Server
| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongodb | Database driver |
| jsonwebtoken | JWT token generation |
| cookie-parser | Parse HTTPOnly cookies |
| cors | Cross-origin resource sharing |
| dotenv | Environment variables |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project

### Server Setup
```bash
cd server
npm install
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Client Setup
```bash
cd client
npm install
# Edit .env with your Firebase config and API URL
npm run dev
```

### Environment Variables

**Server `.env`:**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

**Client `.env`:**
```
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## 📁 Project Structure

```
sportnest/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
└── server/          # Express backend
    ├── middleware/
    └── routes/
```
