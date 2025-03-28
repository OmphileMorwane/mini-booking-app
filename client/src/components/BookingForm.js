import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingCreated }) => {
  const [form, setForm] = useState({
    name: '',
    room: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://localhost:5000/book', form);
      alert('Booking successful!');
      onBookingCreated(); // refresh bookings
      setForm({ name: '', room: '', date: '', time: '' }); // reset form
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Room</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="room" placeholder="Room" value={form.room} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="time" type="time" value={form.time} onChange={handleChange} required />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;