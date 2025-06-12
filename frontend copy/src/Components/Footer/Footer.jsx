import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import whatsapp from '../Assets/whatsapp.png'
import teligram from '../Assets/teligram.png'
import instagram from '../Assets/instagram.png'


const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>GALAXY OF POSTERS</p>
            
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icons'>
            <div className="footer-icons-container">
                <img src={instagram} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={teligram} alt="" />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr />
            <p>Copyright @2024 - All Right Reserved.</p>

        </div>
     
    </div>
  )
}

export default Footer