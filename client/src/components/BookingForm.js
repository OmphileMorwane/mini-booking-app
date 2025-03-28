import React, { useState } from 'react';
import axios from 'axios';


// BookingForm component accepts a prop to trigger refresh after booking
const BookingForm = ({ onBookingCreated }) => {
  // State to manage form inputs
  const [form, setForm] = useState({
    name: '',
    room: '',
    date: '',
    time: ''
  });
  // Updates form state when user types in inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    try {
      // Send POST request to backend to create a booking
       await axios.post('http://localhost:5000/book', form);
      alert('Booking successful!');
      onBookingCreated(); // refresh bookings
      setForm({ name: '', room: '', date: '', time: '' }); // reset form
    } catch (err) {
      // Show error message if request fails
      alert(err.response?.data?.error || 'Booking failed');
    }
  };
// Form UI
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

// Export the component for use in other files
export default BookingForm;