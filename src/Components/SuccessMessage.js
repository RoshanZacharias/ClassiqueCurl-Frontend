// SuccessPage.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() =>{
        const timeoutId = setTimeout(() =>{
            navigate('/');
        }, 5000);
        return () => clearTimeout(timeoutId);
    },[navigate]);


  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center">
    
    <img
      src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"
      alt="Success GIF"
      style={{ width: '500px', height: '500px' }}
    />
    <h1>Booking Successful!</h1>
  </div>
  );
};

export default SuccessPage;
