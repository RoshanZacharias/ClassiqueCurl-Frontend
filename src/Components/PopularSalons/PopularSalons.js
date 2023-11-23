import React from 'react'
import './PopularSalons.css'
import PopularData from './PopularData'

const PopularSalons = () => {
  return (
    <div className='popular'>
      <h1>Popular Salons</h1>
      <p>Explore the popular salons in the town.</p>
      <PopularData 
      className="first-des"
      heading="Toni & Guy"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptatibus ut ex eum. Est aliquid animi repellat, earum labore beatae reiciendis pariatur reprehenderit accusantium sint. Porro in magni enim ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptatibus ut ex eum. Est aliquid animi repellat, earum labore beatae reiciendis pariatur reprehenderit accusantium sint. Porro in magni enim ratione!"

      img1 = {'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8'}
      
      img2 = {'https://images.unsplash.com/photo-1599387737838-660b75526801?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8'}/>


      <PopularData 
      className="first-des-reverse"
      heading="L'oreal"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptatibus ut ex eum. Est aliquid animi repellat, earum labore beatae reiciendis pariatur reprehenderit accusantium sint. Porro in magni enim ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptatibus ut ex eum. Est aliquid animi repellat, earum labore beatae reiciendis pariatur reprehenderit accusantium sint. Porro in magni enim ratione!"

      img1 = {'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D'}
      
      img2 = {'https://plus.unsplash.com/premium_photo-1664048712492-9d395c204e37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D'}/>

    </div>
  )
}

export default PopularSalons
