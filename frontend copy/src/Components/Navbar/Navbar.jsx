import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';

import menu from "../Assets/3_dots.png"



const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext)
  const [Menu, setMenu] = useState("Home")

  const menuRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visibile');
    e.target.classList.toggle('open');
  }


  // const dropdown_toggle = (e) => {

  //     menuRef.current.classList.toggle('nav-menu-visible')

  //     e.target.classList.toggle('open');

  // };


  return (
    <div className='navbar'>

      <div className="nav-logo">
        <Link to='/'> <img src={logo} alt="" /></Link>
      </div>


      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Home</Link>{Menu === "Home" ? <hr /> : <></>}</li>
        <a className="v_line" href="">|</a>
        <li onClick={() => { setMenu("Category") }}>
          {/* <Link style={{ textDecoration: 'none', color: 'black' }} to='/Category'> */}
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              Category
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Cars'>Cars</Link></h4>
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Bikes'>Bikes</Link></h4>
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Anime'>Anime</Link></h4>
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Nature'>Nature</Link></h4>
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Marvel'>Marvel</Link></h4>
                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}><Link style={{ textDecoration: 'none', color: 'black' }} to='./Sports'>Sports</Link></h4>
              </div>
            )}
          </div>

          {/* </Link> */}

          {Menu === "Category" ? <hr /> : <></>}</li>
        <a className="v_line" href="">|</a>
        <li onClick={() => { setMenu("About") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/About'>About</Link>{Menu === "About" ? <hr /> : <></>}</li>
        <a className="v_line" href="">|</a>
        <li onClick={() => { setMenu("Contact") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/Contact'>Contact</Link>{Menu === "Contact" ? <hr /> : <></>}</li>
      </ul>


      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/Login')}}>Logout</button>:
        <div> <Link to='/Login'><button >Login</button></Link></div>}

       

        <div><Link to='/Cart'><img className='cart' src={cart} alt="" /></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>

        <div> <img className='nav-dropdown' onClick={dropdown_toggle} src={menu} alt="" /></div>
      </div>
    </div>
  )
}

export default Navbar