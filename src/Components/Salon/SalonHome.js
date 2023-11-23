import React from 'react'
import Hero from '../Hero/Hero'

const SalonHome = () => {
  return (
    <>
    <Hero
      cName='hero'
      heroImg = "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title = "CLASSIQUE CURL"
      text = 'Where Every Curl Tells a Story of Grace.'
      buttonText = "View Bookings"
      url = '/salon-home'
      btnClass = "show"/>
    
    </>
  )
}

export default SalonHome
