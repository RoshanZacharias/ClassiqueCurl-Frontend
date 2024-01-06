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
import Footer from './Footer/Footer';
import NewSalonNavbar from './Navbar/NewSalonNavbar';
import { baseURL } from '../api/api';

export default function AddService() {
    const navigate = useNavigate();
    const salonUser = useSelector(state => state.salon)
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');


    const [serviceNameError, setServiceNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [rateError, setRateError] = useState('');

    const changeServiceName = (e) =>{
        setServiceName(e.target.value);
        setServiceNameError('');
    }


    const changeDescription = (e) =>{
        setDescription(e.target.value);
        setDescriptionError('');
    }


    const changeRate = (e) =>{
        setRate(e.target.value);
        setRateError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (serviceName.trim() === '' || description.trim() === '' || rate.trim() === '') {
          if (serviceName.trim() === '') {
            serviceNameError('Service name is required');
          }
          if (description.trim() === '') {
            descriptionError('Description is required');
          }
          if (rate.trim() === '') {
            rateError('Rate is required');
          }
        } else {
          try {
            const response = await axios.post(
              `${baseURL}/salon-side/add-service/`,
              {
                service_name: serviceName,
                description: description,
                price: rate,
                salon_id: salonUser.salonUser.id,
              },
              { withCredentials: true }
            );
            console.log(response.data);
      
            console.log('Service added successfully:', response.data);
            toast.success('Service added successfully');
            navigate('/salon-home');
          } catch (error) {
            if (error.response && error.response.status === 401) {
              // Unauthorized: Invalid credentials
              setServiceNameError('Invalid service name');
              setDescriptionError('Invalid description');
              setRateError('Invalid rate');
            } else {
              // Other errors
              console.error('Add service error:', error);
            }
          }
        }
      };
      
  return (
    <div>
      <NewSalonNavbar/>
      <div style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px', marginBottom: '300px' }}>
      
      <form>
        <MDBRow className='mb-4'>
          <MDBCol className='text-center'>
            <h1>Add Service</h1>
          </MDBCol>
        </MDBRow>

        <MDBInput id='service-name' wrapperClass='mb-4' label='Service Name' type='text' value={serviceName} 
        onChange={changeServiceName} className={serviceNameError ? 'error' : ''} />
        {serviceNameError && <p className={'error-message'}>{serviceNameError}</p>}

        <MDBInput wrapperClass='mb-4' id='description' rows={4} label='Description' value={description}
        onChange={changeDescription}  className={descriptionError ? 'error' : ''} />
        {descriptionError && <p className={'error-message'}>{descriptionError}</p>}

        <MDBInput type='text' id='rate' wrapperClass='mb-4' label='Rate' value={rate}
        onChange={changeRate} className={rateError ? 'error' : ''} />
        {rateError && <p className={'error-message'}>{rateError}</p>}
        

        

        <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
            SUBMIT
        </MDBBtn>
      </form>
      
    </div>
    <Footer/>
    </div>
    
  );
}
