import React, {useState, useEffect} from 'react'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import {useSelector} from 'react-redux'


const UserProfile = () => {
    const user = useSelector(state => state.user);
    const userId = user.user.id
    console.log(userId)

    const [showWallet, setShowWallet] = useState(false);
    const [reimbursedAmount, setReimbursedAmount] = useState(0);
    const [bookings, setBookings] = useState([]);


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

      const handleWalletClick = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/orders/reimbursed-sum/', {
                headers: {
                    Authorization: `Bearer ${yourAuthToken}`,  // Replace with your actual authentication token
                },
            });
            setReimbursedAmount(response.data.sum_reimbursed_amount);
            setShowWallet(true);
        } catch (error) {
            console.error('Error fetching reimbursed amount', error);
        }
    };
    
    

  return (
    <div>
      <h1>User Profile</h1>
      <Button variant='primary' onClick= {()=> handleWalletClick(bookings.id)}>
        Wallet
      </Button>

      {showWallet && (
        <Card style={{width: '18rem', marginTop: '20px'}}>
            <Card.Body>
                <Card.Title>Your Wallet</Card.Title>
                <Card.Text>
                    Reimbursed Amount: ₹ {reimbursedAmount.toFixed(2)}
                </Card.Text>
            </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default UserProfile
