import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap';
import UserNavbar from '../Navbar/UserNavbar';
import Footer from '../Footer/Footer';
import SalonNavbar from '../Navbar/SalonNavbar';


const SalonBookingsView = () => {
    const salon = useSelector(state => state.salon);
    const salonId = salon.salonUser.id
    
    const [bookedAppointments, setBookedAppointments] = useState([])


    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/salon-side/booked-appointments/${salonId}/`);
            setBookedAppointments(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching bookings', error);
          }
        };
    
        fetchBookings();
      }, []); 



  return (
    <div>
        <SalonNavbar/>
        <h2 style={{marginTop: '50px', padding: '10px', marginBottom: '20px'}} >Your Bookings</h2>
        <Container fluid style={{marginBottom: '600px'}}>
        {bookedAppointments.length > 0 ? (
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Service</th>
                    <th>Stylist</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                </tr>
            </thead>
            <tbody>
                {bookedAppointments.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.user_name}</td>
                        <td>{booking.user_email}</td>
                        <td>{booking.service.service_name}</td>
                        <td>{booking.stylist.stylist_name}</td>
                        <td>{booking.date}</td>
                        <td>{`${booking.time_slot.day}: ${booking.time_slot.start_time} - ${booking.time_slot.end_time}`}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        
        ) : (
            <p>No bookings found.</p>
        )}
        </Container>
        <Footer  style={{marginTop: '750px'}} />
    
    </div>
  )
}

export default SalonBookingsView
