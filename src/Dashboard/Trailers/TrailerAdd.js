import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import options from "../../Util/options.js"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const TrailerAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    Type:"",
    Make:"",
    Model:"",
    Year:"",
    Stock:"",
    Color:"",
    Length:"",
    NoofAxles:"",
    Suspension:"",
    Floor:"",
    AutoAirFillUp:"",
    TireTreadWear:"",
    BreakWear:"",
    description: "",
    Title:"",
    Date: new Date().toLocaleDateString("en-US"),
    Quantity:""
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
      let userDetails = await props.add("Trailers",item);
      history('/dashboard/trailers');
    }
    catch(e){
      setError(e.message);
    }
  }
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Create New Trailer</h3>
          <Link to="/dashboard/trailers" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
  <div className="row form-row">
  <h2 className="h4 mb-4">Trailer Details</h2>
  
  <button type="submit" className="btn-general primary-btn blue mb-4" > Submit</button>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Type<span>*</span></label
      ><select
        className="form-control form-control-md form-control-dark"
        id="type"
        name="Type"
        required
        onChange={updateUserInput}
      >
        <option value="" disabled selected >Select</option>
        {options.trailerTypeList.map((e, index) => (<option id={index} value={e}>{e}</option>))}
      </select>
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label
      ><select
        className="form-control form-control-md form-control-dark"
        id="make"
        name="Make"
        onChange={updateUserInput}
        required
      >
        <option value="" disabled selected>Select</option>
        {options.trailerMakes.map((e, index) => (<option id={index} value={e}>{e}</option>))}
      </select>
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Model</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="model"
        name="Model"
        type="text"
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
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Stock</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="stock"
        name="Stock"
        type="number"
        onChange={updateUserInput}
      />
    </div>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Color</label
      ><select
        className="form-control form-control-md form-control-dark"
        id="color"
        name="Color"
        onChange={updateUserInput}
      >
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
      </select>
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">No of Axles</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="NoofAxles"
        name="NoofAxles"
        type="number"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Suspension</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Suspension"
        name="Suspension"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Floor</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Floor"
        name="Floor"
        type="text"
        onChange={updateUserInput}
      />
    </div>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Auto Air Fill Up</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="AutoAirFillUp"
        name="AutoAirFillUp"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Tire Tread Wear</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="TireTreadWear"
        name="TireTreadWear"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Break Wear</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="BreakWear"
        name="BreakWear"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Length</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Length"
        name="Length"
        type="number"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Quantity</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Quantity"
        name="Quantity"
        type="number"
        onChange={updateUserInput}
      />
    </div>
    </div>
    <div className="row mt-3">
      <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Title</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Title"
        name="Title"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    </div>
    
</form>
<section className=" shadow-sm p-4 mt-5 grid-fix-pic" id="basic-info">

        <div className="dz-message">     
            <input type="file"/>                           
            </div>


        <div className="dz-message">     
            <input type="file"/>                           
            </div>


        <div className="dz-message">     
            <input type="file"/>                           
            </div>


        <div className="dz-message">     
            <input type="file"/>                           
            </div>


        <div className="dz-message">     
            <input type="file"/>                           
            </div>

      </section>
      
<section className=" drop card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
        <div className="row">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Description<span>*</span></label>
              <textarea className="form-control form-control-md form-control-dark" id="type" name="description" required onChange={updateUserInput}></textarea>
            </div>
          </div>
          </section>
      </div>
      
    </div>
  )
}


export default TrailerAdd;