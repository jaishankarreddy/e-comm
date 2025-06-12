import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/navlogo.png'
import navprofile from '../../assets/profile.png'

const Navbar = () => {
  return (

      <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo' />
        <img src={navprofile} alt="" className='nav-profile' />
      </div>

  )
}

export default Navbar;