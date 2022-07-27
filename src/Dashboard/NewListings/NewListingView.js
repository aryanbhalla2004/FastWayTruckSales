import { useDeprecatedAnimatedState } from 'framer-motion';
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
const NewListingView = (props) => {
  const [listing, setListing] = useState();
  const {id} = useParams();
  const [userInput, setUserInput] = useState({
    ...props.TruckPost.find((itm) => itm.id == id).data,
    status:"viewed"
  });

  useEffect(() => {
    func();
  }, [])
  const func = async (e) => {
    try{
      let userDetails = await props.edit(userInput, "TruckPost",id);
    }
    catch(e){
    
    }
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Listing</h3>
          <div className='d-flex'>
            <Link to="/dashboard/new-listings/" className="btn-general primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
        <div class=" form-row"><h2 class="h4 mb-4">Listing Details</h2></div>
          <div className='  flex-row space-between form-row mt-5 '>
          {(userInput.ContactName) ? <p className="col"><strong>Name: </strong>{ userInput.ContactName}</p> : ""}
          {(userInput.ContactEmail) ? <a className="col" href = {`mailto: ${ userInput.ContactEmail} `}><strong>Email: </strong>{userInput != undefined && userInput.ContactEmail}</a> : ""}
          {(userInput.ContactPhone) ? <p className="col" ><strong>Phone Number: </strong>{ userInput.ContactPhone}</p>: ""}
          </div>
          <div class=" form-row"><h2 class="h4 mb-4 mt-5">Truck Details</h2></div>
          <div className='flex-row space-between form-row mt-5 '>
          <p className="col"><strong>Color: </strong>{( userInput.Color) ? userInput.Color : "N/A"}</p>
          <p className="col"><strong>Engine: </strong>{( userInput.Engine)  ? userInput.Engine : "N/A" }</p> 
          <p className="col"><strong>FuelTank: </strong>{( userInput.FuelTank)  ? userInput.FuelTank : "N/A" }</p>
          </div>
          <div className='flex-row space-between mt-5 form-row'>
          <p className="col"><strong>Mileage: </strong>{(userInput.Mileage) ? userInput.Mileage : "N/A"}</p>
          <p className="col"><strong>Model: </strong>{(userInput.Model)  ? userInput.Model : "N/A" }</p> 
          <p className="col"><strong>Ratio: </strong>{( userInput.Ratio)  ? userInput.Ratio : "N/A" }</p>
          </div>
          <div className='flex-row space-between mt-5 form-row'>
          <p className="col"><strong>Sleeper: </strong>{(userInput.Sleeper) ? userInput.Sleeper : "N/A"}</p>
          <p className="col"><strong>Transmission: </strong>{(userInput.Transmission)  ? userInput.Transmission : "N/A" }</p> 
          <p className="col"><strong>TruckMake: </strong>{( userInput.TruckMake)  ? userInput.TruckMake : "N/A" }</p>
          </div>
          <div className='flex-row space-between mt-5 form-row'>
          <p className="col"><strong>Vin: </strong>{(userInput.Vin) ? userInput.Vin : "N/A"}</p>
          <p className="col"><strong>WheelBase: </strong>{(userInput.WheelBase)  ? userInput.WheelBase : "N/A" }</p> 
          <p className="col"><strong>Year: </strong>{( userInput.Year)  ? userInput.Year : "N/A" }</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NewListingView;