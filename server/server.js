const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create an Express app
const app = express();
const PORT = 5000;

// Define path to data file that stores bookings
const DATA_FILE = path.join(__dirname, 'data.json');

// Apply middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Load bookings from file
function loadBookings() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8'); // Read file content
  return JSON.parse(data || '[]');
}

// Save bookings to file
function saveBookings(bookings) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

// Initialize bookings from file
let bookings = loadBookings();


// Helper function to check if a slot is already taken
function isSlotTaken(date, time) {
  return bookings.some(b => b.date === date && b.time === time);
}

// POST /book - Create a new booking
app.post('/book', (req, res) => {
  const { name, room, date, time } = req.body;

   // Validate input
  if (!name || !room || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (isSlotTaken(date, time)) {
    return res.status(409).json({ error: 'Time slot already booked' });
  }
 // Create new booking with incremental ID
  const newBooking = {
    id: bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1,
    name,
    room,
    date,
    time
  };
  bookings.push(newBooking); // Create new booking with incremental ID
  saveBookings(bookings); // Save to file

  res.status(201).json({ message: 'Booking successful', booking: newBooking });
});


// GET /bookings - Return all bookings
app.get('/bookings', (req, res) => {
  bookings = loadBookings();  // Refresh from file
  res.json(bookings);
});


// 🗑 DELETE /bookings/:id - Delete a booking by ID
app.delete('/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  bookings = loadBookings();
  const index = bookings.findIndex(b => b.id === id);

  if (index !== -1) {
    bookings.splice(index, 1);  // Remove from array
    saveBookings(bookings); // Save updated list
    return res.json({ message: 'Booking deleted successfully' });
  }

  res.status(404).json({ error: 'Booking not found' });
});

// GET / - Simple homepage to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is live');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});