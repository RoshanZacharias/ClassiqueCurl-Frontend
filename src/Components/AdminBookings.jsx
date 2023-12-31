import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AdminNavbar from './Navbar/AdminNavbar';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/admin-side/latest-paid-orders/');
            setBookings(response.data.filter(order => order.isPaid));
          } catch (error) {
            console.error('Error fetching bookings:', error);
          }
        };
    
        fetchBookings();
      }, []);
  return (
    <div>
      <AdminNavbar/>
      <h1 style={{ maxWidth: '80%', margin: 'auto', marginTop:'20px', marginBottom:'10px' }}>Bookings</h1>
      <Table striped bordered hover style={{ maxWidth: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Salon Name</th>
            <th>Order Service</th>
            <th>Order Stylist</th>
            <th>Order Amount</th>
            <th>Time Slot Date</th>
            <th>Time Slot Day</th>
            <th>Time Slot Start Time</th>
            <th>Time Slot End Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.user_name}</td>
              <td>{booking.salon_name}</td>
              <td>{booking.order_service}</td>
              <td>{booking.order_stylist}</td>
              <td>{booking.order_amount}</td>
              <td>{booking.time_slot_date}</td>
              <td>{booking.time_slot_day}</td>
              <td>{booking.time_slot_start_time}</td>
              <td>{booking.time_slot_end_time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminBookings
