import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
const InquireView = (props) => {
  const [listing, setListing] = useState();
  const {id} = useParams();
  const [userInput, setUserInput] = useState({
    ...props.Inquires.find((itm) => itm.id == id).data,
    status:"viewed"
  });

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    firebase.firestore().collection('Inquires').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });

    try{
      let userDetails = await props.edit(userInput, "Inquires",id);
    }
    catch(e){
    
    }
  }

  const update = async (e) => {
    e.preventDefault();
    var item = userInput;
    try{
      let userDetails = await props.edit(item, "Listing",id);
    }
    catch(e){
    
    }
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Inquire</h3>
          <div className='d-flex'>
            <Link to="/dashboard/product-inquire/" className="btn-general primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          {listing && listing.email}
        </section>
      </div>
    </div>
  )
}

export default InquireView;