# Mini Booking App

## Introduction
Mini Booking App is a lightweight appointment booking application built primarily with **Node.js**, **Express**, and **React**. This app allows users to book rooms at specific times and dates, view all existing bookings, and delete appointments. It is designed as a full-stack application with focus on backend logic, API integration, and persistent data storage using a file-based system.

## Features
- **Create Booking:** Users can fill a form to book a room.
- **View Bookings:** Displays a list of all active bookings.
- **Delete Booking:** Users can delete a booking entry.
- **Conflict Prevention:** Ensures that no duplicate time slots are booked.
- **Persistent Storage:** Booking data is saved in a JSON file, maintaining data between restarts.
- **API Integration:** Uses Axios to make HTTP requests to the backend.
- **Environment Configuration:** Uses `.env` for managing environment variables such as API URLs.

## Technologies Used
### Backend:
- **Node.js:** JavaScript runtime used for the server.
- **Express.js:** Web framework for creating APIs and handling routes.
- **fs (File System):** Used to read/write bookings into a local JSON file for persistence.
- **CORS:** Allows the client (on another port or domain) to communicate with the backend.
- **body-parser:** Middleware for parsing incoming request bodies.

### Frontend:
- **React:** JavaScript library for building user interfaces.
- **Axios:** Promise-based HTTP client for API requests.

### Deployment:
- **Render:** Used to host and serve the backend API.
- **Vercel:** Used to deploy the frontend (React app).

## API Endpoints
- `POST /book` - Create a new booking (expects name, room, date, time).
- `GET /bookings` - Retrieve all current bookings.
- `DELETE /bookings/:id` - Delete a booking by its ID.

## Environment Variables
Create a `.env` file in the frontend directory with:
```
REACT_APP_API_URL=https://bookwithus-smxq.onrender.com
```
This allows Axios to point to the correct backend base URL.

## Installation
### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Steps
1. **Clone the repo:**
```bash
git clone https://github.com/OmphileMorwane/mini-booking-app.git
```
2. **Backend (in `server` directory):**
```bash
cd server
npm install
node server.js
```
3. **Frontend (in `client` directory):**
```bash
cd ../client
npm install
npm start
```

## Deployment
- **Frontend:** Deployed on Vercel
  - Vercel root directory must be set to `client`
  - Environment variable `REACT_APP_API_URL` must be set to the backend's Render URL
- **Backend:** Deployed on Render
  - Make sure Render auto-deploys from your GitHub repo
  - Ensure CORS is enabled
- **Vercel deployment:**    [miniBookingApp](https://mini-booking-p40ny2ry7-omphilemorwanes-projects.vercel.app)
## Usage Examples
- Visit the home page
- Fill out the form to book a room
- View your booking in the list
- Delete a booking with the "Delete" button

---

This app is ideal as a backend-focused full-stack portfolio piece demonstrating API design, client-server integration, and deployment with modern cloud platforms.

