import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import TruckOptions from "../../Util/options.js"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SalesEdit = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    fName:"",
    dealerNumm:"",
    lName:"",
    email:"",
    address:"",
    city:"",
    state:"",
    pCode:"",
    phone:"",
    cPhone:"",
    date: new Date().toLocaleDateString("en-US"),
    year:"",
    make:"",
    model:"",
    color:"",
    oReading:"",
    status:"",
    amm:""
  });

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();

    var item = userInput;
    try{
      let userDetails = await props.add("Sales",item);
      history('/dashboard/sales');
    }
    catch(e){
      setError(e.message);
    }
  }
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Create New Sales</h3>
          <Link to="/dashboard/trucks" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
  <div className="row form-row">
  <h2 className="h4 mb-4">Sales Details</h2>
  
  <button type="submit" onClick={onSubmit}className="btn-general primary-btn blue mb-4" href="/dashboard/trucks"> Submit</button>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">First Name<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="fName"
        name="fName"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Last Name<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="lName"
        name="lName"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Email<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="email"
        name="email"
        type="email"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Status<span>*</span></label
      ><select
        className="form-control form-control-md form-control-dark"
        id="type"
        name="status"
        required
        onChange={updateUserInput}
      >
        <option value="" disabled selected >Select</option>
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
      </select>
    </div>
    </div>
    <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Address<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="address"
        name="address"
        type="address"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">City<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="city"
        name="city"
        type="city"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">State<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="state"
        name="state"
        type="state"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Postal Code<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="pCode"
        name="pCode"
        type="pCode"
        onChange={updateUserInput}
      />
    </div>
    
    </div>
    <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Phone Number<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="phone"
        name="phone"
        type="phone"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Cell Phone<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="phone"
        name="phone"
        type="phone"
        onChange={updateUserInput}
      />
    </div>
    </div>
    <div className="row form-row">
      <h2 className="h4 mb-4">More Details</h2>
    </div>
    <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="make"
        name="make"
        type="make"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Model<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="model"
        name="model"
        type="model"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Year<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="year"
        name="Year"
        type="number"
        placeholder="YYYY"
        onChange={updateUserInput}
        required
      />
    </div>
    </div>
    <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Reading<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="oReading"
        name="oReading"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Ammount<span>*</span></label
      ><input
        className="form-control form-control-md form-control-dark"
        id="amm"
        name="amm"
        type="number"
        onChange={updateUserInput}
      />
    </div>
    </div>
  
  
</form>

      
        
      </div>
      
    </div>
  )
}


export default SalesEdit;