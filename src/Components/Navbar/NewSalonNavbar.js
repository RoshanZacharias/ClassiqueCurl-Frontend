import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { clearSalonAuth } from '../../Redux/SalonSlice';
import './NewSalonNavbar.css'
import NotificationModal from '../Notification/NotificationModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../../api/api';


const NewSalonNavbar = () => {
  const navigate = useNavigate();
    const salonUser = useSelector(state=> state.salon)
    
    // const salonId = salonUser.salonUser.id;

    let salonId;
 

    try {
        salonId = salonUser.salonUser.id;
        console.log(salonId);
      
    } catch (error) {
      salonId=0
      navigate('/salon-login')

      console.log('login page')
    }
    

    const dispatch = useDispatch();
   
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [notification, setNotification] = useState([]);
    // console.log('NOTIFICATIONS:', notification)
    const [notificationCount, setNotificationCount] = useState(0);
    // console.log('NOTIFI COUNT:', notificationCount)

    const logout = () =>{
        dispatch(clearSalonAuth());
        navigate('/salon-login');
    }

    const openNotificationModal = () => {
        setIsNotificationModalOpen(true);
        
      };
    
      const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
        // setNotification([]);
      };


      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await axios.get(`${baseURL}/salon-side/salon-notification/${salonId}/`)
            setNotification(data);
          } catch (error) {
            console.error(error);
          }
        };
        if (salonUser) {
          fetchData();
        }
      }, [salonUser]);


      useEffect(() => {
        if (salonUser && salonId) {
          const accessToken = localStorage.getItem("access_token");
          const websocketProtocol =
            window.location.protocol === "https:" ? "wss://" : "ws://";
          // const wsURL = ${websocketProtocol}${window.location.host}/ws/notification/?token=${accessToken};
          // const wsURL = `ws://localhost:8000/ws/salon-notification/${salonId}/`
          const wsURL = `wss://classiquecurl.shop/ws/salon-notification/${salonId}/`
          const socket = new WebSocket(wsURL);
          console.log(wsURL);
      
          socket.onopen = () => {
            console.log("WebSocket connection established");
          };
      
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log(data)
      
            if (data.type === "notification") {
              // console.log("Notification is : ", data.type)
              // Update the notification state with the new notification
              setNotification((prevNotifications) => [
                ...prevNotifications,
                data.payload,
              ]);
              toast.info(`New Notification: ${data.payload.message}`);
            } else if (data.type === "logout") {
              dispatch(logout());
              navigate("/");
            }
            console.log("DATA : : : : : : : ", data)
            console.log("NOTIFICATION LIST : ", notification);
      
          };
      
          socket.onclose = (event) => {
            console.log("WebSocket connection closed", event);
          };
          return () => {
            socket.close();
          };
        }
      }, [dispatch, navigate]);




      


      
      





  return (
    <div className='NavbarItems'>
        <h1 className='navbar-logo'>ClassiqueCurl</h1>
        <ul className='nav-menu'>
            <li>
                <Link className='nav-links' to={'/salon-home'}><i class="fa-solid fa-house"></i>Home</Link>
            </li>
            
            <li>
                <Link className='nav-links' to={'/salon-home/salon-profile'}><i class="fa-solid fa-user"></i>Profile</Link>
            </li>

            {salonUser.isSalonAuthenticated ? (
              <li>
              <Link className='nav-links' to={'/salon-home/salon-messages'}><i class="fa-solid fa-message"></i>Messages</Link>
              </li>
            ):(null)}
            
            <li>
                <Link className='nav-links' to={'/salon-home/salon-bookings'}><i class="fa-solid fa-bookmark"></i>Bookings</Link>
            </li>

            <li>
                <Link className='nav-links' onClick={openNotificationModal}>
                <i className="fa-solid fa-bell"></i>Notification ({notification.length})
                </Link>
            </li>


            {salonUser.isSalonAuthenticated ? (
            // User is logged in, show Logout link
            <li>
                <Link className='nav-links' onClick={logout} to={'/salon-login'}> 
                <i className="fa-solid fa-right-to-bracket"></i>Logout
                </Link>
            </li>
            ) : (
            // User is not logged in, show Sign In link
            <li>
                <Link className='nav-links' to={'/salon-login'} >
                <i className="fa-solid fa-right-to-bracket"></i>Sign In
                </Link>
            </li>
            )}
        </ul>

        <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={closeNotificationModal}
        notifications={notification}
        />
      
    </div>
  )
}

export default NewSalonNavbar
