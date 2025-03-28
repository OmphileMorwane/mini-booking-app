import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:5000/bookings');
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);


  const handleDelete = async (id) => {
    console.log('🧹 Trying to delete ID:', id); // Debug
    try {
      const res = await axios.delete(`http://localhost:5000/bookings/${id}`);
      console.log('✅', res.data);
      fetchBookings(); // Refresh after deletion
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete booking');
    }
  };

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              {b.name} booked Room {b.room} on {b.date} at {b.time}{' '}
              <button onClick={() => handleDelete(b.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;