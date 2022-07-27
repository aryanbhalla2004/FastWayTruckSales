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
    fetchData();
  }, [])
  const fetchData = async() => {
    firebase.firestore().collection('TruckPost').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });

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
          <p>{listing != undefined && listing.ContactEmail}</p>
        </section>
      </div>
    </div>
  )
}

export default NewListingView;