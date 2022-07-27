import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = (props) => {
  useEffect(() => {
    props.setPage("home");
    window.scrollTo(0, 0)
  }, []);
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Welcome to Fastway Trucking | Home</title>
      </Helmet>
      <section className="slider-information flex fl-center">
        <div className="slider-information-wrapper flex fl-center">
          <div className="content-widthfix slider-information-content flex fl-center fl-col">
            <h3>The Largest Source for</h3>
            <h1>Heavy Duty <span className="primary-color">Truck</span> & <span className="primary-color">Trailer</span> Inventory</h1>
            <p>With wide range of variety in Pre-owned Trucks and other Heavy Equipment, An emerging name in city of Winnipeg – FASTWAY Truck and Trailor Sales.</p>
            <div className="flex fl-center fl-space-between">
              <Link to="/about" className="btn-general primary-btn mg-left">Learn More <i className="bi bi-info-circle"></i></Link>
              <Link to="/trucks" className="btn-general ghost-btn mg-left">Search Inventory <i className="bi bi-box-seam"></i></Link>
            </div>
          </div>
        </div>
      </section>
      <div className="logo-companies flex fl-center">
        <div className="content-widthfix logos-home-wrapper flex fl-center fl-col">
          <h2>Popular Brands</h2>
          <h1>Companies We Work With</h1>
          <ul className='list-of-logos flex fl-center fl-space-between'>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/peterbilt.png" alt="" srcset="https://hipointtrucksales.com/img/brands/peterbilt.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/volvo.png" alt="" srcset="https://hipointtrucksales.com/img/brands/volvo.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/kenworth.png" alt="" srcset="https://hipointtrucksales.com/img/brands/kenworth.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/western-star.png" alt="" srcset="https://hipointtrucksales.com/img/brands/western-star.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/kenworth.png" alt="" srcset="https://hipointtrucksales.com/img/brands/hino.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/kenworth.png" alt="" srcset="https://hipointtrucksales.com/img/brands/international.png" />
            </li>
            <li>
              <img src="https://hipointtrucksales.com/img/brands/kenworth.png" alt="" srcset="https://hipointtrucksales.com/img/brands/freightliner.png" />
            </li>
            
          </ul>
        </div>
      </div>
      <div className="flex fl-center">
        <div className="content-widthfix about-wrapper flex fl-center fl-space-between">
          <div className="images-selection">
            <img className="floating-img-again" src="./images/location.jpeg" width="250"></img>
            <img className="about-images" src='https://images.unsplash.com/photo-1531683760080-7bb28a630bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80' width="200"></img>
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
            <Link to="/about" className="btn-general primary-btn"> Read More <i className="bi bi-arrow-right"></i></Link>
          </div>
        </div>
      </div>
      <div className="flex fl-center services-container">
        <div className="content-widthfix about-wrapper flex fl-center fl-space-between">
          <div className="about-us-content">
            <h4>Why Choose Us</h4>
            <h2>Our best advantages</h2>
            <p>Our team consists of knowledgeable, Hardworking and professional ex-truck drivers, who consistently support their customers with purchase, financing options,  protection plans and other service needs.</p>
            <ul className='list-of-services flex fl-space-between fl-center'>
              <li><i className="bi bi-check2-all"></i> knowledgeable</li>
              <li><i className="bi bi-check2-all"></i> Hardworking</li>
              <li><i className="bi bi-check2-all"></i>  Professional ex-truck drivers</li>
              <li><i className="bi bi-check2-all"></i>  Automated testing lanes</li>
              <li><i className="bi bi-check2-all"></i> Quick Service Times</li>
              <li><i className="bi bi-check2-all"></i> Free Trade Appraisal</li>
              <li><i className="bi bi-check2-all"></i> Genuine spare parts</li>
              <li><i className="bi bi-check2-all"></i> Unbeatable savings!</li>
            </ul>
            <Link to="/about" className="btn-general primary-btn"> Read More <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="images-selection">
            <img className="about-images" src='./images/truck.jpeg' width="230"></img>
            <img className="floating-img" src='./images/stackedTrailers.jpeg' width="250"></img>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;