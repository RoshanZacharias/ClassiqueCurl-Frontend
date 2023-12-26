import React from 'react'
import UserHome from '../Components/UserHome'
import UserNavbar from '../Components/Navbar/UserNavbar'
import NewUserNavbar from '../Components/Navbar/NewUserNavbar'


function UserHomePage() {
  return (
    <div>
      
      <NewUserNavbar/>
      <UserHome/>
    </div>
  )
}

export default UserHomePage
