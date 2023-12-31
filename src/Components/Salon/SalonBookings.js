import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import NewSalonNavbar from '../Navbar/NewSalonNavbar';


const SalonBookingsView = () => {
    const salon = useSelector(state => state.salon);
    const salonId = salon.salonUser.id
    const statusColors = {
      Pending: 'orange',
      Completed: 'green',
      Cancelled: 'red',
    };
    
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


      const handleStatusChange = async (orderId, newStatus) => {
        try {
          // Make a PATCH request to update the status
          const response = await axios.patch(
            `http://127.0.0.1:8000/salon-side/order/update-status/${orderId}/`,
            { status: newStatus }
          );
    
          // Check if the request was successful
          if (response.status === 200) {
            // Update the status in the local state
            const updatedAppointments = bookedAppointments.map((appointment) =>
              appointment.id === orderId
                ? { ...appointment, status: newStatus }
                : appointment
            );
            setBookedAppointments(updatedAppointments);
    
            // Log success or perform any other actions as needed
            console.log('Order status updated successfully');
          }
        } catch (error) {
          // Handle errors
          console.error('Error updating order status', error);
        }
    };
    



  return (
    <div>
        <NewSalonNavbar/>
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
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {bookedAppointments.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.user_name}</td>
                        <td>{booking.user_email}</td>
                        <td>{booking.order_service}</td>
                        <td>{booking.order_stylist}</td>
                        <td>₹ {booking.order_amount}</td>
                        <td>{booking.time_slot_date}</td>
                        <td>{`${booking.time_slot_day}: ${booking.time_slot_start_time} - ${booking.time_slot_end_time}`}</td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            style={{ color: statusColors[booking.status] }}
                          >
                            {Object.keys(statusColors).map((status) => (
                              <option key={status} value={status} style={{ color: statusColors[status] }}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

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
