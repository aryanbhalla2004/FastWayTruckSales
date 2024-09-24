import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import "./style.css";
import { printCheque } from "../../Util/htmlFile";

export const ChequeView = (props) => {

  const history = useNavigate();
  const [listing, setListing] = useState();
  const {id} = useParams();
  const[loaded, setLoaded] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const findCheque = props.ChequeInfo && props.ChequeInfo.find(item => item.id === id);
    if(findCheque != undefined) {
      setListing(findCheque.data);
    } else {
      history("/company");
    }
  }, [id]);

  function formatDateToMMDDYYYY(dateString) {
    const date = new Date(dateString);
    
    // Extract month, day, and year from the date
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Concatenate the values to MMDDYYYY format
    return `${month}${day}${year}`;
  }
  
  const GenerateFile = () => {
    setLoading(true);
    printCheque(`${listing.for}-Cheque-${id}`);
    setLoading(false);
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Cheque Details</h3>
          <div className='d-flex'>
            {/* <Link to={`/dashboard/company/edit/${id}`} className="btn-general mr-3">Edit <i class="bi bi-binoculars"></i> </Link> */}
            <Link to="/dashboard/cheque" className="btn-general primary-btn"><i class="bi bi-arrow-left"></i> Back</Link>
            <button className="btn-general edit-button" onClick={GenerateFile}>{loading ? <div class="spinner-border text-light" role="status"></div> : <><i class="bi bi-file-arrow-down"></i>  Download</>}</button>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-4 cheque-box pdf-cheque-download" id="basic-info">
          <ul className='date-box-c'>
            <li>{ listing != undefined && formatDateToMMDDYYYY(listing.date)}</li>
          </ul>
          <ul className='amount-cost-c'>
            <li>{ listing != undefined && listing.amountWord}</li>
            <li>{ listing != undefined && listing.amount}</li>
          </ul>
          <ul className='memo-for-c'>
            <li>{ listing != undefined && listing.for}</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
