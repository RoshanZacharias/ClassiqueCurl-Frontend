import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from 'mdb-react-ui-kit';
import { baseURL } from '../../api/api';

function SalonRegister() {
  const navigator = useNavigate();

  const [salonName, setSalonName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [licence, setLicence] = useState(null);
  const [licenceNumber, setLicenceNumber] = useState('');
  const [salonImage, setSalonImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [salonNameError, setSalonNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [licenceError, setLicenceError] = useState(null);
  const [licenceNumberError, setLicenceNumberError] = useState('');
  const [salonImageError, setSalonImageError] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const changeSalonName = (e) => {
    setSalonName(e.target.value);
    setSalonNameError('');
  };

  const changeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!isValidEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const changeMobile = (e) => {
    setMobile(e.target.value);
    setMobileError('');
  };

  const changeLocation = (e) => {
    setLocation(e.target.value);
    setLocationError('');
  };

  const changeLicence = (e) => {
    setLicence(e.target.files[0]);
    setLicenceError('');
  };

  const changeLicenceNumber = (e) => {
    setLicenceNumber(e.target.value);
    setLicenceNumberError('');
  };


  const changeSalonImage = (e) =>{
    setSalonImage(e.target.files[0]);
    setSalonImageError('');
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      salonName.trim() === '' ||
      location.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === '' ||
      email.trim() === '' ||
      mobile.trim() === '' ||
      licenceNumber.trim() === '' ||
      !licence || !salonImage
    ) {
      // Validation errors...
      if (salonName.trim() === ''){
        setSalonNameError('Salon name is required');
      }
      if (location.trim() === ''){
        setLocationError('Location is required');
      }
      if (password.trim() === ''){
        setPasswordError('Password is required');
      }
      if (confirmPassword.trim() === ''){
        setConfirmPasswordError('Confirm Password is required');
      }
      if (email.trim() === ''){
        setEmailError('Email is required');
      }
      if (mobile.trim() === ''){
        setMobileError('Mobile is required');
      }
      if (licenceNumber.trim() === ''){
        setLicenceNumberError('Licence is required');
      }
      if (!licence){
        setLicenceError("Please upload a valid Licence");
      }
      if (!salonImage){
        setLicenceError("Please upload a valid image");
      }

    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      const formData = new FormData();
      formData.append('salon_name', salonName);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('location', location);
      formData.append('licence_number', licenceNumber);
      formData.append('password', password);
      formData.append('licence', licence);
      formData.append('salon_image', salonImage);

      try {
        const response = await axios.post(
          `${baseURL}/salon-side/salon-register/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        console.log(response.data);
        const user = response.data.user;
        // dispatch(loginUser({user}))
        navigator('/salon-login');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle validation errors or other errors
          console.error('Bad request:', error.response.data);
        } else {
          console.error('Unhandled error:', error.message);
        }
      }
    }
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)',
          height: '300px',
        }}
      ></div>

      <MDBCard
        className='mx-5 mb-5 p-5 shadow-5 w-75'
        style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)',
        }}
      >
        <MDBCardBody className='p-5 text-center'>
          <h2 className='fw-bold mb-5'>Salon Register</h2>

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput
                wrapperClass='mb-4'
                label='Salon Name'
                id='salonName'
                type='text'
                value={salonName}
                onChange={changeSalonName}
                className={salonNameError ? 'error' : ''}
              />
              {salonNameError && (
                <p className={'error-message'}>{salonNameError}</p>
              )}
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                id='email'
                type='email'
                value={email}
                onChange={changeEmail}
                className={emailError ? 'error' : ''}
              />
              {emailError && <p className={'error-message'}>{emailError}</p>}
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass='mb-4'
            label='Mobile'
            id='mobile'
            type='text'
            value={mobile}
            onChange={changeMobile}
            className={mobileError ? 'error' : ''}
          />
          {mobileError && <p className={'error-message'}>{mobileError}</p>}

          <MDBInput
            wrapperClass='mb-4'
            label='Location'
            id='location'
            type='text'
            value={location}
            onChange={changeLocation}
            className={locationError ? 'error' : ''}
          />
          {locationError && (
            <p className={'error-message'}>{locationError}</p>
          )}

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput
                wrapperClass='mb-4'
                label='Upload Licence'
                id='licence'
                type='file'
                accept='image/*'
                onChange={changeLicence}
                className={licenceError ? 'error' : ''}
              />
              {licenceError && (
                <p className={'error-message'}>{licenceError}</p>
              )}
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput
                wrapperClass='mb-4'
                label='Licence Number'
                id='licence-number'
                type='text'
                value={licenceNumber}
                onChange={changeLicenceNumber}
                className={licenceNumberError ? 'error' : ''}
              />
              {licenceNumberError && (
                <p className={'error-message'}>{licenceNumberError}</p>
              )}
            </MDBCol>
          </MDBRow>


          <MDBInput
                wrapperClass='mb-4'
                label='Upload Salon Image'
                id='salonImage'
                type='file'
                accept='image/*'
                onChange={changeSalonImage}
                className={salonImageError ? 'error' : ''}
              />
              {salonImageError && (
                <p className={'error-message'}>{salonImageError}</p>
              )}


          
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='password'
            type='password'
            value={password}
            onChange={changePassword}
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <p className={'error-message'}>{passwordError}</p>}

          <MDBInput
            wrapperClass='mb-4'
            label='Confirm Password'
            id='confirm-password'
            type='password'
            value={confirmPassword}
            onChange={changeConfirmPassword}
            className={confirmPasswordError ? 'error' : ''}
          />
          {confirmPasswordError && (
            <p className={'error-message'}>{confirmPasswordError}</p>
          )}

          <MDBBtn
            className='w-100 mb-4'
            size='md'
            type='submit'
            onClick={handleSubmit}
          >
            sign up
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SalonRegister;
