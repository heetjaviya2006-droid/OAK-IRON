# 🪵 OAK & IRON — Project Documentation

---

## 1. Project Overview

**OAK & IRON** is a full-stack, production-ready **MERN (MongoDB, Express.js, React, Node.js)** e-commerce web application developed as a college project submission. It simulates a real-world online furniture and home décor shopping platform where users can browse products, manage their cart, place orders, and track order history — all within a modern, responsive interface.

The platform includes a complete **Admin Dashboard** that enables store administrators to manage products, view and update orders, and oversee user activity — making it a end-to-end retail solution.

The application is designed to work **fully offline** with a locally bundled MongoDB instance, ensuring consistent performance without relying on any external cloud services.

---

## 2. Objectives of the Project

- ✅ Build a fully functional **full-stack web application** using the MERN stack as a college submission.
- ✅ Implement a complete **user authentication system** (registration, login, role-based access) using JWT and bcrypt.
- ✅ Design and develop a **customer-facing storefront** with product listing, filtering, detailed product pages, cart, and checkout.
- ✅ Develop a fully operational **Admin Dashboard** to manage products, orders, and users.
- ✅ Demonstrate practical use of **REST APIs** with proper CRUD operations across all entities.
- ✅ Ensure the application runs **locally without internet dependency** by bundling MongoDB.
- ✅ Apply real-world software development practices such as **middleware usage**, **environment variables**, **file uploads**, and **modular routing**.
- ✅ Deliver a **polished, responsive UI** that reflects professional design standards.

---

## 3. Key Features

### 🛍️ Customer-Facing Features
| Feature | Description |
|---|---|
| **Home Page** | Hero banner, featured products, promotional sections |
| **Shop / Product Listing** | Browse all products with category filters |
| **Product Details** | Detailed view with images, price, description, and Add to Cart |
| **Shopping Cart** | Add/remove items, update quantities, view total |
| **Checkout** | Order form with shipping address and payment summary |
| **Order History** | Logged-in users can view all past orders and their statuses |
| **User Authentication** | Register, Login, Logout with JWT-based session management |
| **User Profile** | View and manage personal account details |

### 🔐 Admin Features
| Feature | Description |
|---|---|
| **Dashboard Overview** | Sales stats, recent orders, revenue analytics |
| **Product Management** | Add, edit, delete products with image upload (Multer) |
| **Order Management** | View all orders, update delivery status |
| **User Management** | View all registered users |
| **Settings** | Admin-level configuration panel |

### 🔒 Security Features
- JWT (JSON Web Token) based authentication
- bcrypt password hashing (industry-standard)
- Role-based access control (Admin vs Customer)
- Protected routes on both frontend and backend
- HTTP-only cookie support via `cookie-parser`

### 📁 Additional Features
- Offline MongoDB instance (no cloud DB required)
- Image upload and local storage via Multer
- Database seeder script for dummy product data
- Admin account auto-creation script
- Fully modular backend with separate routes, models, and middleware

---

## 4. Tech Stack

### 🖥️ Frontend
| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI library |
| **Vite** | Lightning-fast dev server and build tool |
| **React Router DOM** | Client-side routing and navigation |
| **Vanilla CSS** | Custom responsive styling |
| **JavaScript (ES6+)** | Application logic and API calls |
| **Fetch API** | HTTP requests to the backend REST API |

**Key Pages:** Home, Shop, Product Details, Cart, Checkout, Order History, Login, Register, Profile, About, Contact, FAQ, Privacy Policy, Terms & Conditions

---

### ⚙️ Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for server-side logic |
| **Express.js v5** | Web framework for building REST APIs |
| **Multer** | File upload middleware for product images |
| **JSON Web Token (JWT)** | Stateless user authentication |
| **bcryptjs** | Secure password hashing |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing configuration |
| **cookie-parser** | Parsing HTTP cookies for session handling |
| **nodemon** | Auto-restarting server during development |

**Backend Structure:**
```
backend/
├── server.js          # Entry point
├── routes/            # API route handlers
├── models/            # Mongoose data models
├── middleware/        # Auth & role middleware
├── uploads/           # Stored product images
├── seeder.js          # Database seeder script
└── createAdmin.js     # Admin account creation script
```

---

### 🗄️ Database
| Technology | Purpose |
|---|---|
| **MongoDB 7.0** | NoSQL document database (locally bundled) |
| **Mongoose 9** | ODM (Object Document Mapper) for MongoDB |

- The project ships with a **pre-bundled MongoDB binary** (`mongodb-extracted2/`) so no installation is needed.
- Data is stored in the local `db/` directory inside the MongoDB folder.
- Collections include: `users`, `products`, `orders`.

---

### 📡 Real-Time Communication

| Technology | Purpose |
|---|---|
| **REST APIs (HTTP)** | Primary communication between React frontend and Express backend |
| **JSON** | Standard data format for all API requests and responses |
| **JWT via Cookies / Headers** | Secure token transfer for authenticated requests |
| **Multer (Multipart)** | Handles real-time file/image uploads from frontend forms |

> 📌 **Note:** The current implementation uses a **RESTful polling model** for order status updates. A future enhancement could integrate **Socket.io** for real-time push notifications (e.g., live order tracking, admin alerts).

---

## 📂 Project Structure Summary

```
Heet Project/
├── frontend/           # React + Vite application
│   └── src/
│       ├── pages/      # All customer & admin pages
│       └── index.css   # Global styles
├── backend/            # Node.js + Express REST API
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── middleware/     # Auth middleware
└── README.md           # Setup & run instructions
```

---

*Document generated for OAK & IRON — MERN Stack E-Commerce Project | College Submission 2026*
