import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import TruckOptions from "../../Util/options.js"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const TruckAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    Stock:"",
    TruckType:"",
    TruckMake:"",
    Model:"",
    Year:"",
    Mileage:"",
    Vin:"",
    Color:"",
    Engine:"",
    Transmission:"",
    Ratio:"",
    WheelBase:"",
    Sleeper:"",
    amenities:[],
    description:"",
    Title:"",
    Date: new Date().toLocaleDateString("en-US"),
    Quantity:""
  });
  const [editor, setEditor] = useState([]);
  const [amen, setAmen] = useState([]);

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(editor);
    var item = userInput;
    item.description = editor;
    item.amenities = amen;
    try{
      let userDetails = await props.add("Trucks",item);
      history('/dashboard/trucks');
    }
    catch(e){
      setError(e.message);
    }
  }
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Create New Truck</h3>
          <Link to="/dashboard/trucks" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
  <div className="row form-row">
  <h2 className="h4 mb-4">Truck Details</h2>
  
  <button type="submit" onClick={onSubmit}className="btn-general primary-btn blue mb-4" href="/dashboard/trucks"> Submit</button>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Type<span>*</span></label
      ><select
        className="form-control form-control-md form-control-dark"
        id="type"
        name="TruckType"
        required
        onChange={updateUserInput}
      >
        <option value="" disabled selected >Select</option>
        <option value="DAYCAB">DAYCAB</option>
        <option value="HIGHWAY">HIGHWAY</option>
        <option value="DUMP TRUCK">DUMP TRUCK</option>
      </select>
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label
      ><select
        className="form-control form-control-md form-control-dark"
        id="make"
        name="TruckMake"
        onChange={updateUserInput}
        required
      >
        <option value="" disabled selected>Select</option>
        <option value="FORD">FORD</option>
        <option value="FREIGHTLINER">FREIGHTLINER</option>
        <option value="HINO">HINO</option>
        <option value="INTERNATIONAL">INTERNATIONAL</option>
        <option value="KENWORTH">KENWORTH</option>
        <option value="MACK">MACK</option>
        <option value="OTTAWA">OTTAWA</option>
        <option value="PETERBILT">PETERBILT</option>
        <option value="STERLING">STERLING</option>
        <option value="VOLVO">VOLVO</option>
        <option value="WESTERN STAR">WESTERN STAR</option>
        <option value="WHITE">WHITE</option>
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
      <label className="form-label text-dark" htmlFor="c-name">Stock</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="model"
        name="Stock"
        type="number"
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
      <label className="form-label text-dark" htmlFor="c-name">VIN</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="vin"
        name="Vin"
        type="text"
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
      <label className="form-label text-dark" htmlFor="c-name">Engine</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="engine"
        name="Engine"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Transmission</label
      ><select
        className="form-control form-control-md form-control-dark"
        id="transmission"
        name="Transmission"
        onChange={updateUserInput}
      >
        <option value="" disabled selected>Select</option>
        <option value="I-SHIFT">I-SHIFT</option>
        <option value="AUTO">AUTO</option>
        <option value="10 SPEED">10 SPEED</option>
        <option value="13 SPEED">13 SPEED</option>
        <option value="18 SPEED">18 SPEED</option>
      </select>
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Ratio</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="ratio"
        name="Ratio"
        type="text"
        onChange={updateUserInput}
      />
    </div>
  </div>
  <div className="row mt-3">
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Wheelbase</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="wheelbase"
        name="WheelBase"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Sleeper</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="sleeper"
        name="Sleeper"
        type="text"
        onChange={updateUserInput}
      />
    </div>
    <div className="col">
      <div className="row">
        <div className="col-lg-8">
          <label className="form-label text-dark" htmlFor="c-name"
            >Mileage (KM)<span>*</span></label
          >
        </div>
        <div className="col-lg-4 text-end">
          <i
            className="fi-alert-circle"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Only Numeric values are allowed"
            aria-label="Only Numeric values are allowed"
          ></i>
        </div>
      </div>
      <input
        className="form-control form-control-md form-control-dark"
        id="mileage"
        name="Mileage"
        type="number"
        onChange={updateUserInput}
        required
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
    <div className="row mt-3">
      <div className="col">
      <p className="form-label text-dark">Amenties</p>
    <Select
        onChange={setAmen}
        options={TruckOptions}
        isMulti
        isSearchable
      />
      
    </div>
  </div>
</form>
<section className=" drop card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">

  <div className='dropzone'>
  <div className="dz-message">
       <h4 className="my-4">Drop files here or click to upload.</h4>                         
       </div>
  </div>
</section>
      
          <Editor
          onChange={setEditor}
          wrapperClassName="editor drop card card-light card-body border-0 shadow-sm p-4 mt-5"
          editorClassName="border-2 shadow-sm"
          toolbarClassName="border-2 shadow-sm"
        />
      </div>
      
    </div>
  )
}


export default TruckAdd;