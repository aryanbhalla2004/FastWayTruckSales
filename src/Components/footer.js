import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";
const Footer = () => {
  return (
    <>
      <footer className="flex fl-center">
        <div className="content-widthfix footer-content flex fl-space-between">
          <div className="about-footer flex fl-col">
            <h2>ABOUT US</h2>
            <p>It's simpler and quicker to purchase the truck of your dreams via FASTWAY Truck Sales. Our staff is made up of experienced, diligent, and skilled ex-truck drivers that regularly assist their clients with purchasing decisions, financing alternatives, protection plans, and other service requirements.</p>
          </div>
          <div className="about-footer flex fl-col">
            <h2>Quicks Links</h2>
            <ul className="services-list-footer fles">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/trucks">Trucks</Link></li>
              <li><Link to="/trailers">Trailers</Link></li>  
              <li><Link  to="/contact-us">Contact</Link></li>  
            </ul>
          </div>
          <div className="about-footer flex fl-col">
            <h2 className="primary-color">Office: Winnipeg</h2>
            <ul className="services-list-footer contact-fix">
              <li><i className="bi bi-envelope-fill"></i> mb@fastwaytrucks.com</li>
              <li><i className="bi bi-telephone-fill"></i> +1 (204)-615-1000</li>
              <li><i className="bi bi-geo-alt-fill"></i> 2095 Logan Ave, Winnipeg MB, Canada</li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyright flex fl-center">
        <div className="content-widthfix copy-content flex fl-space-between">
          <p>&copy; Copyright 2020. All Rights Reserved.</p>
          <ul className="social-logo-footer flex fl-space-between">
            <li><a href="#"><i className="bi bi-twitter"></i></a></li>
            <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
            <li><a href="#"><i className="bi bi-facebook"></i></a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer;