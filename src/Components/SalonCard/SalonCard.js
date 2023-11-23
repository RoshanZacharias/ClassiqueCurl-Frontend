import React, {useState, useEffect} from 'react'
import './SalonCard.css'
import SalonData from './SalonData'
import axios from 'axios';

const SalonCard = () => {
  const [salons, setSalons] = useState([]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/admin-side/salon-list/')
    .then(response =>{
      console.log('Fetched salon data:', response.data);
      const verifiedSalons = response.data.filter(salon => salon.is_verified);
      setSalons(verifiedSalons)
    })
    .catch(error =>{
      console.log('Error fetching salon data', error);
    });
  }, []);
  console.log('Salons state:', salons);
  
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
          <SalonData
            key={salon.id}
            image={`http://127.0.0.1:8000/${salon.salon_image}`}  // Assuming your salon model has an 'image' field
            heading={salon.salon_name}
            text = {salon.location}  // Assuming your salon model has a 'salon_name' field
              // Assuming your salon model has a 'description' field
          />
        ))}
      </div>


      {/* <div className='saloncard'>
        <SalonData image={'https://media.istockphoto.com/id/1403130812/photo/loft-modern-salon-interior-3d-rendering.jpg?s=2048x2048&w=is&k=20&c=3Ri4ZTElFRrzrp3eC1YSBxU2nGjKJvlZzlpTIyCwLHs='}
        heading = 'Toni & Guy'
        text= 'Maecenas eu magna non mi mollis ornare sit amet sed nisi. Mauris vel mi interdum, aliquam quam at, cursus neque. Etiam convallis felis est, non pharetra quam vestibulum rhoncus. Aenean fringilla odio metus, facilisis maximus diam commodo id. Curabitur eu neque tristique sapien accumsan malesuada ac sed dolor.' />


        <SalonData image={'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D'}
        heading = 'Bariks'
        text= 'Maecenas eu magna non mi mollis ornare sit amet sed nisi. Mauris vel mi interdum, aliquam quam at, cursus neque. Etiam convallis felis est, non pharetra quam vestibulum rhoncus. Aenean fringilla odio metus, facilisis maximus diam commodo id. Curabitur eu neque tristique sapien accumsan malesuada ac sed dolor.' />


        <SalonData image={'https://media.istockphoto.com/id/1473840505/photo/empty-barberia-chairs-waiting-for-clients-for-shaving-and-haircut-barber-shop-indoors.jpg?s=2048x2048&w=is&k=20&c=Jl0L196WWrEGLMHObKKRBKP-CnPMNarfE36TJtT31lo='}
        heading = 'Loreal'
        text= 'Maecenas eu magna non mi mollis ornare sit amet sed nisi. Mauris vel mi interdum, aliquam quam at, cursus neque. Etiam convallis felis est, non pharetra quam vestibulum rhoncus. Aenean fringilla odio metus, facilisis maximus diam commodo id. Curabitur eu neque tristique sapien accumsan malesuada ac sed dolor.' />
      </div> */}
    </div>
  )
}

export default SalonCard
