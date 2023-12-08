import React, { useState } from 'react';
import {
  MDBBtn,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TimePicker from 'react-time-picker';
import UserNavbar from './Navbar/UserNavbar';
import SalonNavbar from './Navbar/SalonNavbar';
import Footer from './Footer/Footer';



export default function AddTimeSlot() {
  const navigate = useNavigate();
  const salonUser = useSelector(state => state.salon);
  const [timeSlot, setTimeSlot] = useState({
    day: '',
    start_time: '',
    end_time: '',
  });
  

  const handleChange = (e) => {
    setTimeSlot({
      ...timeSlot,
      [e.target.name]: e.target.value,
    });
  };

  


  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(`2023-01-01T${timeString}`);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/salon-side/add-timeslot/',
      {
        day: timeSlot.day,
        start_time: timeSlot.start_time,
        end_time: timeSlot.end_time,
        salon_id: salonUser.salonUser.id
      },   {
        headers: {
          'Content-Type': 'application/json',
        },
        
        
      });

      if (response.status === 201) {
        console.log('Time slot added successfully!');
        toast.success('Time slot added successfully');
        navigate('/salon-home');
        // Optionally, you can reset the form or perform other actions after successful submission
      } else {
        console.error('Failed to add time slot:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
      <div>
        <SalonNavbar/>  
      
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", color: "black", marginBottom:'200px' }}>
  <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
    <div className='mb-4'>
      <h1 className="text-center">Add Time Slot</h1>
      <label htmlFor='day' className='form-label'>
        Day:
      </label>
      <select
        className='form-select'
        id='day'
        name='day'
        value={timeSlot.day}
        onChange={handleChange}
      >
        <option value=''>Select a day</option>
        <option value='Monday'>Monday</option>
        <option value='Tuesday'>Tuesday</option>
        <option value='Wednesday'>Wednesday</option>
        <option value='Thursday'>Thursday</option>
        <option value='Friday'>Friday</option>
        <option value='Saturday'>Saturday</option>
        <option value='Sunday'>Sunday</option>
      </select>
    </div>

    <div className='mb-4'>
      <label htmlFor='start_time' className='form-label'>
        Start Time:
      </label>
      <input
        type='time'
        className='form-control'
        id='start_time'
        name='start_time'
        value={timeSlot.start_time}
        onChange={handleChange}
      />
    </div>

    <div className='mb-4'>
      <label htmlFor='end_time' className='form-label'>
        End Time:
      </label>
      <input
        type='time'
        className='form-control'
        id='end_time'
        name='end_time'
        value={timeSlot.end_time}
        onChange={handleChange}
      />
    </div>

    <MDBBtn type='submit' block>
      Add Time Slot
    </MDBBtn>
  </form>
</div>
<Footer/>
</div>

  );
}
