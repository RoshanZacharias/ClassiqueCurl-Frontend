import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserNavbar from '../Navbar/UserNavbar';
import Footer from '../Footer/Footer';

const UserProfile = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const user = useSelector(state => state.user);
  const userId = user.user.id
    

  useEffect(() => {
    // Fetch wallet information from the backend
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/wallet/${userId}/`);
        const data = await response.json();
        setWalletBalance(data.wallet_balance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, []);  // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div> 
      <UserNavbar/>
    <div className="container mt-4" style={{marginBottom: '500px'}}>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">User Profile</h1>
        </div>
        <div className="card-body">
          {walletBalance !== null ? (
            <p className="card-text">Wallet Balance: ${walletBalance}</p>
          ) : (
            <p className="card-text">Loading wallet balance...</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default UserProfile;