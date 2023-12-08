// BookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import { Container, Table } from 'react-bootstrap';
import AlertDialogExample from './AlertBox';
import UserNavbar from './Navbar/UserNavbar';
import Footer from './Footer/Footer';

const BookingsPage = () => {
    const user = useSelector(state => state.user);
    const userId = user.user.id
    console.log(userId)
    const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/bookings/${userId}/`);
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };

    fetchBookings();
  }, []); 


  const handleCancelBooking = async (appointmentId) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/appointments/update-booking-status/${appointmentId}/`, {
        is_Booked: false,
      });
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== appointmentId));
  
      console.log('Booking canceled successfully');
    } catch (error) {
      console.error('Error canceling booking', error);
    }
  };



  return (
    <div>
      <UserNavbar/>
        <h2 style={{marginTop: '50px', paddingLeft: '100px'}} >Your Bookings</h2>
        <Container fluid style={{padding: '20px 100px', paddingBottom: '200px'}}>
        {bookings.length > 0 ? (
            <Table striped bordered hover responsive >
            <thead>
                <tr>
                <th>ID</th>
                <th>Salon</th>
                <th>Service</th>
                <th>Stylist</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.salon_name}</td>
                    <td>{booking.service.service_name}</td>
                    <td>{booking.stylist.stylist_name}</td>
                    <td>{booking.date}</td>
                    <td>{`${booking.time_slot.day}: ${booking.time_slot.start_time} - ${booking.time_slot.end_time}`}</td>
                    <td>
                    <AlertDialogExample
                        className = 'text-center w-50'
                        buttonText= 'Cancel'
                        title='CANCEL'
                        message='Are you sure you want to cancel appointment?'
                        colorScheme='red'
                        onConfirm={() => handleCancelBooking(booking.id)}  />
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        ) : (
            <p>No bookings found.</p>
        )}
        </Container>

        <Footer />
    
    </div>
  );
};

export default BookingsPage;
