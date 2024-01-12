import React, {useState, useEffect} from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './ChatComponent.css'; 
import {useSelector} from 'react-redux'
import axios from 'axios';
import NewSalonNavbar from '../Navbar/NewSalonNavbar';
import Footer from '../Footer/Footer';
import { baseURL } from '../../api/api';

const SalonChatComponent = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [bookings, setBookings] = useState([]);
    console.log("BOOKINGS:", bookings);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [client, setClient] = useState(null);
    console.log('CLIENT:', client);
    const salonUser = useSelector(state => state.salon)
    console.log('salonUser:', salonUser)
    const salonId = salonUser.salonUser.id
    console.log('salonID:', salonId)


    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await axios.get(`${baseURL}/salon-side/booked-appointments/${salonId}/`);
            setBookings(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching bookings', error);
          }
        };
    
        fetchBookings();
      }, [salonId]); 


      const connectToWebSocket = (appointmentId) => {
        if (!appointmentId) return;
    
        const newClient = new W3CWebSocket(`wss://classiquecurl.shop/ws/chat/${appointmentId}/`);
        setClient(newClient);
       
    
        newClient.onopen = () => {
          console.log('WebSocket Client Connected');
        };
    
        newClient.onmessage = (message) => {
          const data = JSON.parse(message.data);
          setChatMessages((prevMessages) => [...prevMessages, data]);
        };
        const fetchExistingMessages = async () => {
          try {
              const response = await fetch(`${baseURL}/chat/${appointmentId}/`);
              const data = await response.json();
              console.log("dataaaaaaaaa",data)
              const messagesTextArray = data.map(item => ({
                message : item.message,
                sendername : item.sendername,
              }));
              setChatMessages(messagesTextArray);
          } catch (error) {
              console.error('Error fetching existing messages:', error);
          }
          console.log('Chat messages:', chatMessages);
    
      };
      fetchExistingMessages();
    
        return () => {
          newClient.close();
        };
      };
    
      const handleAppointmentClick = (booking) => {
        setSelectedAppointment(booking);
        setChatMessages([]);
        connectToWebSocket(booking.id);
      };
    
      const sendMessage = () => {
        if (message.trim() === '' || !client || !selectedAppointment || client.readyState !== client.OPEN) {
            console.log("WebSocket is not open");
            return;
        }
    
        const sendername = salonUser.salonUser.name;
        console.log('SENDER NAME:', sendername)
    
        client.send(JSON.stringify({ message, sendername }));
        console.log({message})
        setMessage('');
    };

  return (
    <div>
      <NewSalonNavbar/>
      <main className="content" style={{ marginTop: "25px" , marginBottom: "0"}}>
      <div className="container p-0"></div>
      <div className="card">
                <div className="row g-0">
                  {/* <div className="col-12 col-lg-5 col-xl-3 border-right">
                      <div className="px-4 ">
                          <div className="d-flfex align-itemfs-center">
                            <div className="flex-grow-1 d-flex align-items-center mt-2">
                              <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Search..."
                                onChange=''
                                name='username'
        
                              />
                              <button className='ml-2' onClick=''style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                            </div>
                          </div>
                      </div>
                    </div> */}
                    
      <div className="chat-container">
        <div className="appointments-list">
          <h2>Upcoming Appointments</h2>
          <ul>
          {bookings.map((booking) => (
            <li key={booking.id} onClick={() => handleAppointmentClick(booking)}>
                <div className="doctor-list-item d-flex align-items-start">
                  <img src={`${booking.user.profile_picture}`} alt="User" className="rounded-circle mr-1"  />
                  <div className="flex-grow-1 ml-3">
                    <div className="small">
                      <small style={{ fontSize: '16px', fontWeight: 'bold' }}>{booking.user.first_name}</small>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          {selectedAppointment && (
            <div>
              <div className="selected-doctor-info d-flex align-items-center">
                <img
                  src={`${selectedAppointment.user.profile_picture}`}
                  alt={selectedAppointment.user.first_name}
                  className="rounded-circle mr-1"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <strong>{selectedAppointment.user.first_name}</strong>
                
                </div>
              </div>
              <div className="chat-messages mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
                {chatMessages.map((msg, index) => (
                  <div key={index} className="message-container">
                  {msg.sendername === salonUser.salonUser.name ? (
                    <div className="sent-message"><strong>{msg.sendername}:</strong>{msg.message}</div>
                  ) : (
                    <div className="received-message">
                      <strong>{msg.sendername}:</strong> {msg.message}
                    </div>
                  )}
                </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </main>
    <Footer/>
    </div>
  )
}

export default SalonChatComponent
