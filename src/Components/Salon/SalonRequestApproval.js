import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // You might need to install axios: npm install axios
import {Table, Button} from 'react-bootstrap'; // Make sure to install react-bootstrap
import ImageModal from '../ImageModal';
import AdminNavbar from '../Navbar/AdminNavbar';
import { baseURL } from '../../api/api';

const SalonRequestApproval = () => {
  const { salonId  } = useParams();
  const [salon, setSalon] = useState(null);
  const [isVerified, setIsVerified] = useState(false);


  const navigate = useNavigate();


  const handleAccept = async () => {
    try {
      // Send a PATCH request to your backend to update is_verified to true
      await axios.patch(`${baseURL}/admin-side/salon-list/${salonId}/`, {
        
      });
      
      navigate('/admin-home/salon-list');

      // Handle any additional logic after a successful update if needed

      console.log('Salon accepted successfully');
    } catch (error) {
      console.error('Error accepting salon', error);
    }
  };



  const handleReject = async () => {
    try {
      // You might want to implement a different endpoint or update logic for rejection
      await axios.patch(`${baseURL}/admin-side/salon-list/${salonId}/`, {
        is_verified: false,
      });

      // Redirect to the salon list page after rejecting
      navigate('/admin-home/salon-list');

      console.log('Salon rejected successfully');
    } catch (error) {
      console.error('Error rejecting salon', error);
    }
  };




  useEffect(() => {
    console.log('ID:', salonId);
    console.log(`${baseURL}/admin-side/salon-request-approval/${salonId}`);
    // Fetch salon details based on the id
    const fetchSalonDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin-side/salon-request-approval/${salonId}/`); // Adjust the API endpoint
        setSalon(response.data);
        setIsVerified(response.data.is_verified);
      } catch (error) {
        console.error('Error fetching salon details', error);
      }
    };  

    fetchSalonDetails();
  }, [salonId]);

  if (!salon) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AdminNavbar/>
      <h2>{salon.salon_name} Details</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Salon Name</td>
            <td>{salon.salon_name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{salon.email}</td>
          </tr>

          <tr>
            <td>Location</td>
            <td>{salon.location}</td>
          </tr>

          <tr>
            <td>Mobile</td>
            <td>{salon.mobile}</td>
          </tr>

          <tr>
            <td>Image</td>
            <td>
              <ImageModal src={`${baseURL}${salon.salon_image}`} alt="License" />
            </td>
          </tr>

          <tr>
            <td>Licence Number</td>
            <td>{salon.licence_number}</td>
          </tr>


          {/* Add more rows for other salon details */}
          <tr>
            <td>License</td>
            <td>
              <ImageModal src={`${baseURL}${salon.licence}`} alt="License" />
            </td>
          </tr>
        </tbody>
      </Table>


      <div className='d-flex justify-content-center align-items-center'>
        {salon.is_verified ? (
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
        ) : (
          <Button variant="success" onClick={handleAccept}>
            Accept
          </Button>
        )}
      </div>
      

        
      

      
    </div>
  );
};

export default SalonRequestApproval;
