import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NewUserNavbar from '../Navbar/NewUserNavbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { baseURL } from '../../api/api';


const UserProfile = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const user = useSelector(state => state.user);
  // const userId = user.user.id
  
  let userId;
  // userId = user.user.id;

    try {
        userId = user.user.id;
        console.log(userId);
      
    } catch (error) {
      userId=0
      navigate('/login')

      console.log('login page')
    }



  useEffect(() => {
    // Fetch wallet information from the backend
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(`${baseURL}/wallet/${userId}/`);
        const data = await response.json();
        setWalletBalance(data.wallet_balance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        navigate('/login')
      }
    };

    const fetchUserDetails = async () =>{
      try{
        const userResponse = await fetch(`${baseURL}/user/${userId}/`);
        const userData = await userResponse.json();
        setUserDetails(userData);
      }catch(error){
        console.error('Error fetching user details:', error);
      }
    };

    fetchWalletBalance();
    fetchUserDetails();

  }, [userId]);  // Empty dependency array ensures the effect runs only once on component mount

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profile_picture', profilePicture);

      const response = await fetch(`${baseURL}/user/${userId}/upload-profile-picture/`, {
        method: 'POST',
        headers: {
          // You might need to include additional headers based on your backend requirements
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUserDetails = await response.json();
        setUserDetails(updatedUserDetails);
        // Handle success, e.g., display a success message
        console.log('Profile picture uploaded successfully');
      } else {
        // Handle error
        console.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };


  return (
    <div> 
      <NewUserNavbar/>
      <div className="container mt-4 w-50" style={{marginBottom: '500px'}}>
        <div className="card">
          <div className="card-header">
            <h1 className="card-title" style={{textAlign:'center'}}>User Profile</h1>
          </div>

          <div className="mb-3 text-center">
              <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div
                  className="rounded-circle overflow-hidden"
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '2px solid #007bff',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {userDetails && userDetails.profile_picture ? (
                    <img
                    src={`${userDetails.profile_picture}`}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person fs-1 text-secondary"></i>
                  )}
                </div>
                <input
                  type="file"
                  className="form-control mt-2"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button className="btn btn-primary mt-2" onClick={handleFileUpload}>
                  Upload Profile Picture
                </button>
              </div>
            </div>
            
          <div className="card-body">
            {walletBalance !== null && userDetails !== null ? (
              <>
                 <div style={{ marginBottom: '10px' }}>
                  <strong>First Name:</strong> {userDetails.first_name}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
                <div style={{ marginBottom: '10px' }}>
                  <strong>Last Name:</strong> {userDetails.last_name}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
                <div style={{ marginBottom: '10px' }}>
                  <strong>Email:</strong> {userDetails.email}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
                <div style={{ marginBottom: '10px' }}>
                  <strong>Mobile:</strong> {userDetails.mobile}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
                <div style={{ marginBottom: '10px' }}>
                  <strong>Wallet Balance:</strong> ₹ {walletBalance}
                </div>
              </>
            ) : (
              <p className="card-text">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default UserProfile;