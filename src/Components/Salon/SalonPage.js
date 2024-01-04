import React, { useEffect, useState } from 'react';
import SalonTable from './SalonTable';
import AdminNavbar from '../Navbar/AdminNavbar';

const SalonPage = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    // Fetch salon data from your backend API
    fetch('http://127.0.0.1:8000/admin-side/salons/')
      .then((response) => response.json())
      .then((data) => setSalons(data))
      .catch((error) => console.error('Error fetching salons:', error));
  }, []);

  return (
    <div>
        <AdminNavbar/>
      <h2 style={{ maxWidth: '80%', margin: 'auto', marginTop:'20px', marginBottom:'10px' }}>All Salons</h2>
      <SalonTable salons={salons} />
    </div>
  );
};

export default SalonPage;