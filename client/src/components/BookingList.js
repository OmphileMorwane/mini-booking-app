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

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              {b.name} booked Room {b.room} on {b.date} at {b.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;