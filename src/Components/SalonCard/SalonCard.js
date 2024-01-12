import React, {useState, useEffect} from 'react'
import './SalonCard.css'
import SalonData from './SalonData'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from '../../api/api';

const SalonCard = () => {
  const [salons, setSalons] = useState([]);

  useEffect(()=>{
    axios.get(`${baseURL}/admin-side/salon-list/`)
    .then(response =>{
      console.log('Fetched salon data:', response.data);
      const verifiedSalons = response.data.filter(salon => salon.is_verified);
      setSalons(verifiedSalons)
    })
    .catch(error =>{
      console.log('Error fetching salon data', error);
    });
  }, []);
  
  
  return (
        <div className='salon'>
        <div className="row justify-content-center">
        <div className="col-md-6 text-center">
            <h1>Hair Salons</h1>
            <p>You can discover unique hair salons in the town.</p>
        </div>
        </div>
        <div className='saloncard'>
        {salons.map(salon => (
          <Link
            to={`/salon-details/${salon.id}`}
            key={salon.id}
            className='s-card'
          >
            <div className='s-image'>
              <img
                src={`${salon.salon_image}`}
                alt={salon.salon_name}
              />
            </div>
            <h4>{salon.salon_name}</h4>
            <p>{salon.location}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SalonCard
