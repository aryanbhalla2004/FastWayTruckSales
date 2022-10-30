import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
import Trucks from '../Trucks/Trucks';
const InquireView = (props) => {
  const [listing, setListing] = useState();
  const {id} = useParams();

  const [userInput, setUserInput] = useState({
    ...props.Inquires.find((itm) => itm.id == id).data,
    status: "viewed"
  });

  const[loaded, setLoaded] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
    item();
  }, [])

  const item = async (e)  => {
    const arr = [...props.trucks, ...props.trailers];
    try {
      var ite = await setProducts(arr.find((itm) => itm.id == userInput.productId));
      setLoaded(false);
    }
    catch (e) {
      
    }
    
  };    

  const fetchData = async() => {
    try{
      let userDetails = await props.edit(userInput, "Inquires",id);
    }
    catch(e){
      setLoaded(true);
    }
  }



  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Inquiries</h3>
          <div className='d-flex'>
            <Link to="/dashboard/product-inquire" className="btn-general primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
        <div class=" form-row"><h2 class="h4 mb-4">Inquiry Details</h2></div>
          <div className='  flex-row form-row mt-5 '>
          {(userInput.name) ? <p className="col"><strong>Name: </strong>{ userInput.name}</p> : ""}
          {(userInput.email) ? <a className="col" href = {`mailto: ${ userInput.email} `}><strong>Email: </strong>{userInput != undefined && userInput.email}</a> : ""}
          </div>
          <div className='  flex-row form-row mt-5 '>
          {(userInput.subject) ? <p className="col"><strong>Subject: </strong>{ userInput.subject}</p> : "N/A"}
          {(userInput.message) ? <p className="col"><strong>Message: </strong>{ userInput.message}</p> : ""}
          </div>
          <div class=" form-row mt-5"><h2 class="h4 mb-4">Product Details</h2>  <Link to={`/truck-detail/${userInput.productId}`} className="btn-general primary-btn"> View Product</Link></div>
          <div className='  flex-row form-row mt-5 '>
            {/*fix ERRORERRORERROO state prooducts state isnt loaded and item keeps trying to load */}
          <p className="col"><strong>Title: </strong>{!loaded && products != undefined && products.data.Title}</p>
          <p className="col"><strong>Quantity: </strong>{!loaded &&  products != undefined && products.data.Quantity}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InquireView;