import React from 'react'
import logo from "../Util/Images/logo.jpg";
import { Link, Outlet } from 'react-router-dom';
import "./Dashboard.css";
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import Delete from '../Components/Delete/Delete';
import Logout from '../Components/Logout/Logout';
const Dashboard = (props) => {
  const history = useNavigate();
  const [logoutBox, setLogoutBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [deleteId, setDeleteId] = useState();
  return (
    <>
     {deleteBox && <Delete deleteId={deleteId} del={props.del} setDeleteBox={setDeleteBox}/>}
     {logoutBox && <Logout setLogoutBox={setLogoutBox} logout={props.logout}/>}
      <div className='conatiner-dashboard'>
        <div className='side-bar-menu shadow-sm'>
          <div className='logo-nav'>
            <div className='logo-welcome'>
              <img src={logo} width="100"></img>
              <p>Welcome to Dashboard</p>
            </div>
            <div className='contain-col'>
              <span>Menu</span>
              <ul className='nav'>
                <li onClick={() => history("/dashboard")}><i class="bi bi-grid-fill"></i> <Link to="/dashboard">Dashboard</Link></li>
                <li onClick={() => history("/dashboard/trucks")}><i class="bi bi-truck"></i><Link to="/dashboard/trucks">Trucks</Link></li>
                <li onClick={() => history("/dashboard/trailers")}><i class="bi bi-minecart-loaded"></i><Link to="/dashboard/trailers">Trailers</Link></li>
              </ul>
            </div>
            <div className='contain-col'>
              <span>Inquires</span>
              <ul className='nav'>
                <li onClick={() => history("/dashboard/product-inquire")}><i class="bi bi-bar-chart-line"></i><Link to="/dashboard/product-inquire">Product Inquires</Link></li>
                <li onClick={() => history("/dashboard/new-listings")}><i class="bi bi-mailbox"></i><Link to="/dashboard/new-listings">New Listings</Link></li>
              </ul>
            </div>
            <div className='contain-col'>
              <span>Sales</span>
              <ul className='nav'>
                <li onClick={() => history("/dashboard/sales")}><i class="bi bi-cash"></i><Link to="/dashboard/sales">Bill of Sales</Link></li>
              </ul>
            </div>
          </div>
          <div className='logout-user-info'>
            <span>
              <h3>Administrator</h3>
              <p>{props.currentUser && props.currentUser.email}</p>
            </span>
            <button onClick={() => setLogoutBox(true)}><i class="bi bi-box-arrow-right"></i></button>
          </div>
        </div>
        <div className='right-side-content'>
          <Outlet context={[setDeleteBox, setDeleteId]}/>
        </div>
      </div>
    </>
  )
}

export default Dashboard;