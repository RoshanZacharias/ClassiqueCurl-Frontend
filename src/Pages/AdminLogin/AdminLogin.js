import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { MDBContainer, MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import {setAdminAccessToken, setAdminUser} from '../../Redux/AdminSlice'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function AdminLogin() {
    const navigator = useNavigate();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const changeEmail = (event) =>{
        setEmail(event.target.value);
        setEmailError('');
    };


    const changePassword = (event) =>{
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleAdminLogin = (event) =>{
        event.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            if(email.trim() === ''){
                setEmailError('Email is required');
            }
            if(password.trim() === ''){
                setPasswordError('Password is required');
            }
        }else{
            axios.post('http://localhost:8000/admin-side/admin-login/', {
                email: email,
                password: password
            })
            .then((response)=>{
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                console.log(response.data);
                dispatch(setAdminAccessToken(response.data.access));
                dispatch(setAdminUser(response.data.user));
                toast.success('Admin Login Successful');
                navigator('/admin-home');
            })
            .catch((error)=>{
                if(error.response && error.response.status === 401){
                    setEmailError('Invalid Email or Password')
                    setPasswordError('Invalid Email or Password')
                }else{
                    console.error('Admin Login Error:', error);
                }
            });
        }
    };



  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <MDBContainer className="p-3 d-flex flex-column w-50">
        <h1 className='text-center'>Admin Login</h1>

        <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' value={email} onChange={changeEmail}
        className={emailError ? 'error' : ''} />
        {emailError && <p className={'error-message'}>{emailError}</p>}


        <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={changePassword}
        className={passwordError ? 'error' : ''} />
        {passwordError && <p className={'error-message'}>{passwordError}</p>}

        <div className="d-flex justify-content-between mx-3 mb-4">
          
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4" type='submit' onClick={handleAdminLogin}>Sign in</MDBBtn>
      </MDBContainer>
    </div>
  );
}

export default AdminLogin;
