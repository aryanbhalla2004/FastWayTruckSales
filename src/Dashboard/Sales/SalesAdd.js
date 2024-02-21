import { useEffect, useState, useRef } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import TruckOptions from "../../Util/options.js"
import { Editor } from "react-draft-wysiwyg";
import 'react-select-search/style.css'
import SelectSearch from 'react-select-search';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";

const SalesAdd = (props) => {
  const ref = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const history = useNavigate();
  const [error, setError] = useState("");
  const [disableRecommend, setDisableRecommend] = useState(false);
  const [userInput, setUserInput] = useState({
    email:"",
    re: "",
    address:"",
    city:"",
    state:"",
    pCode:"",
    phone:"",
    date: moment().format("MM/DD/YYYY"),
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
    textbox: "",
    salesRep: "",
    pst: false,
    status:"",
    re:"",
    purchasePrice: 0,
    invoice:(parseInt(props.ExtraInfo.data.totalInvoice) + 1)
  });

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();

    var item = userInput;
    updateInvoice();

    try{
      let userDetails = await props.add("Sales",item);
      history('/dashboard/sales');
    } catch(e){
      setError(e.message);
    }
  }

  const updateInvoice = async(e) => {
    var item = { totalInvoice: userInput.invoice};

    try {
      let d = await props.edit(item,"ExtraInfo",props.ExtraInfo.id);
    } catch(e){
      setError(e.message);
    }
  }

  const hideBox = () => {
    
    const findItem = props.CompaniesList.find(item => item.data.iwe.toLowerCase().includes(userInput.iwe.toLowerCase()));

    if(findItem === undefined) {
     setShowSearch(false);
    }
  }

  const checkForCompanyName = (e) => {
    setShowSearch(true);

    if(e.code === "Enter") {
      const currentUserValue  = e.target.value;
      const findItems = props.CompaniesList && props.CompaniesList.filter(item => item.data.iwe.toLowerCase().includes(currentUserValue.toLowerCase()));
      if(findItems.length === 1) {
        setShowSearch(false);
        setUserInput(prevInput => ({
          ...prevInput, iwe: findItems[0].data.iwe, 
          address: findItems[0].data.address, 
          re: findItems[0].data.re, 
          state: findItems[0].data.state, 
          city: findItems[0].data.city, 
          email: findItems[0].data.email,
          pCode: findItems[0].data.pCode,
          phone: findItems[0].data.phone,
          puchaserGst: findItems[0].data.puchaserGst,
        }));
      }
    }
  }

  const selectCompany = (company) => {
    console.log(company);
    setUserInput(prevInput => ({
      ...prevInput, iwe: company.iwe, 
      address: company.address, 
      re: company.re, 
      state: company.state, 
      city: company.city, 
      email: company.email,
      pCode: company.pCode,
      phone: company.phone,
      puchaserGst: company.puchaserGst,
    }));

    setShowSearch(false);
  }


  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Create New Sales</h3>
          <Link to="/dashboard/sales" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <div className="row form-row d-flex">
            <h2 className="h4 mb-2">Sales Details</h2>
            <button type="submit" className="btn-general primary-btn blue mb-2"> Submit</button>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Date<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="fName" name="date" type="date" value={userInput.date} onChange={updateUserInput}/>
            </div>
            <div className="col companie-selection-container-field" >
              <label className="form-label text-dark" htmlFor="c-name">I/We:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="dealorNum" name="iwe" onBlur={hideBox} onKeyDown={checkForCompanyName} value={userInput.iwe}  type="text" onChange={updateUserInput} autoComplete="off"/>
              {showSearch && userInput.iwe.length > 0 && props.CompaniesList.length > 0 && <div className="companies-selection">
                <ul>
                {
                  props.CompaniesList && props.CompaniesList.filter(item => item.data.iwe.toLowerCase().includes(userInput.iwe.toLowerCase())).map((item, index) => (
                    <li  onClick={() => selectCompany(item.data)}>{item.data.iwe}</li>
                  ))
                }

                {props.CompaniesList && props.CompaniesList.filter(item => item.data.iwe.toLowerCase().includes(userInput.iwe.toLowerCase())).length <= 0 && <li>No Companies Found</li>}
                
                </ul>
              </div>}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="address" name="address" value={userInput.address} type="address" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">City<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="city" name="city" type="city" value={userInput.city} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">State<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="state" name="state" type="state" value={userInput.state} onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Postal Code<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="pCode" name="pCode" type="pCode" value={userInput.pCode} onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Phone Number<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="phone" name="phone" type="tel" value={userInput.phone} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Email Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="phone" name="email" type="email" value={userInput.email} onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Re:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="re" name="re" type="text" value={userInput.re} onChange={updateUserInput}/>
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
              <label className="form-label text-dark" htmlFor="c-name">Odometer-hours Reading<span>*</span></label>
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
              <label className="form-label text-dark" htmlFor="c-name">Reefer  Serial Number #<span>*</span></label>
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
              <label className="form-label text-dark" htmlFor="c-name">Purchase Price<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="purchasePrice" name="purchasePrice" type="number" value={userInput.purchasePrice} onChange={updateUserInput} />
            </div>
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
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">P.S.T Cost<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="type" name="pst" required onChange={updateUserInput}>
                <option value="" disabled selected >Select</option>
                <option value="true">Applied</option>
                <option value="false">Not Applied</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Text Box<span>*</span></label>
              <textarea className="form-control form-control-md form-control-dark" id="type" name="textbox" required onChange={updateUserInput}></textarea>
            </div>
          </div>
        </form> 
      </div>
    </div>
  )
}


export default SalesAdd;