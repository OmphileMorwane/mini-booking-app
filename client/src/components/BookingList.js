import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component that lists bookings and handles deletion
const BookingList = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState([]);

   // Fetches the list of bookings from the server
  const fetchBookings = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
    setBookings(res.data);
  };
     // Run fetchBookings when component mounts or refreshTrigger changes
  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

     // Handles deletion of a booking by ID
  const handleDelete = async (id) => {
    console.log(' Trying to delete ID:', id); // Debug
    try {
      // Send DELETE request to the server
      const res = await axios.delete(`http://localhost:5000/bookings/${id}`);
      console.log('✅', res.data);
      fetchBookings(); // Refresh after deletion
    } catch (err) {
       // Show error message if deletion fails
      console.error(err.response?.data || err.message);
      alert('Failed to delete booking');
    }
  };
  // Render the list of bookings
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
// Export component to use in other parts of the app
export default BookingList;