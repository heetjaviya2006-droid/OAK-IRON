# OAK & IRON - MERN Stack E-Commerce

## Project Definition
This project is a fully functional, secured MERN Stack web application built for college submission.

### Features
* **Frontend**: React component-based UI, responsive design, routing using React Router, forms with validation.
* **Backend**: Node.js & Express REST APIs, MongoDB database (offline), CRUD operations.
* **Security**: JWT-based authentication, bcrypt password hashing, role-based access control.

## Setup Instructions

### 1. Database (MongoDB)
This application comes with an offline MongoDB instance downloaded in the `mongodb-extracted2` folder (or you can use your own local mongod).
To quickly start the included MongoDB:
```bash
./mongodb-extracted2/mongodb-win32-x86_64-windows-7.0.14/bin/mongod.exe --dbpath="./mongodb-extracted2/db"
```

### 2. Backend
Open a terminal in the `backend` folder and run:
```bash
npm install
npm start
```
The backend includes `express`, `mongoose`, `bcryptjs`, and `jsonwebtoken`. It runs on port 5000 by default.

### 3. Frontend
Open a terminal in the `frontend` folder and run:
```bash
npm install
npm run dev
```
The frontend is a Vite + React application.

## Testing the Admin Workflow
1. Register a new user at `/register`. Use the email `admin@admin.com` to automatically assign the **Admin** role.
2. Login at `/login`.
3. In the top navigation, click "Admin Dashboard".
4. You can create and delete products.

## Deployment Guidelines (GitHub Host)
As per the requirement to "Host the webpages using GitHub":
1. Initialize a git repository locally in the `frontend` folder.
2. Push your code to a new GitHub repository.
3. To host the frontend, use GitHub Pages (Note: backend servers cannot be hosted on GitHub Pages; you would typically host the backend on Render/Heroku. If you only need to host the repository, simply push the zip contents to a new GitHub repo!)
