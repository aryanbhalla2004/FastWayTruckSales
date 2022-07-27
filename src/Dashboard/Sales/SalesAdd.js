import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import TruckOptions from "../../Util/options.js"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SalesAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    email:"",
    re: "",
    address:"",
    city:"",
    state:"",
    pCode:"",
    phone:"",
    date: new Date().toLocaleDateString("en-US"),
    year:"",
    make:"",
    model:"",
    iwe: "",
    color:"",
    stock:"",
    oReading:"",
    amm: 0,
    warranty: 0,
    adminFee: 500,
    puchaserGst: "",
    deposit: 0,
    serialNum: "",
    Vin: "",
    salesRep: "",
    status:"",
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
          <div className="row form-row d-flex">
            <h2 className="h4 mb-2">Sales Details</h2>
            <button type="submit" onClick={onSubmit}className="btn-general primary-btn blue mb-2" href="/dashboard/trucks"> Submit</button>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Date<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="fName" name="date" type="text" disabled value={userInput.date} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">I/We:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="dealorNum" name="iwe" value={userInput.iwe} type="text" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="address" name="address" type="address" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">City<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="city" name="city" type="city" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">State<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="state" name="state" type="state" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Postal Code<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="pCode" name="pCode" type="pCode" onChange={updateUserInput}/>
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
          </div>
          <div className="row form-row">
            <h2 className="h4 mb-2 mt-4">More Details</h2>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="make" name="make" type="make" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Model<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="model" name="model" type="model" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Year<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="year" name="year" type="number" placeholder="YYYY" onChange={updateUserInput}  required />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Odometer Reading<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="oReading" name="oReading" type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Color<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="color" name="color" onChange={updateUserInput}>
                <option value="" disabled selected>Select</option>
                <option value="BLACK">BLACK</option>
                <option value="BLUE">BLUE</option>
                <option value="GREEN">GREEN</option>
                <option value="ORANGE">ORANGE</option>
                <option value="RED">RED</option>
                <option value="SILVER">SILVER</option>
                <option value="WHITE">WHITE</option>
                <option value="YELLOW">YELLOW</option>
                <option value="BRONZE">BRONZE</option>
                <option value="GOLD">GOLD</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Stock #<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="stock" name="stock" type="text" onChange={updateUserInput}/>
            </div>
            
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Serial Number<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="make" name="serialNum" type="text" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Vin #<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="model" name="Vin" type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Salerep<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="year" name="salesRep" type="text" placeholder="" onChange={updateUserInput}  required />
            </div>
          </div>
          <div className="row form-row">
            <h2 className="h4 mb-2 mt-4">Payment Information</h2>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Vehicle Price<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="amm" name="amm" type="number" value={userInput.amm} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Warranty Price<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="warranty" name="warranty" type="number" value={userInput.warranty} onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Admin Fee<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="year" value={userInput.adminFee} name="adminFee" type="number" disabled onChange={updateUserInput}  required />
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Puchaser's GST #<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="make" name="puchaserGst" type="text" value={userInput.puchaserGst} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Deposit<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="model" name="deposit" value={userInput.deposit} type="number" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Payment Status<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="type" name="status" required onChange={updateUserInput}>
                <option value="" disabled selected >Select</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        </form> 
      </div>
    </div>
  )
}


export default SalesAdd;