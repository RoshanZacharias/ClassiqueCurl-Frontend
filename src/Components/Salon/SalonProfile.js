import React from 'react'
import {useSelector} from 'react-redux'

const SalonProfile = () => {
    const salonUser = useSelector(state => state.salon)
  return (
    <div>
      <h1>Welcome {salonUser.salonUser.name} </h1>
    </div>
  )
}

export default SalonProfile
