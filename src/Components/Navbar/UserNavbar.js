import React from 'react'
import './UserNavbar.css';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import useLogout from '../UseLogout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { clearAuth } from '../../Redux/UserSlice';

const UserNavbar = () => {
  const dispatch = useDispatch();
  // const handleLogout = useLogout();
  const handleLogout = () =>{
    try {
      const response = axios.get("http://localhost:8000/logout/", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required
          // 'Authorization': 'Bearer <your-token>',
        },
      });

      if (response.data) {
        console.log("Logout successful");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Logout error", error);
    }

    dispatch(clearAuth());

    // You may add navigation logic here if needed
  }
  
  return (
    <div>
      <nav className='NavbarItems'>
        <h1 className='navbar-logo'>ClassiqueCurl</h1>
        <ul className='nav-menu'>
            {MenuItems.map((item, index)=>{
                return(
                    <li key={index}>
                        <Link className={item.cName} to={item.url} onClick={item.title === 'Logout' ? {handleLogout} : item.onClick}><i class={item.icon}></i>{item.title}</Link>
                    </li>
                )
            })}
            
        </ul>
      </nav>
    </div>
  )
}

export default UserNavbar
