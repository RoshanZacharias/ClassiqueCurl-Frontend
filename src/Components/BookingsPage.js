// BookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import { Container, Table } from 'react-bootstrap';
import AlertDialogExample from './AlertBox';
import Footer from './Footer/Footer';
import NewUserNavbar from './Navbar/NewUserNavbar';
import { useNavigate } from 'react-router-dom';

const BookingsPage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();


    
   
    const [bookings, setBookings] = useState([]);
    
    let userId;

    try {
        userId = user.user.id;
        console.log(userId);
      
    } catch (error) {
      userId = 0;
      console.error('Error accessing user ID', error);
    }
    
    
    
    useEffect(() => {
      
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/bookings/${userId}/`);
          const reversedBookings = response.data.reverse(); // Reverse the array
          setBookings(reversedBookings);
          console.log('***BOOKINGS***', reversedBookings);
        } catch (error) {
          console.error('Error fetching bookings', error);
        }
      };
    
      fetchBookings();
    }, []);
    


  const handleCancelBooking = async (orderId) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/orders/cancel/${orderId}/`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === orderId ? { ...booking, isPaid: false, status: 'Cancelled' } : booking
        )
      );
      console.log('Order canceled successfully');
    } catch (error) {
      console.error('Error canceling order', error);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Completed':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'black'; // Default color, you can change it as needed
    }
  };
  




  return (
    <div>
      
      <NewUserNavbar/>
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
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.salon_name}</td>
                    <td>{booking.order_service}</td>
                    <td>{booking.order_stylist}</td>
                    <td>{booking.time_slot_date}</td>
                    <td>{`${booking.time_slot_day}: ${booking.time_slot_start_time} - ${booking.time_slot_end_time}`}</td>
                    <td>₹ {booking.order_amount}</td>
                    <td style={{ color: getStatusColor(booking.status) }}>{booking.status}</td>
                    <td>
                    {booking.status === 'Pending' ? (
                      <AlertDialogExample
                        className="text-center w-50"
                        buttonText="Cancel"
                        title="CANCEL"
                        message="Are you sure you want to cancel appointment?"
                        colorScheme="red"
                        onConfirm={() => handleCancelBooking(booking.id)}
                      />
                    ) : null}

                      {console.log('Booking status:', booking.status, 'Is Paid:', booking.isPaid)}
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
