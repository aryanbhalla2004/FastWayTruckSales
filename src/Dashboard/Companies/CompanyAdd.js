import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import options from "../../Util/options.js"
import imageCompression from 'browser-image-compression';
import Axios from "axios";
import moment from 'moment';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const CompanyAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    address: "",
    puchaserGst: "",
    city: "",
    state: "",
    country: "",
    email: "",
    iwe: "",
    date: moment().format("MM/DD/YYYY"),
    phone: "",
  });


  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
    setError("");
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    var item = userInput;
    const findCompany = props.CompaniesList && props.CompaniesList.find(e => e.data.iwe.toLowerCase() === item.iwe.toLowerCase());
    if(userInput.address != "" && userInput.city != "" && userInput.iwe != "" && userInput.email != "" && userInput.phone != "") {
      if(findCompany == undefined) {
        try{
          let userDetails = await props.add("Companies",item);
          history('/dashboard/company');
        }
        catch(e){
          setError(e.message);
        }
      } else {
        setError("Seems like there is already a business with this name in your system.");
      }
      
    } else {
      setError("Please complete the form and try again.")
    }
    
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Add New Company</h3>
          <Link to="/dashboard/Company" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <div className="row form-row">
            <h2 className="h4 mb-4">Trailer Details</h2>
            <button type="submit" className="btn-general primary-btn blue mb-4" > Submit</button>
          </div>
          {error  && <div class="alert alert-danger" role="alert">{error}</div>}
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Date<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="fName" name="date" disabled type="text" value={userInput.date} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Company Name:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="dealorNum" name="iwe" value={userInput.iwe} type="text" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="address" name="address" type="address" value={userInput.address} onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">City<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="city" name="city" type="city" value={userInput.city} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Province/State<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="state" name="state" type="state" value={userInput.state}  onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Postal Code<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="pCode" name="pCode" type="pCode" value={userInput.pcode} onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Phone Number<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="phone" name="phone" type="tel" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Email Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="phone" name="email" type="email" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Re:<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="re" name="re" type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Puchaser's GST #:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="re" name="puchaserGst" type="text" onChange={updateUserInput}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default CompanyAdd;