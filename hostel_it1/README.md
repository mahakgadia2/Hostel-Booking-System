# Campus Room Booking System

## Overview

The Campus Room Booking System is a web application that allows students to request rooms for activities and allows administrators to manage and approve those requests.

The system uses role-based access control to ensure that only authorized users can perform specific actions.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Student Features

* View available rooms
* Submit room booking requests
* View booking history
* Track booking status

### Admin Features

* View all booking requests
* Approve booking requests
* Reject booking requests


### Security Features

* Password hashing using bcrypt
* JWT authentication
* Role-based authorization middleware
* Protected admin routes

### Additional Features

* Occupied rooms are visually marked
* Approved rooms cannot be selected again
* PostgreSQL relational database

---

## Technology Stack

### Frontend

* React
* React Router
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

---

## Database Schema

### Users

| Column   | Type    |
| -------- | ------- |
| id       | SERIAL  |
| name     | VARCHAR |
| email    | VARCHAR |
| password | VARCHAR |
| role     | VARCHAR |

### Rooms

| Column   | Type    |
| -------- | ------- |
| id       | SERIAL  |
| hostel   | VARCHAR |
| floor_no | INTEGER |
| room_no  | VARCHAR |

### Booking Requests

| Column     | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| user_id    | INTEGER   |
| room_id    | INTEGER   |
| status     | VARCHAR   |
| created_at | TIMESTAMP |

---

## Installation

### Clone Repository

git clone <repository-url>

### Backend Setup

cd backend

npm install

Create a .env file:

JWT_SECRET=your_secret_key

Start backend:

npm run dev

### Frontend Setup

cd frontend

npm install

npm run dev

### Database Setup

Create a PostgreSQL database.

Run the SQL schema provided in database/schema.sql.

---

## Default Workflow

1. Register as a student.
2. Login to obtain a JWT token.
3. Submit a room booking request.
4. Login as an admin.
5. Approve or reject booking requests.
6. Approved rooms become unavailable for future bookings.

---

## Future Improvements

* Google OAuth Login
* Email Notifications
* Admin Room Management
* Advanced Search and Filters


