import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';

function UserRegister() {
    const navigator = useNavigate();
    

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');



    
    const changeFirstname = (event) => {
      setFirstname(event.target.value);
      console.log("-----"+firstname)
      setFirstnameError('');
    }

    const changeLastname = (event) =>{
      setLastname(event.target.value);
      console.log("-----"+lastname)
      setLastnameError('');
    }


    const changeEmail = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
      console.log("-----"+email)
    
      if (!isValidEmail(emailValue)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };
    

    // Email validation function
    const isValidEmail = (email) => {
      // You can use a regular expression or any other method for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };



    const changeMobile = (event) =>{
      setMobile(event.target.value);
      console.log("-----"+mobile)
      setMobileError('');
    }



    const changePassword = (event) => {
      setPassword(event.target.value);
      console.log("---"+password)
      setPasswordError('');
    }



    const changeConfirmPassword = (event) => {
      setConfirmPassword(event.target.value);
      console.log("-----"+confirmPassword)
      setPasswordError('');
    }





    const handleSubmit = (event) => {
      event.preventDefault();
      if (firstname.trim() === '' || lastname.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || email.trim() === '' || mobile.trim() === '') {
          if (firstname.trim() === '') {
              setFirstnameError('First name is required');
          }
          if (lastname.trim() === '') {
              setLastnameError('Last name is required');
          }
          if (email.trim() === ''){
            setEmailError('Email is required')
          }
          if (mobile.trim() === ''){
            setMobileError('Phone No is required')
          }
          if (password.trim() === '') {
              setPasswordError('Password is required');
          }
          if (confirmPassword.trim() === '') {
              setConfirmPasswordError('Confirm password is required');
          }
      } else if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match');
      }
      else {
          axios.post(`http://localhost:8000/register/`, {
              first_name: firstname,
              last_name: lastname,
              email: email,
              mobile:mobile,
              password: password
          }).then((response) => {
              localStorage.setItem('accessToken', response.data.access);
              localStorage.setItem('refreshToken', response.data.refresh);
              console.log(response.data)
              const user = response.data.user;
              // dispatch(loginUser({user}))
              navigator('/login');
          }).catch((error) =>{
              if (error.code === 'ERR_BAD_REQUEST'){
                  setEmailError(error.response.data.email ? error.response.data.email : '')
                  setPasswordError(error.response.data.password ? error.response.data.password : '')
                  setFirstnameError(error.response.data.firstname ? error.response.data.firstname : '')
              }
          });
      }
  }



  return (
    <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='firstname' type='text' value={firstname} 
                  onChange={changeFirstname} className={firstnameError ? 'error' : ''} />
                  {firstnameError && <p className={'error-message'}>{firstnameError}</p>}
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='lastname' type='text' value={lastname} onChange={changeLastname}
                  className={lastnameError ? 'error' : ''} />
                  {lastnameError && <p className={'error-message'}>{lastnameError}</p>}
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' value={email} onChange={changeEmail}
              className={emailError ? 'error' : ''} />
              {emailError && <p className={'error-message'}>{emailError}</p>}

              <MDBInput wrapperClass='mb-4' label='Mobile' id='mobile' type='text' value={mobile} onChange={changeMobile}
              className={mobileError ? 'error' : ''} />
              {mobileError && <p className={'error-message'}>{mobileError}</p>}

              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={changePassword}
              className={passwordError ? 'error' : ''}/>
              {passwordError && <p className={'error-message'}>{passwordError}</p>}

              <MDBInput wrapperClass='mb-4' label='Confirm Password' id='confirmpassword' type='password' value={confirmPassword} onChange={changeConfirmPassword} className={confirmPasswordError ? 'error' : ''} />
              {confirmPasswordError && <p className={'error-message'}>{confirmPasswordError}</p>}

              
              <MDBBtn className='w-100 mb-4' size='md' type='submit' onClick={handleSubmit} >
                Sign up
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg" class="w-100 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default UserRegister;