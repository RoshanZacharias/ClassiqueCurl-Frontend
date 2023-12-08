import React, {useState,useEffect} from 'react';
import Hero from '../Hero/Hero';
import { MDBBtn } from 'mdb-react-ui-kit';
import './SalonHome.css';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux' 
import {Table} from 'react-bootstrap'
import axios from 'axios';
import ImageModal from '../ImageModal';
import TimeSlotTable from './TimeSlot';
import Footer from '../Footer/Footer';


const SalonHome = () => {
  const salonUser = useSelector(state => state.salon)
  console.log('**********salonUser***********', salonUser)
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);





  useEffect(() => {
    const salonId = salonUser.salonUser.id;
  
    axios.get(`http://localhost:8000/salon-side/salon-services/?salon_id=${salonId}`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching salon services:', error);
      });
  }, [salonUser.salonUser.id]);




  useEffect(() => {
    const salonId = salonUser.salonUser.id;
  
    axios.get(`http://localhost:8000/salon-side/salon-stylists/?salon_id=${salonId}`)
      .then(response => {
        setStylists(response.data);
      })
      .catch(error => {
        console.error('Error fetching salon stylists:', error);
      });
  }, [salonUser.salonUser.id]);



  useEffect(() => {
    const salonId = salonUser.salonUser.id;
  
    axios.get(`http://localhost:8000/salon-side/salon-time-slot/?salon_id=${salonId}`)
      .then(response => {
        setTimeSlots(response.data);
      })
      .catch(error => {
        console.error('Error fetching time slots:', error);
      });
  }, [salonUser.salonUser.id]);
   
  




  return (
    <>
      <Hero
        cName='hero'
        heroImg="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="CLASSIQUE CURL"
        text='Where Every Curl Tells a Story of Grace.'
        buttonText="View Bookings"
        url='/salon-home'
        btnClass='show'
      />
      <div className='service'>
        <h1>Services</h1>
        <p>You can add the services</p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.service_name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
       
        <Link to='/salon-home/add-service'>
          <MDBBtn>Add Service</MDBBtn>
        </Link>
       
      </div>

      <div className='stylists'>
        <h1>Stylists</h1>
        <p>You can add stylists</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Stylist Name</th>
              <th>Stylist Image</th>
              
            </tr>
          </thead>
          <tbody>
            {stylists.map(stylist => (
              <tr key={stylist.id}>
                <td>{stylist.id}</td>
                <td>{stylist.stylist_name}</td>
                <td>
                  <ImageModal src={`http://127.0.0.1:8000/${stylist.stylist_image}`} alt='stylist_image' />
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      <Link to='/salon-home/add-stylist'>
          <MDBBtn>Add Stylist</MDBBtn>
        </Link>
      </div>


      <div className='time-slot'>
              <h1>Time Slot</h1>
              <p>You can manage the time slots</p>
              <TimeSlotTable timeSlots={timeSlots} />
                

              
              <Link to='/salon-home/add-timeslot'>
          <MDBBtn>Add Time Slot</MDBBtn>
        </Link>
      </div>

      
      <Footer/>

      
    </>
  );
};

export default SalonHome;
