import React, { useEffect, useState } from 'react';
import SalonTable from './SalonTable';
import AdminNavbar from '../Navbar/AdminNavbar';
import { baseURL } from '../../api/api';

const SalonPage = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    // Fetch salon data from your backend API
    fetch(`${baseURL}/admin-side/salons/`)
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