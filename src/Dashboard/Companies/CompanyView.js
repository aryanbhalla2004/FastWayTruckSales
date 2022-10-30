import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
const CompaniesView = (props) => {
  const history = useNavigate();
  const [listing, setListing] = useState();
  const {id} = useParams();
  const[loaded, setLoaded] = useState(true);

  useEffect(() => {
    const findCompany = props.CompaniesList && props.CompaniesList.find(item => item.id === id);
    if(findCompany != undefined) {
      setListing(findCompany.data);
    } else {
      history("/company");
    }
  }, [id])
  
  
  

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Company Details</h3>
          <div className='d-flex'>
            <Link to={`/dashboard/company/edit/${id}`} className="btn-general mr-3">Edit <i class="bi bi-binoculars"></i> </Link>
            <Link to="/dashboard/company" className="btn-general primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-4" id="basic-info">
        <div class="form-row"><h2 class="h4 mb-4">Currently Viewing: <u>{ listing != undefined && listing.iwe}</u></h2></div>
          <ul className='flex-3-group-fd'>
            <li><strong>Created Date: </strong>{ listing != undefined && listing.date}</li>
            <li><strong>Name: </strong>{ listing != undefined && listing.iwe}</li>
            <li href = {`mailto: ${ listing && listing.email} `}><strong>Email: </strong>{listing != undefined && listing.email}</li>
          </ul>
          <ul className='flex-3-group-fd'>
            <li><strong>Phone Number: </strong>{ listing != undefined && listing.phone}</li>
            <li><strong>Re: </strong>{ listing != undefined && listing.re != "" ? listing.re : "N/A"}</li>
            <li><strong>Address: </strong>{ listing != undefined && listing.address}, { listing != undefined && listing.city}, { listing != undefined && listing.state}, { listing != undefined && listing.pCode}</li>
          </ul> 
          <ul className='flex-3-group-fd'>
            <li><strong>Client GSP NUMBER: </strong>{ listing != undefined && listing.puchaserGst != "" ? listing.puchaserGst : "N/A"}</li>
          </ul>
          {/* <div class=" form-row mt-5"><h2 class="h4 mb-4">Product Details</h2>  <Link to={`/truck-detail/${userInput.productId}`} className="btn-general primary-btn"> View Product</Link></div> */}
          
        </section>
      </div>
    </div>
  )
}

export default CompaniesView;