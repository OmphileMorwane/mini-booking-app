import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component that lists bookings and handles deletion/editing
const BookingList = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID of booking being edited
  const [editForm, setEditForm] = useState({        // Form state for editing
    name: '',
    room: '',
    date: '',
    time: ''
  });

  // Fetch bookings from backend
  const fetchBookings = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  // Delete a booking
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/bookings/${id}`);
      console.log('✅', res.data);
      fetchBookings();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete booking');
    }
  };

  // Start editing a booking
  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditForm({
      name: booking.name,
      room: booking.room,
      date: booking.date,
      time: booking.time
    });
  };

  // Update form input values
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Submit updated booking
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/bookings/${id}`, editForm);
      setEditingId(null);
      fetchBookings();
    } catch (err) {
      alert('Failed to update booking');
    }
  };

  // JSX output
  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              {editingId === b.id ? (
                <div>
                  <input name="name" value={editForm.name} onChange={handleChange} />
                  <input name="room" value={editForm.room} onChange={handleChange} />
                  <input name="date" type="date" value={editForm.date} onChange={handleChange} />
                  <input name="time" type="time" value={editForm.time} onChange={handleChange} />
                  <button onClick={() => handleUpdate(b.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {b.name} booked Room {b.room} on {b.date} at {b.time}{' '}
                  <button onClick={() => handleEditClick(b)}>Edit</button>
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;