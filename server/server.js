const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const bookings = [];

function isSlotTaken(date, time) {
  return bookings.some(b => b.date === date && b.time === time);
}

app.post('/book', (req, res) => {
  const { name, room, date, time } = req.body;
  if (!name || !room || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (isSlotTaken(date, time)) {
    return res.status(409).json({ error: 'Time slot already booked' });
  }

  const newBooking = { id: bookings.length + 1, name, room, date, time };
  bookings.push(newBooking);

  res.status(201).json({ message: 'Booking successful', booking: newBooking });
});

app.get('/bookings', (req, res) => {
  res.json(bookings);
});

app.get('/', (req, res) => {
    res.send('Server is live');
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
