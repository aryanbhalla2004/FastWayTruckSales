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
  const {id} = useParams();
  const [userInput, setUserInput] = useState({
    ...props.SalesPost.find((itm) => itm.id == id).data
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
      let userDetails = await props.edit(item, "Sales", id);
      history(`/dashboard/sales/${id}`);
    }
    catch(e){
      setError(e.message);
    }
  }
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Edit Sales Page</h3>
          <Link to={`/dashboard/sales/${id}`} className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <div className="row form-row d-flex">
            <h2 className="h4 mb-2">Sales Details</h2>
            <button type="submit" onClick={onSubmit}className="btn-general primary-btn blue mb-2" href="/dashboard/trucks"> Submit</button>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Date<span></span></label>
              <input value={userInput.fName} className="form-control form-control-md form-control-dark" id="fName" name="date" type="text" disabled value={userInput.date} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">I/We:<span>*</span></label>
              <input value={userInput.lName} className="form-control form-control-md form-control-dark" id="dealorNum" name="iwe" value={userInput.iwe} type="text" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Address<span>*</span></label>
              <input value={userInput.address} className="form-control form-control-md form-control-dark" id="address" name="address" type="address" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">City<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="city" value={userInput.city} name="city" type="city" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">State<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="state" value={userInput.state} name="state" type="state" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Postal Code<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="pCode" name="pCode" value={userInput.pCode} type="pCode" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Phone Number<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="phone" value={userInput.phone} name="phone" type="tel" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Email Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="phone" name="email" value={userInput.email} type="email" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Re:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="re" name="re" value={userInput.re} type="text" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row form-row">
            <h2 className="h4 mb-2 mt-4">More Details</h2>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="make" name="make" value={userInput.make} type="make" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Model<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="model" name="model" value={userInput.model} type="model" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Year<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="year" name="year" value={userInput.year} type="number" placeholder="YYYY" onChange={updateUserInput}  required />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Odometer Reading<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="oReading" name="oReading" value={userInput.oReading} type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Color<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="color" name="color" value={userInput.color} onChange={updateUserInput}>
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
              <input className="form-control form-control-md form-control-dark" id="stock" name="stock" value={userInput.stock} type="text" onChange={updateUserInput}/>
            </div>
            
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Serial Number<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="" name="serialNum" value={userInput.serialNum} type="text" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Refer for Serial Number #<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="" name="Vin" value={userInput.Vin} type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Salerep<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="" name="salesRep" value={userInput.salesRep} type="text" onChange={updateUserInput}/>
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
              <select className="form-control form-control-md form-control-dark" id="type" name="status" value={userInput.status} required onChange={updateUserInput}>
                <option value="" disabled selected >Select</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">P.S.T Cost<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="type" name="pst" value={userInput.pst} required onChange={updateUserInput}>
                <option value="" disabled selected >Select</option>
                <option value="true">Applied</option>
                <option value="false">Not Applied</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Text Box<span>*</span></label>
              <textarea className="form-control form-control-md form-control-dark" id="type" name="textbox" value={userInput.textbox} required onChange={updateUserInput}></textarea>
            </div>
          </div>
        </form> 
      </div>
    </div>
  )
}


export default SalesEdit;