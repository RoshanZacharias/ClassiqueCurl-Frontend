import React, { useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'
import SalonNavbar from './Navbar/SalonNavbar';
import Footer from './Footer/Footer';

export default function AddStylist() {
    const navigate = useNavigate();
    const salonUser = useSelector(state => state.salon)
    const [stylistName, setStylistName] = useState('');
    const [stylistImage, setStylistImage] = useState(null);
    


    const [stylistNameError, setStylistNameError] = useState('');
    const [stylistImageError, setStylistImageError] = useState(null);
    

    const changeStylistName = (e) =>{
        setStylistName(e.target.value);
        setStylistNameError('');
    }


    const changeStylistImage = (e) =>{
        setStylistImage(e.target.files[0]);
        setStylistImageError('');
    }


    


    

    const handleSubmit = async (e) => {
        console.log('****handleSubmit****')
        e.preventDefault();
      
        if (stylistName.trim() === '' || !stylistImage) {
          if (stylistName.trim() === '') {
            stylistNameError('Stylist name is required');
          }
          if (!stylistImage){
            setStylistImageError("Please upload a valid image");
          }
          
        } else {
            const formData = new FormData();
            formData.append('stylist_name', stylistName);
            formData.append('salon_id', salonUser.salonUser.id);
            formData.append('stylist_image', stylistImage);
          try {
            const response = await axios.post(
              'http://localhost:8000/salon-side/add-stylists/',
              
              formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);
      
            console.log('Stylist added successfully:', response.data);
            toast.success('Stylist added successfully');
            navigate('/salon-home');
          } catch (error) {
            if (error.response && error.response.status === 401) {
              // Unauthorized: Invalid credentials
              setStylistNameError('Invalid stylist name');
              
            } else {
              // Other errors
              console.error('Add stylist error:', error);
            }
          }
        }
      };
      
  return (
    <div>
      <SalonNavbar/>
      <div style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px', marginBottom: '300px' }}>
      <form>
        <MDBRow className='mb-4'>
          <MDBCol className='text-center'>
            <h1>Add Stylist</h1>
          </MDBCol>
        </MDBRow>

        <MDBInput id='stylist-name' wrapperClass='mb-4' label='Stylist Name' type='text' value={stylistName} 
        onChange={changeStylistName} className={stylistNameError ? 'error' : ''} />
        {stylistNameError && <p className={'error-message'}>{stylistNameError}</p>}

        <MDBInput
                wrapperClass='mb-4'
                label='Stylist Image'
                id='stylist-image'
                type='file'
                accept='image/*'
                onChange={changeStylistImage}
                className={stylistImageError ? 'error' : ''}
              />
              {stylistImageError && (
                <p className={'error-message'}>{stylistImageError}</p>
              )}

        
        

        

        <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
            SUBMIT
        </MDBBtn>
      </form>
    </div>
    <Footer/>
    </div>
    
  );
}
