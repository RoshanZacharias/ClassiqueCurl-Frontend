// BookingOverview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Card, Container, Row, Col, Button } from 'react-bootstrap';
import UserNavbar from '../Navbar/UserNavbar';
import AlertDialogExample from '../AlertBox';
import Footer from '../Footer/Footer';
import SuccessPage from '../SuccessMessage';

const BookingOverview = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  console.log('appointmentId:', appointmentId)
  const [appointmentData, setAppointmentData] = useState(null);

  

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/booking-overview/${appointmentId}/`)
      .then(response => {
        console.log('Fetched booking details:', response.data);
        setAppointmentData(response.data);
      })
      .catch(error => {
        console.log('Error fetching booking details', error);
      });
  }, [appointmentId]);





  

  if (!appointmentData) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' width='500px' height='500px' />
  </div>;
  }

  const handleBookingConfirmation = () =>{
    axios.patch('http://127.0.0.1:8000/appointments/update-booking-status/', {
      appointmentId: appointmentId,
      is_Booked: true,
    })
    .then(response => {
      console.log('Booking successful');
      navigate('/success');
    })
    .catch(error => {
      console.error('Error updating booking status', error);
    });
  }

  

  return (
    <div>
      <UserNavbar />
    <Container className="mt-5">
    
    <h1 className="mb-4 text-center">Booking Overview</h1>
    
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>User Details</Card.Title>
            <Card.Text>User: {appointmentData.user_name}</Card.Text>
            <Card.Text>Email: {appointmentData.user_email}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="mt-4 justify-content-md-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Appointment Details</Card.Title>
            <Card.Text>Salon: {appointmentData.salon_name}</Card.Text>
            <Card.Text>Service: {appointmentData.service.service_name}</Card.Text>
            <Card.Text>Stylist: {appointmentData.stylist.stylist_name}</Card.Text>
            <Card.Text>Date: {appointmentData.date}</Card.Text>
            <Card.Text>
              Time Slot: {appointmentData.time_slot.day}: {appointmentData.time_slot.start_time} - {appointmentData.time_slot.end_time}
            </Card.Text>
            <Card.Text>Rate: {appointmentData.price}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="mt-4 justify-content-md-center" style={{marginBottom: '50px'}}>
    <AlertDialogExample
    className = 'text-center w-50'
    buttonText= 'CONTINUE BOOKING'
    title='CONTINUE BOOKING'
    message='Are you sure you want to make an appointment?'
    colorScheme='blue'
    onConfirm= {handleBookingConfirmation} />
    </Row>  

    

  </Container>
  <Footer/>
    </div>
    

  );

  
};

export default BookingOverview;
