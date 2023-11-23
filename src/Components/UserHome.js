import React from 'react'
import Hero from './Hero/Hero'
import PopularSalons from './PopularSalons/PopularSalons'
import SalonCard from './SalonCard/SalonCard'
import Footer from './Footer/Footer'

function UserHome() {
  return (
   <>
   <Hero
   cName='hero'
   heroImg = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   title = "CLASSIQUE CURLS"
   text = 'Where Every Curl Tells a Story of Grace.'
   buttonText = "Book an Appointment"
   url = '/'
   btnClass = "show" />


   <PopularSalons/>
   <SalonCard/>
   <Footer/>


   </>
  )
}

export default UserHome

