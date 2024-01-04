// SearchResultPage.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from './Navbar/UserNavbar';
import NewUserNavbar from './Navbar/NewUserNavbar';
import Footer from './Footer/Footer';

const SearchResultPage = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const data = location.state && location.state.data;

  // Inline CSS styles
  const baseCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '10px',
    padding: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    backgroundColor: '#fff',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const cardBodyStyle = {
    textAlign: 'left',
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '8px',
    color: '#333',
  };

  const cardTextStyle = {
    marginBottom: '5px',
    color: '#555',
  };

  const [cardStyle, setCardStyle] = useState(baseCardStyle);

  const handleCardHover = () => {
    // Add a hover effect to the card
    setCardStyle({
      ...baseCardStyle,
      transform: 'scale(1.05)',
    });
  };

  const handleCardLeave = () => {
    // Remove the hover effect
    setCardStyle(baseCardStyle);
  };


  const handleCardClick = (salonId) => {
    navigate(`/salon-details/${salonId}`);
  };

  return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'400px' }}>
      <NewUserNavbar />
      <h1 style={{ marginTop: '20px', paddingLeft: '30px' }}>Search Result</h1>
      {data && data.length > 0 ? (
        data.map((result) => (
          <div
            key={result.id}
            style={{ ...cardStyle }}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            onClick={() => handleCardClick(result.id)}
          >
            <img src={`http://127.0.0.1:8000${result.salon_image}`} alt={result.salon_name} style={imageStyle} />
            <div style={cardBodyStyle}>
              <h2 style={cardTitleStyle}>{result.salon_name}</h2>
              <p style={cardTextStyle}>Email: {result.email}</p>
              <p style={cardTextStyle}>Mobile: {result.mobile}</p>
              <p style={cardTextStyle}>Location: {result.location}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ marginLeft: '30px', fontSize:'2rem' }}>No results found</p>
      )}

    
    </div>
    <Footer/>
    </div>
    
  );
};

export default SearchResultPage;
