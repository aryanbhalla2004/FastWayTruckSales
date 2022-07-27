import React from 'react'
import { Link } from 'react-router-dom'
export const DashboardHome = (props) => {
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Welcome to Dashboard</h3>
          <div className='d-flex'>
            <Link to="/" className="btn-general primary-btn mr-3"><i class="bi bi-arrow-left"></i> Back to Home</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response grid-box-dash" id="basic-info">
          <div className='single-block-dash'>
            <i class="bi bi-truck"></i>
            <div>
              <h3>{props.trucks && props.trucks.length}</h3>
              <p>Total Trucks</p>
            </div>
          </div>
          <div className='single-block-dash'>
            <i class="bi bi-truck"></i>
            <div>
              <h3>{props.trailers && props.trailers.length}</h3>
              <p>Total Trailers</p>
            </div>
          </div>
          <div className='single-block-dash'>
            <i class="bi bi-truck"></i>
            <div>
              <h3>0</h3>
              <p>Total Inquires</p>
            </div>
          </div>
          <div className='single-block-dash'>
            <i class="bi bi-truck"></i>
            <div>
              <h3>0</h3>
              <p>Total New Listings</p>
            </div>
          </div>
          <div className='single-block-dash'>
            <i class="bi bi-truck"></i>
            <div>
              <h3>0</h3>
              <p>Total Bill of Sales</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardHome;