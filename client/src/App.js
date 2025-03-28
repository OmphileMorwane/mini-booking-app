import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div className="App">
      <h1>Mini Booking App</h1>
      <BookingForm onBookingCreated={triggerRefresh} />
      <BookingList refreshTrigger={refresh} />
    </div>
  );
}

export default App;
