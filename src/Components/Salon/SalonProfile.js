import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import NewSalonNavbar from '../Navbar/NewSalonNavbar'
import Footer from '../Footer/Footer'
import { baseURL } from '../../api/api'

const SalonProfile = () => {
    const salonUser = useSelector(state => state.salon)
    // console.log('salonuser:', salonUser)
    const salonId = salonUser.salonUser.id
    // console.log('salonId:', salonId)
    const [SalonDetails, setSalonDetails] = useState(null);
    console.log('SalonDetails:', SalonDetails)
    const [profilePicture, setProfilePicture] = useState(null);
    console.log('profilePicture:', profilePicture)




    useEffect(() => {
      
  
      const fetchSalonDetails = async () =>{
        try{
          const salonResponse = await fetch(`${baseURL}/salon-side/salon/${salonId}/`);
          const salonData = await salonResponse.json();
          console.log('SALONDATA:', salonData)
          setSalonDetails(salonData);
        }catch(error){
          console.error('Error fetching salon details:', error);
        }
      };
  
      fetchSalonDetails();
  
    }, [salonId]);


    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setProfilePicture(file);
    };
  
    const handleFileUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('profile_picture', profilePicture);
  
        const response = await fetch(`${baseURL}/salon-side/salon/${salonId}/upload-profile-picture/`, {
          method: 'POST',
          headers: {
            // You might need to include additional headers based on your backend requirements
          },
          body: formData,
        });
  
        if (response.ok) {
          const updatedSalonDetails = await response.json();
          setSalonDetails(updatedSalonDetails);
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
      <NewSalonNavbar/>
      <div className="container mt-4 w-50" style={{marginBottom: '500px'}}>
        <div className="card">
          <div className="card-header">
            <h1 className="card-title" style={{textAlign:'center'}}>Salon Profile</h1>
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
                  {SalonDetails && SalonDetails.profile_picture ? (
                    <img
                    src={`${SalonDetails.profile_picture}`}
                      alt="Salon Profile"
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
            { SalonDetails !== null ? (
              <>
                 <div style={{ marginBottom: '10px' }}>
                  <strong>Salon Name:</strong> {SalonDetails.salon_name}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
                
                
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Email:</strong> {SalonDetails.email}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />

                <div style={{ marginBottom: '10px' }}>
                  <strong>Mobile:</strong> {SalonDetails.mobile}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />

                <div style={{ marginBottom: '10px' }}>
                  <strong>Location:</strong> {SalonDetails.location}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />


                <div style={{ marginBottom: '10px' }}>
                  <strong>Licence Number:</strong> {SalonDetails.licence_number}
                </div>

              </>
            ) : (
              <p className="card-text">Loading...</p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SalonProfile
