import React, { useEffect, useState } from 'react';
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';

export const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const [fieldError, setFieldError] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const updateUserInput = (e) => {
    setFieldError(prevInput => ({
      ...prevInput, [e.target.name]: false
    }));

    setContactInfo(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Contact Us | Fastway Truck Sales</title>
      </Helmet>
      <PageTitle name="Contact us"/>
      <div className="contact-col">
        <div className="content-widthfix contact-col-info">
          <div className="left-col">
            <span>LET'S TALK</span>
            <h2>Speak With Expert Engineers.</h2>
            <div className="contact-info-form-col">
              <div className="contact-icon">
                <i className="bi bi-house-door-fill"></i>
              </div>
              <div>
                <h3>Email:</h3>
                <p>mb@fastwaytruck.com</p>
              </div>
            </div>
            <div className="contact-info-form-col">
              <div className="contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <h3>Address:</h3>
                <p> 195 Oak Point Hwy, Winnipeg MB, Canada</p>
              </div>
            </div>
            <div className="contact-info-form-col">
              <div className="contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h3>Phone:</h3>
                <p>+1 (204)-615-1000</p>
              </div>
            </div>
          </div>
          <form className="form-contact">
            <span>GET IN TOUCH</span>
            <h2>Fill The Form Below</h2>
            <div className="col-2-filed">
              <input placeholder="Name" name="name" value={contactInfo.name} onChange={updateUserInput}/>
              <input placeholder="Email" name="email" value={contactInfo.email} onChange={updateUserInput}/>
            </div>
            <div className="col-2-filed">
              <input placeholder="Phone Number" name="phone" value={contactInfo.phone} onChange={updateUserInput}/>
              <input placeholder="Subject" name="subject" value={contactInfo.subject} onChange={updateUserInput}/>
            </div>
            <textarea placeholder="Your Message Here" name="message" value={contactInfo.message} onChange={updateUserInput}></textarea>
            <button className='btn-general primary-btn' type='submit'>Send Inquiry</button>
          </form>
        </div>
      </div>
      <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=600&amp;hl=en&amp;q=195 Oak Point Hwy, Winnipeg MB, Canada&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
    </motion.div>
  )
}
