import React, {useState} from 'react'
import {Link} from "react-router-dom";
import "../App.css";
import { motion } from 'framer-motion';
import logo from "../Util/Images/logo.jpg";
import "./responsive.css";

const Header = (props) => {

  const [showNav, setShowNav] = useState(false);
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className="information-tab flex fl-center">
        <div className="content-widthfix information-tab-content flex fl-space-between">
          <div className="single-info-title flex timing-info-bar">
            <i className="bi bi-clock"></i>
            <h4>Monday-Friday 9:00AM - 5:00PM</h4>
          </div>
          <div className="single-info-title flex">
            <i className="bi bi-geo-alt"></i>
            <h4>2095 Logan Ave, Winnipeg MB, Canada</h4>
          </div>
          <div className="single-info-title flex white-bg">
            <i className="bi bi-telephone"></i>
            <h4>+1 (204)-615-1000</h4>
          </div>
        </div>
      </div>
      <header className="flex fl-center">
        <div className="content-widthfix flex fl-space-between">
          <nav className="flex fl-center fl-space-between">
            <div className="logo">
              <img src={logo} width="170"/>
            </div>

            <div className='responive-button'>
              <Link to=""  onClick={() => setShowNav(true)} className="btn-general primary-btn"><i className="bi bi-list"></i></Link>
            </div>
            <ul className="navigation-bar flex">
              <li><Link to="/"><i className="bi bi-house-door"></i> Home</Link></li>
              <div className="seperator"></div>
              <li><Link to="trucks">Trucks</Link></li>
              <li><Link to="trailers">Trailers</Link></li>
              <li><Link to="about">About Us</Link></li>
              <li><Link to="contact-us">Contact</Link></li>
            </ul>
            
            <Link to="sell-truck" className="btn-general primary-btn post-truck-btn"><i className="bi bi-truck"></i> Post Your Truck</Link>
          </nav>
        </div>

        {showNav && <div className='responsive-nav-bar'>
          <button className='close-button-menu-responsive' onClick={() => setShowNav(false)}><i className="bi bi-x-lg"></i></button>
          <ul>
            <li><Link to="/" onClick={() => setShowNav(false)}><i className="bi bi-house-door"></i> Home</Link></li>
            <li><Link to="trucks" onClick={() => setShowNav(false)}>Trucks</Link></li>
            <li><Link to="trailers" onClick={() => setShowNav(false)}>Trailers</Link></li>
            <li><Link to="about" onClick={() => setShowNav(false)}>About Us</Link></li>
            <li><Link to="contact-us" onClick={() => setShowNav(false)}>Contact</Link></li>
          </ul>
        </div>}
      </header>
    </motion.div>
  )
}

export default Header