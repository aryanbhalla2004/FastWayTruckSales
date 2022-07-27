import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
const TrailerView = () => {
  const [listing, setListing] = useState();
  const {id} = useParams();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    firebase.firestore().collection('Trailers').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });

  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Trailers</h3>
          <div className='d-flex'>
            <Link to="/dashboard/trailers/" className="btn-general mr-3 primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
            <Link to={`/dashboard/trailers/edit/${id}`} className="btn-general">Edit <i class="bi bi-binoculars"></i> </Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          //? Code here
        </section>
      </div>
    </div>
  )
}


export default TrailerView;