import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux'
import axios from 'axios'

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  console.log('***NOTIFICATIONS***', notifications)
  const [notificationCount, setNotificationCount] = useState(0);


  const salonUser = useSelector(state=> state.salon)
    console.log('salonUser:', salonUser)
    const salonId = salonUser.salonUser.id;
    console.log('salonId:', salonId)

    const salonNotifications = notifications.filter(
      (notification) => notification.salon_id === salonId
    ).sort((a, b) => b.id - a.id);

    console.log('SALON NOTIFICATIONS:', salonNotifications)


    const customStyles = {
        content: {
          width: '60%', // Adjust the width as needed
          height: '60%', // Adjust the height as needed
          margin: 'auto',
          backgroundColor: '#1a1a1a', // Set your desired background color
          color: '#ffffff', // Set the text color
          
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the overlay background color and transparency
        },
      };


      useEffect(() => {
        const fetchNotifications = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/salon-side/salon-notification/${salonId}/`);
            setNotifications(response.data.notifications);
            setNotificationCount(response.data.notification_count);
            console.log('RESPOSNE DATA:', response.data)
          } catch (error) {
            console.error('Error fetching notifications:', error);
          }
        };
    
        fetchNotifications();
      }, [salonId]);





      const handleNotificationClick = async (notification) => {
        try {
          await axios.put(`http://127.0.0.1:8000/salon-side/update-notification/${notification.id}/`, {
            is_seen: true,
          });
      
          setNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.id !== notification.id)
          );
      
          setNotificationCount((prevCount) => prevCount - 1);
        } catch (error) {
          console.error('Error updating notification:', error);
        }
      };

    
      const unseenNotifications = notifications.filter((notification) => !notification.is_seen);


return (
  <Modal show={isOpen} onHide={onClose} contentLabel="Notification Modal" style={customStyles}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Total Notifications: {notificationCount}</p>
        <ul>
          {unseenNotifications.map((notification) => (
            <li key={notification.id} onClick={() => handleNotificationClick(notification)}>
              {notification.message}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
);
};

export default NotificationModal;
