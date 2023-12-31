// BookingOverview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Card, Container, Row, Col } from 'react-bootstrap';

import Footer from '../Footer/Footer';

import NewUserNavbar from '../Navbar/NewUserNavbar';


const BookingOverview = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  console.log('appointmentId:', appointmentId)
  const [appointmentData, setAppointmentData] = useState(null);
  console.log("***APPOINTMENT DATA***", appointmentData)
  const [serviceName, setServiceName] = useState("");
  const [stylistName, setStylistName] = useState("");
  const [amount, setAmount] = useState("");
  

  

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


  


  // const handlePaymentSuccess = async (response) => {
  //   console.log('handlePaymentSuccess', response);
  //   try {
  //     let bodyData = new FormData();
  //     bodyData.append("payment", JSON.stringify(response.data.payment));

  //     // we will send the response we've got from razorpay to the backend to validate the payment
  //     bodyData.append("response", JSON.stringify(response));

  //     await axios({
  //       url: 'http://127.0.0.1:8000/payment/success/',
  //       method: "POST",
  //       data: bodyData,
  //       headers: {
  //         Accept: "multipart/form-data",
  //         "Content-Type": 'multipart/form-data',
  //       },
  //     })
  //       .then((res) => {
  //         console.log("Everything is OK!");
  //         setServiceName("");
  //         setStylistName("");
  //         setAmount("");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.log(console.error());
  //   }
  // };




  // const loadScript = async () => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   document.body.appendChild(script);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
    
  // };

  // const showRazorpay = async () => {
  //   const res = await loadScript();
  
  //   const bodyData = new FormData();
  //   bodyData.append("service_name", appointmentData.service.service_name);
  //   bodyData.append("stylist_name", appointmentData.stylist.stylist_name);
  //   bodyData.append("amount", appointmentData.price.toString());

  //   console.log('***BODY DATA***',bodyData)
  
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/pay/', bodyData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

      
  
  //     console.log('***RESPONSE***',response.data);
      
  
  //     // Use response data as needed
  //     var options = {
  //       key_id: process.env.REACT_APP_PUBLIC_KEY,
  //       key_secret: process.env.REACT_APP_SECRET_KEY,
  //       amount: response.data.payment.amount, // Use response data here
  //       currency: "INR",
  //       name: "Org. Name",
  //       description: "Test transaction",
  //       image: "", // add image URL
  //       order_id: response.data.payment.id,
  //       handler: function (response) {
  //         console.log('Response from Razorpay:', response);
  //         // Handle success by calling handlePaymentSuccess method
  //         handlePaymentSuccess(response);
  //         console.log('handlePaymentSuccess')
  //       },
  //       prefill: {
  //         name: "User's name",
  //         email: "User's email",
  //         contact: "User's phone",
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     console.log('***OPTIONS***',options)
  //     console.log('Public Key:', process.env.REACT_APP_PUBLIC_KEY);
  //     console.log('Secret Key:', process.env.REACT_APP_SECRET_KEY);

  
  //     var rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     // Handle errors
  //     console.error(error);
  //   }
  // };
  


  const showRazorpay = async () => {
    try {
      const bodyData = new FormData();
      bodyData.append("service_name", appointmentData.service.service_name);
      console.log('service_name:', appointmentData.service.service_name);

      bodyData.append("stylist_name", appointmentData.stylist.stylist_name);
      console.log('stylist_name:', appointmentData.stylist.stylist_name);

      bodyData.append("amount", appointmentData.price.toString());
      console.log('amount:', appointmentData.price.toString());

      bodyData.append("user", appointmentData.user);
      console.log('user:', appointmentData.user);

      bodyData.append("user_name", appointmentData.user_name);
      console.log('user_name:', appointmentData.user_name)

      bodyData.append("user_email", appointmentData.user_email);
      console.log('user_email:', appointmentData.user_email);

      bodyData.append("salon", appointmentData.salon);
      console.log('salon:',appointmentData.salon)

      bodyData.append("salon_name", appointmentData.salon_name);
      console.log('salon_name:', appointmentData.salon_name)

      bodyData.append("time_slot_date", appointmentData.date);
      console.log('time_slot_date:', appointmentData.date)

      bodyData.append("time_slot_day", appointmentData.time_slot.day);
      bodyData.append("time_slot_start_time", appointmentData.time_slot.start_time);
      bodyData.append("time_slot_end_time", appointmentData.time_slot.end_time);

      console.log("url",`http://127.0.0.1:8000/pay/${appointmentId}`)
      const response = await axios.post(
        `http://127.0.0.1:8000/pay/${appointmentId}/`,
        
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('***RESPONSE***',response.data);


      const options = {
        key: process.env.REACT_APP_PUBLIC_KEY, // Replace with your Razorpay API key
        key_secret: process.env.REACT_APP_SECRET_KEY,
        amount: response.data.payment.amount,
        currency: "INR",
        name: "Professional Booking",
        description: "This is the payment for ClassiqueCurl",
        image: "", // Add image URL
        handler: function (response) {
          handlePaymentSuccess(response);

        },
        prefill: {
          name: "User's name",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        order_id: response.data.payment.id,
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };


  const handlePaymentSuccess = async (response) => {
    const order_id = response.razorpay_payment_id // Use razorpay_payment_id as the order ID
    console.log(order_id);
  
    try {
      const bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("razorpay_order_id", response.razorpay_order_id);
      bodyData.append("razorpay_payment_id", response.razorpay_payment_id);
      bodyData.append("razorpay_signature", response.razorpay_signature);
  
      // Check if 'response.data' is defined before accessing 'response.data.payment'
      if (response.data && response.data.payment) {
        bodyData.append("payment", JSON.stringify(response.data.payment));
      }
  
      await axios.post('http://127.0.0.1:8000/payment/success/', bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setServiceName("");
      setStylistName("");
      setAmount("");
      navigate("/success", {
        state: {
          id: appointmentId,
          order_service: serviceName,
          order_stylist: stylistName,
          order_amount: amount,
          order_payment_id: order_id, 
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  



  

  return (
    <div>
      <NewUserNavbar/>
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
    <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with razorpay
      </button>
    </Row>  

    

  </Container>
  <Footer/>
    </div>
    

  );

  
};

export default BookingOverview;
