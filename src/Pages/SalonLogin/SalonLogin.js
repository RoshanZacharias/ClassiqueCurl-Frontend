import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSalonAccessToken, setSalonUser } from '../../Redux/SalonSlice';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  
}
from 'mdb-react-ui-kit';
import { baseURL } from '../../api/api';

function SalonLogin() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const changeEmail = (event)=>{
    setEmail(event.target.value);
    setEmailError('');
  }


  const changePassword = (event)=>{
    setPassword(event.target.value);
    setPasswordError('');
  }


  const handleLogin = (event)=>{
    event.preventDefault();

    if (email.trim() === '' || password.trim() === ''){
      if (email.trim() === ''){
        setEmailError("Email is required");
      }
      if (password.trim() === ''){
        setPasswordError("Password is required");
      }
    }else{
      axios.post(`${baseURL}/salon-side/salon-login/`, {
        email: email,
        password: password,
      },{ withCredentials: true })
      .then((response) =>{
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        console.log("***********************");
        console.log(response.data);
        console.log("************Salon***********");
        console.log(response.data.salon);
        toast.success('Login Successful');
        dispatch(setSalonAccessToken(response.data.data));
        dispatch(setSalonUser(response.data.salon));

        navigator('/salon-home');
      })
      .catch((error) =>{
        if (error.response && error.response.status === 401){
          setEmailError('Invalid email or password');
          setPasswordError('Invalid email or password');
        }else{
          console.error('Login error:', error);
        }
      });
    }
  };





  return (
    <MDBContainer className='my-5 w-75'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center '>

          <MDBCol md='4'>
            <MDBCardImage src='https://static.wixstatic.com/media/172d51_785874749f0543d69d15643a27c4dff2~mv2.jpg/v1/fill/w_640,h_802,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/172d51_785874749f0543d69d15643a27c4dff2~mv2.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>
                <h1>Salon Login</h1>

              <MDBInput wrapperClass='mb-4 w-75' label='Email Address' id='email' type='email'
              value={email} onChange={changeEmail} className={emailError ? 'error' : ''}/>
              {emailError && <p className={'error-message'}>{emailError}</p>}



              <MDBInput wrapperClass='mb-4 w-75' label='Password' id='password' type='password' value={password} 
              onChange={changePassword} 
              className={passwordError ? 'error' : ''}/>
              {passwordError && <p className={'error-message'}>{passwordError}</p>}

              <div className="d-flex justify-content-between mx-4 mb-4">
                
                <a href="/salon-register">Salon Register</a>
              </div>

              <MDBBtn className="mb-4 w-75" type='submit' onClick={handleLogin}>Sign in</MDBBtn>
             
            </MDBCardBody>


          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default SalonLogin;