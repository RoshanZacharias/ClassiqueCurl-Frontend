import React, {useState} from 'react'
import './NewUserNavbar.css'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { clearAuth } from '../../Redux/UserSlice';


const NewUserNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector(state => state.user);
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = () =>{
        dispatch(clearAuth());
        navigate('/login');
    }

    


  return (
    <div className='NavbarItems'>
        <h1 className='navbar-logo'>ClassiqueCurl</h1>
        <ul className='nav-menu'>
            <li>
                <Link className='nav-links' to={'/'}><i class="fa-solid fa-house"></i>Home</Link>
            </li>
            <li>
                <Link className='nav-links' to={'/salons'}><i class="fa-solid fa-scissors"></i>Salons</Link>
            </li>
            <li>
                <Link className='nav-links' to={'/profile'}><i class="fa-solid fa-user"></i>Profile</Link>
            </li>

            
            <li>
                <Link className='nav-links' to={'/messages'}><i class="fa-solid fa-message"></i>Messages</Link>
            </li>
            <li>
                <Link className='nav-links' to={'/bookings'}><i class="fa-solid fa-bookmark"></i>Bookings</Link>
            </li>
            {user.isAuthenticated ? (
            // User is logged in, show Logout link
            <li>
                <Link className='nav-links' onClick={logout} to={'/login'}> {/* Replace '/logout' with your actual logout route */}
                <i className="fa-solid fa-right-to-bracket"></i>Logout
                </Link>
            </li>
            ) : (
            // User is not logged in, show Sign In link
            <li>
                <Link className='nav-links' to={'/login'} >
                <i className="fa-solid fa-right-to-bracket"></i>Sign In
                </Link>
            </li>
            )}
        </ul>
      
    </div>
  )
}

export default NewUserNavbar
