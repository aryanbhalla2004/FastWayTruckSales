import React, { useState, useEffect } from 'react';
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {firebase} from "../Util/Firebase";

const TrailerDetail = (props) => {
  const {id} = useParams();
  const [currentImage, setCurrentImage] = useState();
  const [currentPage, setCurrentPage] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [fieldError, setFieldError] = useState({
    email: false,
    name: false,
    message: false,
  });

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setCurrentImage(product && product.images.one);
  }, [product])
  
  const fetchData = async() => {
    firebase.firestore().collection('Trailers').doc(id).get()
    .then((docRef) =>  {
      setProduct(docRef.data());
    });
  }

  const [inquire, setInquire] = useState({
    name: '',
    email: '',
    productId: id && id,
    subject: '',
    message: '',
    status: 'new'
  });

  const updateUserInput = (e) => {
    setFieldError(prevInput => ({
      ...prevInput, [e.target.name]: false
    }));

    setInquire(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if(inquire.name != "" && inquire.email != "" && inquire.message != "") {
      console.log("sdsd");
      try {

        //! do the email
        //await emailjs.send("service_7bhb3hf", "template_zolsttk", inquire, 'O4nqrVM4jnHS9WBVF');
        await props.add("Inquires", inquire);
        setInquire({
          name: '',
          email: '',
          productId: id && id,
          subject: '',
          message: '',
          status: 'new'
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      if(inquire.name === "") {
        setFieldError(prevInput => ({
          ...prevInput, name: true
        }));
      }

      if (inquire.email === "") {
        setFieldError(prevInput => ({
          ...prevInput, email: true
        }));
      }

      if(inquire.message === "") {
        setFieldError(prevInput => ({
          ...prevInput, message: true
        }));
      }
    }
  }
  
  useEffect(() => {
   //props.setPage("home");
    window.scrollTo(0, 0)
  }, []);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Trailers | Fastway Trucking</title>
      </Helmet>
    <PageTitle name={product && product.Title}/>
    <div className="flex fl-center detail-page-header">  
      <div className='content-widthfix flex fl-center'>
        <a className={currentPage === "profile" && "active-single-detail-header-btn"} onClick={() => setCurrentPage("profile")}>Profile</a>
        <a className={currentPage === "inquire" && "active-single-detail-header-btn"} onClick={() => setCurrentPage("inquire")}>Inquire</a>
        {props.currentUser && <Link to={`/dashboard/trailers/edit/${id}`}>Edit Product</Link>}
      </div>
    </div>

    {product && currentPage === "profile" && <motion.div className="flex fl-center detail-page">  
      <div className='content-widthfix details-boxes flex fl-center fl-space-between'>
        <div className='single-row'>
          <div className='single-box gallery-container'>
            <div className='single-box-header'>
              <h2><i className="bi bi-image"></i> Gallery</h2>
            </div>
            <img src={currentImage} width="500"></img>
            <ul className='image-filter-details'>
              <li onClick={() => setCurrentImage(product.images.one)}>{product.images.one && <img src={product.images.one} width="100"></img>}</li>
              <li onClick={() => setCurrentImage(product.images.two)}>{product.images.two && <img src={product.images.two} width="100"></img>}</li>
              <li onClick={() => setCurrentImage(product.images.three)}>{product.images.three && <img src={product.images.three} width="100"></img>}</li>
              <li onClick={() => setCurrentImage(product.images.four)}>{product.images.four &&<img src={product.images.four} width="100"></img>}</li> 
            </ul>
          </div>
          <div className='single-box'>
            <div className='single-box-header'>
              <h2><i className="bi bi-card-checklist"></i> Product Inventory Info</h2>
            </div>
            <ul className='techincal-list flex fl-col'>
              <li>Stock #: <span>{product.Stock ? product.Stock : "N/A"}</span></li>
              <li>Quantity: <span>{product.Quantity ? product.Quantity : "N/A"}</span></li>
              <li>Posted Date:<span>{product.Date ? product.Date : "N/A"}</span></li>
            </ul>
          </div>
        </div>
        <div className='single-row'>
          <div className='single-box description'>
            <div className='single-box-header'>
              <h2><i className="bi bi-justify"></i> Description</h2>
            </div>
            <p>{product && product.description.blocks[0].text ? product.description.blocks[0].text : "No Description Found"}</p>
          </div>
          <div className='single-box'>
            <div className='single-box-header'>
              <h2><i className="bi bi-card-checklist"></i> Technical Specifications</h2>
            </div>
            <ul className='techincal-list flex fl-col'>
              <li>Manufacturing Year <span>{product && product.Year}</span></li>
              <li>Type <span>{product.Type ? product.Type : "N/A"}</span></li>
              <li>Make <span>{product.Make ? product.Make : "N/A"}</span></li>
              <li>Model <span>{product.Model ? product.Model : "N/A"}</span></li>  
              <li>Length <span>{product && product.Length ? product.Length : "N/A"}</span></li>
              <li>Floor <span>{product.Floor ? product.Floor : "N/A"}</span></li>
              <li>No of Axles <span>{product.NoofAxles ? product.NoofAxles : "N/A"}</span></li>
              <li>Suspension <span>{product.Suspension ? product.Suspension : "N/A"}</span></li>
              <li>Tire Tread Wear <span>{product && product.TireTreadWear ? product.TireTreadWear : "N/A"}</span></li> 
              <li>Color <span>{product.Color ? product.Color : "N/A"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>}

    {currentPage === "inquire" && <motion.div className="flex fl-center detail-page">  
      <div className='content-widthfix details-boxes flex fl-center'>
        <form className='inquireForm' onSubmit={onSubmit}>
          <label>Your Name (required)</label>
          {fieldError.name && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please select a valid Name.</div>}
          <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="name" name="name" value={inquire.name} onChange={updateUserInput} type="name" required=""/>
          <label>Your Email (required)</label>
          {fieldError.email && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please select a valid Email.</div>}
          <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="name" name="email" value={inquire.email} onChange={updateUserInput} type="email" required=""/>
          <label>Product Idenitifier</label>
          <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="name" name="productId" value={inquire.productId} onChange={updateUserInput} type="text" disabled/>
          <label>Subject</label>
          <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="name" name="subject" value={inquire.subject} onChange={updateUserInput} type="text" required=""/>
          <label>Message</label>
          {fieldError.message && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please select a valid Message.</div>}
          <textarea className="form-control filter-inputs-fields form-control-md form-control-dark" name="message" value={inquire.message} onChange={updateUserInput}></textarea>
          <button className='search-button-filter btn-general primary-btn' type='submit'> Send</button>
        </form>
      </div>
      
    </motion.div>}


    <div className="logo-companies recommened-items-single-details flex fl-center">
        <div className="content-widthfix logos-home-wrapper flex fl-center fl-col">
          <h2>Recommended Products</h2>
          <h1>Items you might like</h1>
          <ul className='listing-of-items recommened-pro flex fl-center fl-space-between'>
            <li className='single-item flex fl-col'>
              <div className="item-image" style={{backgroundImage: `url("https://hpmis.com/backend/uploads/9487a23de53d35604b84bf4b9a24ae74k.jpeg")`}}>
                <span className='new-item'>New</span>
              </div>
              <div className='single-item-info flex fl-col'>
                <span className='stock-num'>Stock #517 | <b>Year: 2022</b></span>
                <h2>KENWORTH - T800 - DUMP TRUCK</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit officia nobis, labore quo minus iusto nostrum voluptates delectus.</p>
                <ul className='flex'>
                  <li><i className="bi bi-speedometer"></i> 568158 KMs</li>
                  <li><i className="bi bi-gear-wide"></i> 18 Speed</li>
                </ul>
              </div>
              <Link to={`/truck-detail/2323`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
            </li>
            <li className='single-item flex fl-col'>
              <div className="item-image" style={{backgroundImage: `url("https://hpmis.com/backend/uploads/9487a23de53d35604b84bf4b9a24ae74k.jpeg")`}}>
                <span className='new-item'>New</span>
              </div>
              <div className='single-item-info flex fl-col'>
                <span className='stock-num'>Stock #517 | <b>Year: 2022</b></span>
                <h2>KENWORTH - T800 - DUMP TRUCK</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit officia nobis, labore quo minus iusto nostrum voluptates delectus.</p>
                <ul className='flex'>
                  <li><i className="bi bi-speedometer"></i> 568158 KMs</li>
                  <li><i className="bi bi-gear-wide"></i> 18 Speed</li>
                </ul>
              </div>
              <Link to={`/truck-detail/2323`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
            </li>
            
            <li className='single-item flex fl-col'>
              <div className="item-image" style={{backgroundImage: `url("https://hpmis.com/backend/uploads/9487a23de53d35604b84bf4b9a24ae74k.jpeg")`}}>
                <span className='new-item'>New</span>
              </div>
              <div className='single-item-info flex fl-col'>
                <span className='stock-num'>Stock #517 | <b>Year: 2022</b></span>
                <h2>KENWORTH - T800 - DUMP TRUCK</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit officia nobis, labore quo minus iusto nostrum voluptates delectus.</p>
                <ul className='flex'>
                  <li><i className="bi bi-speedometer"></i> 568158 KMs</li>
                  <li><i className="bi bi-gear-wide"></i> 18 Speed</li>
                </ul>
              </div>
              <Link to={`/truck-detail/2323`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default TrailerDetail;