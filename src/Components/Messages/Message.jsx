import React, {useState, useEffect} from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './ChatComponent.css'
import {useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewUserNavbar from '../Navbar/NewUserNavbar';
import Footer from '../Footer/Footer';
import { baseURL } from '../../api/api';

const ChatComponent = () => {
  const navigate = useNavigate();
    const user = useSelector(state=> state.user)
    console.log('user:',user)
    const salonUser = useSelector(state => state.salon)
    console.log('salonUser:', salonUser)
    // const userId = user.user.id
    // console.log('userId:', userId)
    

    const [bookings, setBookings] = useState([]);
    console.log('bookings:', bookings)
    const [client, setClient] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [message, setMessage] = useState('');
    console.log('CLIENT:', client)

    let userId;
  // userId = user.user.id;

    try {
        userId = user.user.id;
        console.log(userId);
      
    } catch (error) {
      userId=0
      navigate('/login')

      console.log('login page')
    }



    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${baseURL}/bookings/${userId}/`);
                console.log("Fetched Upcoming Appointments:", response.data);
                const reversedBookings = response.data.reverse(); // Reverse the array
                setBookings(reversedBookings);
                console.log('***BOOKINGS***', reversedBookings);
            } catch (error) {
                navigate('/login')
                console.error('Error fetching bookings', error);
            }
        };
    
        fetchBookings();
    }, [userId]);


    useEffect(() => {
        // Retrieve chat messages from local storage
        const storedChatMessages = localStorage.getItem('chatMessages');
      
        if (storedChatMessages) {
          setChatMessages(JSON.parse(storedChatMessages));
        }
      }, []);


      useEffect(() => {
        // When selectedAppointment changes, establish or update WebSocket connection
        if (selectedAppointment) {
          connectToWebSocket(selectedAppointment.id);
        }
      }, [selectedAppointment]);

      

      

    

      const connectToWebSocket = (appointmentId) => {
        if (!appointmentId) return;
    
        const newClient = new W3CWebSocket(`wss://classiquecurl.shop/ws/chat/${appointmentId}/`);
        setClient(newClient);
        console.log('SET CLIENT:', newClient);
    
        newClient.onopen = () => {
          console.log('Websocket Client Connected');
        };
    
        newClient.onmessage = (message) => {
          const data = JSON.parse(message.data);
          console.log('Received message:', message.data);
          setChatMessages((prevMessages) => [...prevMessages, data]);
        };
    
        // Fetch existing messages when the WebSocket connection is established
        const fetchExistingMessages = async () => {
          try {
            const response = await fetch(`${baseURL}/chat/${appointmentId}/`);
            const data = await response.json();
            console.log('data:', data);
            const messagesTextArray = data.map((item) => ({
              message: item.message,
              sendername: item.sendername,
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
      };
    const isCurrentUser = selectedAppointment && selectedAppointment.user.id === userId;


    // const sendMessage = () => {
    //     if (message.trim() === '' || !client || !selectedAppointment || client.readyState !== client.OPEN) {
    //         console.log("WebSocket is not open");
    //         return;
    //     }
    
    //     const sendername = user.user.name;
    //     console.log('SENDER NAME:', sendername)
    //     const updatedChatMessages = [
    //         ...chatMessages,
    //         { sendername, message },
    //       ];

    //       localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));
    
    //     client.send(JSON.stringify({ message, sendername }));
    //     console.log({message})
    //     setMessage('');
    // };


    const sendMessage = () => {
      if (message.trim() === '' || !client || !selectedAppointment) {
        console.log('Invalid conditions for sending a message');
        return;
      }
  
      const sendername = user.user.name;
      const updatedChatMessages = [
        ...chatMessages,
        { sendername, message },
      ];
  
      localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));
  
      // Check if the WebSocket connection is open before sending a message
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message, sendername }));
        setMessage('');
      } else {
        console.log('WebSocket is not open');
      }
    };
  
    
    


  return (
    <div>
      <NewUserNavbar/>
      <main className="content" style={{ marginTop: "15px" , marginBottom: "500px"}}>
      <div className="container p-0"></div>
      <div className="card">
                <div className="row g-0">
                  
                    
      <div className="chat-container">
        <div className="appointments-list">
          <h2>Connect With Salons</h2>
          <ul>
          {bookings.map((booking) => (
            <li key={booking.id} onClick={() => handleAppointmentClick(booking)}>
                <div className="doctor-list-item d-flex align-items-start">
                  <img src= {`${baseURL}${booking.salon.salon_image}`} alt="Salon" className="rounded-circle mr-1"  />
                  
                  <div className="flex-grow-1 ml-3">
                    <div className="small">
                      <small style={{ fontSize: '16px', fontWeight: 'bold' }}>{booking.salon.salon_name}</small>
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
                  src={`${baseURL}${selectedAppointment.salon.salon_image}`}
                  alt={selectedAppointment.salon.salon_name}
                  className="rounded-circle mr-1"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <strong>{selectedAppointment.salon.salon_name}</strong>
                
                </div>
              </div>
              {/* <div className="chat-messages mt-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="message">
                        <strong>{msg.sendername}:</strong> {msg.message}
                  </div>
                ))}
              </div> */}

                <div className="chat-messages mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
                      {chatMessages.map((msg, index) => (
                        <div key={index} className="message-container">
                          {msg.sendername === user.user.name ? (
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

export default ChatComponent
