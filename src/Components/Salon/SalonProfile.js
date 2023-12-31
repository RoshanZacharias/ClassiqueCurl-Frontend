import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import NewSalonNavbar from '../Navbar/NewSalonNavbar'
import Footer from '../Footer/Footer'

const SalonProfile = () => {
    const salonUser = useSelector(state => state.salon)
    console.log('salonuser:', salonUser)
    const salonId = salonUser.salonUser.id
    console.log('salonId:', salonId)
    const [SalonDetails, setSalonDetails] = useState(null);




    useEffect(() => {
      
  
      const fetchSalonDetails = async () =>{
        try{
          const salonResponse = await fetch(`http://127.0.0.1:8000/salon-side/salon/${salonId}/`);
          const salonData = await salonResponse.json();
          console.log('SALONDATA:', salonData)
          setSalonDetails(salonData);
        }catch(error){
          console.error('Error fetching salon details:', error);
        }
      };
  
      fetchSalonDetails();
  
    }, [salonId]);
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
                  {SalonDetails && SalonDetails.salon_image ? (
                    <img
                    src={`http://127.0.0.1:8000${SalonDetails.salon_image}`}
                      alt="Salon Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person fs-1 text-secondary"></i>
                  )}
                </div>
                
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
