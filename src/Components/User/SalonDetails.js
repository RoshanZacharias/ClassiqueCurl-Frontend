import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { Spinner } from '@chakra-ui/react'
import Table from 'react-bootstrap/Table';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewUserNavbar from '../Navbar/NewUserNavbar';
import { baseURL, imageBaseUrl } from '../../api/api';

const SalonDetails = () => {
  const locations = useLocation();  
  const navigate = useNavigate();
  const salonUser = useSelector(state => state.salon);
  console.log(salonUser)
  const user = useSelector(state => state.user);
  console.log(user)
  const [salonDetails, setSalonDetails] = useState(null);
  const [services, setServices] = useState([]);
  console.log('services:', services)
  const [stylists, setStylists] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isTimeSlotUnavailableMessageVisible, setIsTimeSlotUnavailableMessageVisible] = useState(false);



  const selectedServiceObject = services.find(service => service.id === parseInt(selectedService));
  const servicePrice = selectedServiceObject ? selectedServiceObject.price : 0;
  const selectedServiceName = selectedServiceObject ? selectedServiceObject.service_name : null;
  console.log('selectedServiceName:',selectedServiceName )
  const selectedDescription = selectedServiceObject ? selectedServiceObject.description : null;
  console.log('selectedDescription:', selectedDescription);

  const selectedStylistsObject = stylists.find(stylist => stylist.id === parseInt(selectedStylist));
  const selectedStylistName = selectedStylistsObject ? selectedStylistsObject.stylist_name : null;
  console.log(selectedStylistName);

  const selectedTimeSlotObject = timeSlots.find(timeslot => timeslot.id === parseInt(selectedTimeSlot));
  const selectedDay = selectedTimeSlotObject ? selectedTimeSlotObject.day : null;
  console.log(selectedDay); 

  const selectedStartTime = selectedTimeSlotObject ? selectedTimeSlotObject.start_time : null;
  console.log(selectedStartTime)

  const selectedEndTime = selectedTimeSlotObject ? selectedTimeSlotObject.end_time : null;
  console.log(selectedEndTime)


  useEffect(() => {
    // Get salon ID from URL parameters if available, otherwise use the salonUser ID
    const salonId = locations.pathname.split('/').pop() ;

    axios.get(`${baseURL}/salon-detail/${salonId}/`)
      .then(response => {
        console.log('Fetched salon details:', response.data);
        setSalonDetails(response.data);
      })
      .catch(error => {
        console.log('Error fetching salon details', error);
      });
  }, [locations.pathname]);


  useEffect(() => {
    // When the selected date changes, identify the day
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    setSelectedDayOfWeek(dayOfWeek);
  }, [selectedDate]);


  useEffect(() => {
    const salonId = locations.pathname.split('/').pop();
    // Fetch services
    axios.get(`${baseURL}/services/${salonId}/`)
      .then(response => {
        setServices(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching services', error);
      });

    // Fetch stylists
    axios.get(`${baseURL}/stylists/${salonId}/`)
      .then(response => {
        setStylists(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching stylists', error);
      });

    // Fetch time slots
    axios.get(`${baseURL}/time-slots/${salonId}/`)
      .then(response => {
        setTimeSlots(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching time slots', error);
      });
  }, [ locations.pathname]);

  if (!salonDetails) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' width='300px' height='300px' />
  </div>
  
  }

  const { salon_name, email, mobile, location, salon_image } = salonDetails;


  

  


  const handleAppointmentSubmit = (event) => {
    const salonId = locations.pathname.split('/').pop();
    event.preventDefault();

    // Validate form fields
    if (!selectedService || !selectedStylist || !selectedDate || !selectedTimeSlot) {
      console.error('Please fill in all fields');
      return;
    }

    const user_name = user.user.name
    console.log(user_name)


    const user_email = user.user.username
    console.log(user_email)
    
    const userId = user.user.id;
    console.log(userId);

    const salon_name = salonDetails.salon_name

    const isTimeSlotAvailable = timeSlots.find(
      (timeSlot) => timeSlot.id === parseInt(selectedTimeSlot) && !timeSlot.is_booked
    );

    console.log('isTimeSlotAvailable:', isTimeSlotAvailable);
  
    if (!isTimeSlotAvailable.id) {
      console.error('This time slot is already booked');
      setIsTimeSlotUnavailableMessageVisible(true);
      console.log('isTimeSlotUnavailableMessageVisible set to true');
      return;
    }
 

    // Prepare the appointment data
    const appointmentData = {
      user: userId,
      salon: salonId,
      salon_name: salon_name,
      user_name: user_name,
      user_email: user_email,
      service: {
        id: parseInt(selectedService),
        service_name: selectedServiceName,
        description: selectedDescription,
        price: servicePrice,
      }  ,
      stylist: {
        id: parseInt(selectedStylist),
        stylist_name: selectedStylistName,

      }  ,
      date: selectedDate,
      time_slot: {
        id: parseInt(selectedTimeSlot),
        day: selectedDay,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
      }  ,
      
    };
    console.log(appointmentData)

    // Send a POST request to create the appointment
    axios.post(`${baseURL}/appointments/${userId}/`, appointmentData)
      .then(response => {
        // Handle successful appointment creation (show a success message, redirect, etc.)
        console.log('moving to booking overview', response.data);
        const appointmentId = response.data.id;
        console.log('****appointmentId****', appointmentId)
        navigate(`/salon-details/${salonId}/booking-overview/${userId}/${appointmentId}/`);
      })
      .catch(error => {
        // Handle error (show an error message, log the error, etc.)
        console.error('Error creating appointment', error);
        if (error.response && error.response.status === 400) {
          // Handle 400 Bad Request (time slot already booked)
          console.error('This time slot is already booked');
          toast.error('This time slot is already booked, please book another time slot', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    }


    const handleButtonClick = () => {
      // Redirect to the login page
      navigate('/login');
    };






  return (
    <div>
      
      <NewUserNavbar/>
      <Container>
        <h2 style={{ marginTop: '20px' }}>Salon Details</h2>
        <Row>
          <Col xs={12} md={6} lg={4}>
            {/* Existing Salon Details Card */}
            <Card style={{ maxHeight: '400px', overflow: 'hidden' }}>
              <Card.Img
                variant="top"
                src={`${salon_image}`}
                alt={salon_name}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{salon_name}</Card.Title>
                <Card.Text>
                  <p>Email: {email}</p>
                  <p>Mobile: {mobile}</p>
                  <p>Location: {location}</p>
                  {/* Add other details as needed */}
                </Card.Text>
              </Card.Body>
            </Card>            
          </Col>

          <Col xs={12} md={6} lg={8}>
            {/* Booking Section */}
            <h2 style={{ marginTop: '-30px', textAlign: 'center' }}>Available Services</h2>
            <Table striped bordered hover responsive style={{ width: '90%', margin: '20px auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Rate</th>
                  {/* You can add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.service_name}</td>
                    <td>{service.description}</td>
                    <td>{service.price} Rs</td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      
      
      


            <div style={{ marginTop: '50px' }}>
              <h3 style={{textAlign:'center'}}>Book an Appointment</h3>
              
              <Form onSubmit={(e) => handleAppointmentSubmit(e)} style={{width:'50%',  margin: '0 auto', marginBottom: '100px'}}>
                    <Form.Group controlId="serviceSelect">
                    <Form.Label>Service</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedService(e.target.value)} required>
                        <option value="" >Select a service</option>
                        {services.map(service => (
                        <option key={service.id} value={service.id}>{service.service_name}</option>
                        ))}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="stylistSelect">
                    <Form.Label>Stylist</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedStylist(e.target.value)} required>
                        <option value="" >Select a stylist</option>
                        {stylists.map(stylist => (
                        <option key={stylist.id} value={stylist.id}>{stylist.stylist_name}</option>
                        ))}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="dateSelect">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" onChange={(e) => setSelectedDate(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="timeSelect">
                      <Form.Label>Time</Form.Label>
                      <Form.Control as="select" onChange={(e) => setSelectedTimeSlot(e.target.value)} required>
                        <option value="">Select a time slot</option>
                        {/* Filter time slots based on the selected day */}
                        {timeSlots
                          .filter((timeSlot) => timeSlot.day === selectedDayOfWeek && !timeSlot.is_booked)
                          .map((timeSlot) => (
                            <option key={timeSlot.id} value={timeSlot.id}>
                              {timeSlot.start_time} - {timeSlot.end_time}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>

                    

                    
                    <div className="text-center">
                      {user.isAuthenticated? (
                        <Button variant="primary" type="submit" style={{ marginTop: '25px' }}>
                        Book Appointment
                      </Button>

                      ):(<Button variant="warning"  onClick={handleButtonClick}  style={{ marginTop: '25px' }}>
                      Book Appointment
                    </Button>)}
                      
                    </div>
                </Form>
                {isTimeSlotUnavailableMessageVisible && (
                      <div style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>
                        This time slot is already booked. Please choose another time.
                      </div>
                    )}
          </div>

            <Footer/>
    </div>
    
  );
  
}

export default SalonDetails;
