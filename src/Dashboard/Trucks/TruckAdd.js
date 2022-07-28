import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import truc from "../../Util/options.js"
import imageCompression from 'browser-image-compression';
import Axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const TruckAdd = (props) => {
  const [loading, setloading] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    fifth: false,
  })
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
    SleeperBed: "",
    amenities:[],
    Price: "",
    BreakSystem: '',
    images: {one: '', two: '', three: '', four: '', fifth: ''},
    description:"",
    Title:"",
    Hp: '',
    FrontAxle: '',
    RearAxle: '',
    Suspension: '',
    FrontTSize: '',
    RearTSize: '',
    RearRims: '',
    FrontRims: '',
    FuelTankSize: '',
    FifthWheel: '',
    Date: new Date().toLocaleDateString("en-US"),
  });
  const [amen, setAmen] = useState([]);

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    var item = userInput;
    item.amenities = amen;
    try{
      let userDetails = await props.add("Trucks",item);
      history('/dashboard/trucks');
    }
    catch(e){
      setError(e.message);
    }
  }

  const handleImageUpload = async (event, location) => {
    setloading(prevInput => ({
      ...prevInput, [location]: true
    }));
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  
    const options = {
      maxSizeMB: 1,
      useWebWorker: false,
      onProgress: progressUploadingImage,       
      maxIteration: 18,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      await uploadToServer(compressedFile, location);
    } catch (error) {
      console.log(error);
    }
  
  }

  const uploadToServer = async (compressedFile, location) => {
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', 'pvwvpf90');
    Axios.post("https://api.cloudinary.com/v1_1/dgjfoz5o1/image/upload", formData
    ).then(async (response) => await showUploadedImage(response, location));
  }

  const showUploadedImage = (response, location) => {
    console.log(response);
    setUserInput(prevInput => ({
      ...prevInput, images: {...userInput.images, [location]: response.data.secure_url}
    }));

    setloading(prevInput => ({
      ...prevInput, [location]: false
    }));
  }

  const progressUploadingImage = (progress) => {
    console.log(progress);

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
      <label className="form-label text-dark" htmlFor="c-name">Transmission</label>
      <select
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
      <label className="form-label text-dark" htmlFor="c-name">Sleeper Bed</label
      >
      <select
        className="form-control form-control-md form-control-dark"
        id="SleeperBed"
        name="SleeperBed"
        onChange={updateUserInput}
      >
        <option value="" disabled selected>Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
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
      <label className="form-label text-dark" htmlFor="c-name">Break System</label
      >
      <select
        className="form-control form-control-md form-control-dark"
        id="BreakSystem"
        name="BreakSystem"
        onChange={updateUserInput}
      >
        <option value="" disabled selected>Select</option>
        <option value="Drum Break">Drum Break</option>
        <option value="Disk Break">Disk Break</option>
      </select>
    </div>
    </div>


    <div className="row mt-3">
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">HP</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="Hp"
          name="Hp"
          type="text"
          onChange={updateUserInput}
        />
      </div>
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Front Axle</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="FrontAxle"
          name="FrontAxle"
          type="text"
          onChange={updateUserInput}
        />
      </div>
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Rear Axle</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="RearAxle"
          name="RearAxle"
          type="text"
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
    </div>

    <div className="row mt-3">
    <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Front Tire Size </label
        ><input
          className="form-control form-control-md form-control-dark"
          id="FrontTSize"
          name="FrontTSize"
          type="text"
          onChange={updateUserInput}
        />
      </div>
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Front Rims</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="FrontRims"
          name="FrontRims"
          type="text"
          onChange={updateUserInput}
        />
      </div>
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Rear Tire Size</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="RearTSize"
          name="RearTSize"
          type="text"
          onChange={updateUserInput}
        />
      </div>
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Rear Rims</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="RearRims"
          name="RearRims"
          type="text"
          onChange={updateUserInput}
        />
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Fuel Tank Size</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="FuelTankSize"
          name="FuelTankSize"
          type="text"
          onChange={updateUserInput}
        />
      </div>

      <div className="col">
        <label className="form-label text-dark" htmlFor="c-name">Fifth Wheel</label
        ><input
          className="form-control form-control-md form-control-dark"
          id="FifthWheel"
          name="FifthWheel"
          type="text"
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
    <div className="col">
      <label className="form-label text-dark" htmlFor="c-name">Price</label
      ><input
        className="form-control form-control-md form-control-dark"
        id="Title"
        name="Price"
        type="number"
        onChange={updateUserInput}
      />
    </div>
    </div>
    <div className="row mt-3">
      <div className="col">
      <p className="form-label text-dark">Amenties</p>
    <Select
        onChange={setAmen}
        options={truc.TruckOptions}
        isMulti
        isSearchable
      />
      
    </div>
  </div>
</form>
      <section className=" shadow-sm p-4 mt-5 grid-fix-pic" id="basic-info">

        <div className="dz-message" style={{backgroundImage: `url(${userInput.images && userInput.images.one})`}}> 
          <div>   
            {!loading.one ? <input type="file" onChange={(e) => handleImageUpload(e, "one")}/> : <div class="spinner-border text-light" role="status"></div>}
          </div>                   
        </div>


        <div className="dz-message" style={{backgroundImage: `url(${userInput.images && userInput.images.two})`}}>     
          <div>   
          {!loading.two ? <input type="file" onChange={(e) => handleImageUpload(e, "two")}/> : <div class="spinner-border text-light" role="status"></div>}
          </div>                             
        </div>


        <div className="dz-message" style={{backgroundImage: `url(${userInput.images && userInput.images.three})`}}>     
          <div>  
          {!loading.three ? <input type="file" onChange={(e) => handleImageUpload(e, "three")}/> : <div class="spinner-border text-light" role="status"></div>}        
          </div>                 
        </div>


        <div className="dz-message" style={{backgroundImage: `url(${userInput.images && userInput.images.four})`}}>     
          <div>  
          {!loading.four ? <input type="file" onChange={(e) => handleImageUpload(e, "four")}/>   : <div class="spinner-border text-light" role="status"></div>}    
          </div>                        
        </div>

        <div className="dz-message" style={{backgroundImage: `url(${userInput.images && userInput.images.fifth})`}}>     
          <div>  
          {!loading.fifth ? <input type="file" onChange={(e) => handleImageUpload(e, "fifth")}/>   : <div class="spinner-border text-light" role="status"></div>}    
          </div>                        
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


export default TruckAdd;