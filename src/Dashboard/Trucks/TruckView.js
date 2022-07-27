import React, {useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom';
import {firebase} from "../../Util/Firebase";
const TruckView = () => {
  const [listing, setListing] = useState();
  const {id} = useParams();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    firebase.firestore().collection('Trucks').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });
  }
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Truck</h3>
          <div className='d-flex'>
            <Link to="/dashboard/trucks/" className="btn-general mr-3 primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
            <Link to={`/dashboard/trucks/edit/${id}`} className="btn-general">Edit <i class="bi bi-binoculars"></i> </Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
        <div class="flex fl-center detail-page">
  <div class="content-widthfix details-boxes flex fl-center fl-space-between">
    <div class="single-row">
      <div class="single-box gallery-container">
        <div class="single-box-header">
          <h2><i class="bi bi-image"></i> Gallery</h2>
        </div>
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80"
          width="500"
        />
      </div>
      <div class="single-box">
        <div class="single-box-header">
          <h2><i class="bi bi-grid-3x2-gap-fill"></i> Amenities</h2>
        </div>
        <ul class="flex list-of-amenities">a
          <li><i class="bi bi-fan"></i> Air conditioner</li>
          <li><i class="bi bi-usb-symbol"></i> USB Ports</li>
          <li><i class="bi bi-geo"></i> GPS</li>
          <li><i class="bi bi-speedometer2"></i> Cruise</li>
          <li><i class="bi bi-broadcast"></i> Radio Equipment</li>
        </ul>
      </div>
    </div>
    <div class="single-row">
      <div class="single-box description">
        <div class="single-box-header">
          <h2><i class="bi bi-justify"></i> Description</h2>
        </div>
        <p>
          The all-new Volvo XC60 is a terrific luxury compact SUV. It's been
          fully redesigned for 2017 and features improvements across the board.
          These changes bump the vehicle from its previous midpack standing; it
          now resides with some of the best in the class. Some of the most
          notable improvements include a state-of-the-art infotainment system,
          more legroom for rear-seat riders, and peppy engine choices.
        </p>
      </div>
      <div class="single-box">
        <div class="single-box-header">
          <h2><i class="bi bi-card-checklist"></i> Technical Specifications</h2>
        </div>
        <ul class="techincal-list flex fl-col">
          <li>Manufacturing Year <span>2017</span></li>
          <li>Number of doors <span>5</span></li>
          <li>Max passengers <span>5</span></li>
          <li>Fuel <span>Diesel</span></li>
          <li>Fuel usage per 100km <span>2017</span></li>
          <li>Mileage <span>23650 km</span></li>
          <li>Color <span>Silver</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

        </section>
      </div>
    </div>
  )
}

export default TruckView
