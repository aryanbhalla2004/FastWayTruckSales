import React, { useEffect } from 'react';
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import inline from "../Util/Images/inlinewhite.jpg";
export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>About Us | Fastway Truck Sales</title>
      </Helmet>
      <PageTitle name="About us"/>
      <div className="flex fl-center top-about-box">
        <div className="content-widthfix about-page-header-content flex fl-center fl-col">
          <h2>What we do</h2>
          <h1>What makes us different from other</h1>
          <div className='text-about flex fl-center'>
            <p>FASTWAY Truck Sales is the easier and faster way to get the Truck of your dreams. Our team consists of knowledgeable, Hardworking and professional ex-truck drivers, who consistently support their customers with purchase, financing options,  protection plans and other service needs. With our selection of trucks and trailers, you will never have to look elsewhere.</p>
            <p>We carry commercial truck models from respected manufacturers, including Freightliner, Peterbilt, Volvo, Hino, International and Western Star. You will appreciate the convenient access to a beautiful variety of quality used commercial trucks.</p>
          </div>
          {/* <a className="btn-general primary-btn"> Get in Touch <i className="bi bi-arrow-right"></i></a> */}
        </div>
      </div>
      <div className="flex fl-center">
        <div className="content-widthfix about-wrapper flex fl-center fl-space-between">
          <div className="images-selection">
            <img className="floating-img-again" src="./images/location.jpeg" width="250"></img>
            <img className="about-images" src={inline} width="300"></img>
            <img className="floating-img" src='./images/lined-up.jpeg' width="300"></img>
          </div>
          <div className="about-us-content">
            <h4>About Us</h4>
            <h2>Welcome to Fastway Truck Sales</h2>
            <p>It's simpler and quicker to purchase the truck of your dreams via FASTWAY Truck Sales. Our staff is made up of experienced, diligent, and skilled ex-truck drivers that regularly assist their clients with purchasing decisions, financing alternatives, protection plans, and other service requirements. </p>
            <p>You won't ever need to go elsewhere with our collection of trucks and trailers.</p>
            <div className='ghost-boxes flex'>
              <div className='ghost-box flex fl-center'>
                <h1>10+</h1>
                <h4>Experience Members</h4>
              </div>
              <div className='ghost-box flex fl-center'>
                <h1>5K+</h1>
                <h4>Satisfied Clients</h4>
              </div>
            </div>
            {/* <a className="btn-general primary-btn"> Read More <i className="bi bi-arrow-right"></i></a> */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
