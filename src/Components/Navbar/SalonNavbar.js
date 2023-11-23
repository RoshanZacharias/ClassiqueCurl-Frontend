import React from 'react'
import './SalonNavbar.css'
import { Link } from 'react-router-dom';
import { SalonMenuItems } from './SalonMenuItems'

const SalonNavbar = () => {
  return (
    <div>
      <nav className='NavbarItems'>
        <h1 className='navbar-logo'>ClassiqueCurl</h1>
        <ul className='nav-menu'>
            {SalonMenuItems.map((item, index)=>{
                return(
                    <li key={index}>
                        <Link className={item.cName} to={item.url} onClick={item.onClick}><i class={item.icon}></i>{item.title}</Link>
                    </li>
                )
            })}
            
        </ul>
      </nav>
    </div>
  )
}

export default SalonNavbar
