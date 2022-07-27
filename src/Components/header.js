import React from 'react'
import {Link} from "react-router-dom";
import "../App.css";
import { motion } from 'framer-motion';
import logo from "../Util/Images/logo.jpg";
const Header = (props) => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className="information-tab flex fl-center">
        <div className="content-widthfix information-tab-content flex fl-space-between">
          <div className="single-info-title flex">
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
            <ul className="navigation-bar flex">
              <li><Link to="/"><i className="bi bi-house-door"></i> Home</Link></li>
              <div className="seperator"></div>
              <li><Link to="trucks">Trucks</Link></li>
              <li><Link to="trailers">Trailers</Link></li>
              <li><Link to="about">About Us</Link></li>
              <li><Link to="contact-us">Contact</Link></li>
            </ul>
            <Link to="sell-truck" className="btn-general primary-btn"><i className="bi bi-truck"></i> Post Your Truck</Link>
          </nav>
        </div>
      </header>
    </motion.div>
  )
}

export default Header