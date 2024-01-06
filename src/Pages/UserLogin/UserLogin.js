import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../Redux/UserSlice';



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

function UserLogin() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  const changeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };


  const changePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };


  const handleLogin = (event) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        setEmailError('Email is required');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required');
      }
    } else {
      axios
        .post(`${baseURL}/login/`, {
          email: email,
          password: password,
        }, { withCredentials: true })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log("response.data", response.data);
          console.log(response.data);
          dispatch(setAccessToken(response.data.data));
          dispatch(setUser(response.data.user));
          

          // Redirect to the desired page after successful login
          toast.success('Login Successful');
          navigator('/');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Unauthorized: Invalid credentials
            setEmailError('Invalid email or password');
            setPasswordError('Invalid email or password');
          } else {
            // Other errors
            console.error('Login error:', error);
          }
        });
    }
  };



  return (
    <MDBContainer className='my-5 '>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center '>

          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>
              <h1>Login Page</h1>

              <MDBInput wrapperClass='mb-4 w-75' label='Email address' id='email' type='email' value={email} onChange={changeEmail} 
              className={emailError ? 'error' : ''} />
              {emailError && <p className={'error-message'}>{emailError}</p>}


              <MDBInput wrapperClass='mb-4 w-75' label='Password' id='password' type='password' value={password} onChange={changePassword}
              className={passwordError ? 'error' : ''}/>
              {passwordError && <p className={'error-message'}>{passwordError}</p>}

              <div className="d-flex justify-content-between mx-4 mb-4">
                
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-75" type='submit' onClick={handleLogin}>Sign in</MDBBtn>
              <GoogleOAuthProvider clientId="863926768719-05krrpimr8g0ietobt4rfgh03fmi88ri.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      console.log(decoded);

                      axios
        .post(`${baseURL}/user-google-auth/`, {
          email: decoded.email,
          name: decoded.given_name,
        }, { withCredentials: true })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log("response.data", response.data);
          console.log(response.data);
          dispatch(setAccessToken(response.data.data));
          dispatch(setUser(response.data.user));
          

          // Redirect to the desired page after successful login
          toast.success('Login Successful');
          navigator('/');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Unauthorized: Invalid credentials
            setEmailError('Invalid email or password');
            setPasswordError('Invalid email or password');
          } else {
            // Other errors
            console.error('Login error:', error);
          }
        });
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
            </GoogleOAuthProvider>

            </MDBCardBody>
            


          </MDBCol>

        </MDBRow>
        

      </MDBCard>
      
    </MDBContainer>
    
    
  );
}

export default UserLogin;