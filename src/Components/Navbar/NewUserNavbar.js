import React, {useState, useEffect} from 'react'
import './NewUserNavbar.css'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { clearAuth } from '../../Redux/UserSlice';
import SalonNotification from '../Notification/SalonNotification';
import NotificationModal from '../Notification/NotificationModal';


const NewUserNavbar = () => {
    
    const user = useSelector(state => state.user);
    console.log(user)
    // const userId = user.user.id;
    // console.log('userID:', userId)
    const salonUser = useSelector(state=> state.salon)
    console.log('salonUser:', salonUser)
    const salonId = salonUser.salonUser.id;
    console.log('salonId:', salonId)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [notification, setNotification] = useState([]);
    console.log('NOTIFICATIONS:', notification)


    const openNotificationModal = () => {
        setIsNotificationModalOpen(true);
      };
    
      const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
        setNotification([]);
      };

    const logout = () =>{
        dispatch(clearAuth());
        navigate('/login');
    }


    // useEffect(() => {
    //     if (salonUser && salonId) {
          
    //      const wsURL = `ws://localhost:8000/ws/salon-notification/${salonId}/`;
    //     //  const wsURL = `ws://localhost:8000/ws/salon-notification/${salonId}/`;


    //      console.log('WebSocket URL:', wsURL);

      
    //       const socket = new WebSocket(wsURL);
      
    //       socket.onopen = () => {
    //         console.log("WebSocket connection established");
    //       };

    //       socket.onerror = (error) => {
    //         console.error("WebSocket error:", error);
    //       };
          
      
    //       socket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
      
    //         if (data.type === "notification") {
    //           // Filter notifications relevant to the logged-in salonUser
    //           const salonUserNotifications = data.payload.filter(
    //             (notification) => notification.receiver_type === "salonuser"
    //           );
      
    //           // Update the notification state with the new notifications
    //           setNotification((prevNotifications) => [
    //             ...prevNotifications,
    //             ...salonUserNotifications,
    //           ]);
    //         } else if (data.type === "logout") {
    //           dispatch(logout());
    //           navigate("/");
    //         }
    //       };
      
    //       socket.onclose = (event) => {
    //         console.log("WebSocket connection closed", event);
    //       };
      
    //       return () => {
    //         socket.close();
    //       };
    //     }
    //   }, [salonUser, salonId, dispatch, navigate]); 

    


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

            {user.isAuthenticated ? (
                <li>
                <Link className='nav-links' to={'/messages'}><i class="fa-solid fa-message"></i>Messages</Link>
            </li>
            ):(null)}
            

            {user.isAuthenticated ? (
                <li>
                <Link className='nav-links' to={'/bookings'}><i class="fa-solid fa-bookmark"></i>Bookings</Link>
            </li>
            ):(null)}
            

            

            {user.isAuthenticated ? (
            // User is logged in, show Logout link
            <li>
                <Link className='nav-links' onClick={logout} to={'/login'}> 
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

            {/* <li>
                <SalonNotification/>
            </li> */}
        </ul>
        <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={closeNotificationModal}
        notifications={notification}
        />
    </div>
  )
}

export default NewUserNavbar
