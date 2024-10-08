import React, {useState, useEffect} from 'react'
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import moment from 'moment';
import emailjs from '@emailjs/browser';

const SellTruck = (props) => {
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [truckDetail, setTruckDetail] = useState({
    ContactName: '',
    ContactEmail: '',
    ContactPhone: '',
    TruckType: '',
    TruckMake: '',
    Model: '',
    Year: '',
    Vin: '',
    Color: '',
    Engine: '',
    Transmission: '',
    Ratio: '',
    WheelBase: '',
    Sleeper: '',
    Mileage: '',
    status: 'new',
    FuelTank: ''
  });

  useEffect(() => {
    //props.setPage("home");
    window.scrollTo(0, 0)
  }, []);

  const [fieldError, setFieldError] = useState({
    ContactName: false,
    ContactEmail: false,
    ContactPhone: false,
    TruckType: false,
    TruckMake: false,
    Year: false,
  });

  const updateUserInput = (e) => {
    setFieldError(prevInput => ({
      ...prevInput, [e.target.name]: false
    }));

    setTruckDetail(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();    
    setLoading(true);
    
    if(truckDetail.ContactName != "" && truckDetail.ContactEmail != "" && truckDetail.ContactPhone != "" && truckDetail.TruckType != "" && truckDetail.TruckMake != "" && truckDetail.Year <= moment().year() + 1 && truckDetail.Year > 1900) {
      try {
        await emailjs.send("service_7bhb3hf", "template_zolsttk", truckDetail, 'O4nqrVM4jnHS9WBVF');
        props.add("TruckPost" ,truckDetail);
        setTimeout(() => {
          setLoading(false);
          setMessage(true);
          window.scrollTo(0, 0)
        }, 1000)
        
      } catch(e) {
        setError(true);
        console.log(e);
        setLoading(false);
      }

    } else {
      
      setLoading(false);
      if(truckDetail.ContactName == "") {
        setFieldError(prevInput => ({
          ...prevInput, ContactName: true
        }));
      }

      if(truckDetail.ContactEmail == "") {
        setFieldError(prevInput => ({
          ...prevInput, ContactEmail: true
        }));
      }

      if(truckDetail.ContactPhone == "") {
        setFieldError(prevInput => ({
          ...prevInput, ContactPhone: true
        }));
      }

      if(truckDetail.TruckType == "") {
        setFieldError(prevInput => ({
          ...prevInput, TruckType: true
        }));
      }

      if(truckDetail.TruckMake == "") {
        setFieldError(prevInput => ({
          ...prevInput, TruckMake: true
        }));
      }

      if(truckDetail.Year == "" || truckDetail.Year > moment().year() + 1 || truckDetail.Year < 1900) {
        console.log(truckDetail.Year);
        setFieldError(prevInput => ({
          ...prevInput, Year: true
        }));
      }
    }
  }

  const resetFunction = () => {
    setMessage(false);
    setError(false);
    setTruckDetail({
      ContactName: '',
      ContactEmail: '',
      ContactPhone: '',
      TruckType: '',
      TruckMake: '',
      Model: '',
      Year: '',
      Vin: '',
      Color: '',
      Engine: '',
      Transmission: '',
      Ratio: '',
      WheelBase: '',
      Sleeper: '',
      Mileage: '',
      FuelTank: ''
    })
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Sell Your Truck | Fastway Truck Sales</title>
      </Helmet>
      <PageTitle name="Sell Your Truck"/>
      {!message && !error ?
      <div className="flex fl-center">
        <div className="content-widthfix about-wrapper flex fl-col">
          <h2 className='selection-header-text'>Sell your truck with us</h2>
          <p className='selection-small-text'>Fill out the form and our team will try to get back to you within 24 hours.</p>
          <form onSubmit={onSubmit}>
            <section className="card card-light card-body border-0 shadow-sm p-4 mb-4 " id="basic-info">
              <h2 className="h4 mb-4">Contact Details</h2>
              <div className="row">
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Name<span>*</span></label>
                  <input className="form-control form-control-md form-control-dark" id="name" name="ContactName" value={truckDetail.ContactName} onChange={updateUserInput} type="text" required=""/>
                  {fieldError.ContactName && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please provide a valid Name.</div>}
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Email<span>*</span></label>
                  <input className="form-control form-control-md form-control-dark" id="email" name="ContactEmail" value={truckDetail.ContactEmail} onChange={updateUserInput} type="email"  required=""/>
                  {fieldError.ContactEmail && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please provide a valid Email.</div>}
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Phone Number<span >*</span></label>
                  <input className="form-control form-control-md form-control-dark" id="phone" name="ContactPhone" value={truckDetail.ContactPhone} onChange={updateUserInput} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required="" placeholder="XXX-XXX-XXXX" />
                  {fieldError.ContactPhone && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please provide a valid Phone Number.</div>}
                </div>
              </div>
            </section>
            <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="basic-info">
              <h2 className="h4 mb-4">Truck Details</h2>
              <div className="row mt-3">
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Type<span>*</span></label>
                  <select className="form-control form-control-md form-control-dark" id="type" name="TruckType" value={truckDetail.TruckType} onChange={updateUserInput} required="" >
                    <option value="">Select</option>
                    <option value="DAYCAB">DAYCAB</option>
                    <option value="HIGHWAY">HIGHWAY</option>
                    <option value="DUMP TRUCK">DUMP TRUCK</option>
                  </select>
                  {fieldError.TruckType && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please select a valid Type.</div>}
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label>
                  <select className="form-control form-control-md form-control-dark" id="make" name="TruckMake" value={truckDetail.TruckMake} onChange={updateUserInput} required="">
                    <option value="">Select</option>
                    <option value="FORD">FORD</option>
                    <option value="FREIGHTLINER">FREIGHTLINER</option>
                    <option value="HINO">HINO</option>
                    <option value="INTERNATIONAL">INTERNATIONAL</option>
                    <option value="KENWORTH">KENWORTH</option>
                    <option value="MACK">MACK</option>
                    <option value="OTTAWA">OTTAWA</option>
                    <option value="PETERBILT">PETERBILT</option>
                    <option value="STERLING">STERLING</option>
                    <option value="VOLVO">VOLVO</option>
                    <option value="WESTERN STAR">WESTERN STAR</option>
                    <option value="WHITE">WHITE</option>
                  </select>
                  {fieldError.TruckMake && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please select a valid Make.</div>}
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Model</label>
                  <input className="form-control form-control-md form-control-dark" id="model" name="Model" value={truckDetail.Model} onChange={updateUserInput} type="text"/>
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">Year<span>*</span></label>
                  <input className="form-control form-control-md form-control-dark" id="year" name="Year" value={truckDetail.Year} onChange={updateUserInput} type="number" required="" placeholder="YYYY" maxlength="4"/>
                  {fieldError.Year && <div id="validationServer03Feedback" class="invalid-feedback mt-0 mb-0">Please enter a valid Year.</div>}
                </div>
                <div className="col">
                  <label className="form-label text-dark" htmlFor="c-name">VIN</label>
                  <input className="form-control form-control-md form-control-dark" id="vin" name="Vin" value={truckDetail.Vin} onChange={updateUserInput} type="text" />
                </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Color</label>
                    <select className="form-control form-control-md form-control-dark" id="color" name="Color" value={truckDetail.Color} onChange={updateUserInput}>
                      <option value="">Select</option>
                      <option value="BLACK">BLACK</option>
                      <option value="BLUE">BLUE</option>
                      <option value="GREEN">GREEN</option>
                      <option value="ORANGE">ORANGE</option>
                      <option value="RED">RED</option>
                      <option value="SILVER">SILVER</option>
                      <option value="WHITE">WHITE</option>
                      <option value="YELLOW">YELLOW</option>
                      <option value="BRONZE">BRONZE</option>
                      <option value="GOLD">GOLD</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Engine</label>
                    <input className="form-control form-control-md form-control-dark" id="engine" name="Engine" value={truckDetail.Engine} onChange={updateUserInput} type="text" />
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Transmission</label>
                    <select className="form-control form-control-md form-control-dark" id="transmission" name="Transmission" value={truckDetail.Transmission} onChange={updateUserInput} >
                      <option value="">Select</option>
                      <option value="I-SHIFT">I-SHIFT</option>
                      <option value="AUTO">AUTO</option>
                      <option value="10 SPEED">10 SPEED</option>
                      <option value="13 SPEED">13 SPEED</option>
                      <option value="18 SPEED">18 SPEED</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Ratio</label>
                    <input className="form-control form-control-md form-control-dark" id="ratio" name="Ratio" value={truckDetail.Ratio} onChange={updateUserInput} type="text" />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Wheelbase</label>
                    <input className="form-control form-control-md form-control-dark" id="wheelbase" name="WheelBase" value={truckDetail.WheelBase} onChange={updateUserInput} type="text" />
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Sleeper</label>
                    <input className="form-control form-control-md form-control-dark" id="sleeper" name="Sleeper" value={truckDetail.Sleeper} onChange={updateUserInput} type="text" />
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-lg-8">
                        <label className="form-label text-dark" htmlFor="c-name">Mileage (KM)<span>*</span></label>
                      </div>
                      <div className="col-lg-4 text-end">
                        <i className="fi-alert-circle" title="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Only Numeric values are allowed"  aria-label="Only Numeric values are allowed"></i>
                      </div>
                    </div>
                    <input className="form-control form-control-md form-control-dark" id="mileage" name="Mileage" value={truckDetail.Mileage} onChange={updateUserInput} type="text" required="" />
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Fuel Tanks</label>
                    <input className="form-control form-control-md form-control-dark" id="fuel_tanks" name="FuelTank" value={truckDetail.FuelTank} onChange={updateUserInput} type="text"/>
                  </div>
                </div>
              </section>
              <div className="pt-3 text-center">
                <button className="btn btn-lg btn-primary w-sm-auto w-100" type="submit"> {loading ? <div class="spinner-border text-light" role="status"></div> : 'Submit form' }</button>
              </div>
            </form>
          </div>
        </div> : 
        <div className="flex fl-center">
        <div className="content-widthfix about-wrapper flex fl-col fl-center">
        {!error ? <i class="bi bi-check-circle success icons-verifying success-color"></i> : <i class="icons-verifying bi bi-x-circle primary-color"></i>}
          <h2 className='selection-header-text'>{!error ? "Thank you for posting your truck" : "Something went wrong"}</h2>
          <h1 className='selection-small-text'>{!error ? "Our experts will review the details of your truck and respond to you as soon as possible." : "Unfortunately, something went wrong with the service please try again later"}</h1>
          <button className='btn btn-lg btn-primary  w-sm-auto' onClick={() => resetFunction()}>{!error ? "Go Back" : "Try Again"}</button>
        </div>
        </div>}
    </motion.div>
  )
}

export default SellTruck;
