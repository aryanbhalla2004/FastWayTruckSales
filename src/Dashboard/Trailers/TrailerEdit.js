import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from 'react-select';
import options from "../../Util/options.js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import imageCompression from 'browser-image-compression';
import Axios from "axios";


const TrailerEdit = (props) => {
  const [loading, setloading] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  })
  const history = useNavigate();
  const {id} = useParams();
  const [error, setError] = useState("");
  const [userInput, setuserInput] = useState({
    ...props.trailers.find((itm) => itm.id == id).data
  });


  const updateuserInput = (e) => {
    setuserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();

    var item = userInput;

    try{
      let userDetails = await props.edit(item, "Trailers", id);
      history('/dashboard/trailers');
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
    setuserInput(prevInput => ({
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
        <h3>Edit Trailer</h3>
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
      value={userInput.Type}
      required
      onChange={updateuserInput}
    >
      <option value="" disabled selected >Select</option>
      {options.trailerTypeList.map((e, index) => (<option id={index} value={e}>{e}</option>))}
    </select>
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Make<span>*</span></label>
    <select
      className="form-control form-control-md form-control-dark"
      id="make"
      value={userInput.Make}
      name="Make"
      onChange={updateuserInput}
      required
    >
      <option value="" disabled selected>Select</option>
      {options.trailerMakes.map((e, index) => (<option id={index} value={e}>{e}</option>))}
    </select>
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Model</label>
    <input
      className="form-control form-control-md form-control-dark"
      id="model"
      name="Model"
      value={userInput.Model}
      type="text"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Year<span>*</span></label>
    <input
      className="form-control form-control-md form-control-dark"
      id="year"
      name="Year"
      value={userInput.Year}
      type="number"
      placeholder="YYYY"
      onChange={updateuserInput}
      required
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Stock</label><input
      className="form-control form-control-md form-control-dark"
      id="stock"
      value={userInput.Stock}
      name="Stock"
      type="number"
      onChange={updateuserInput}
    />
  </div>
  </div>
  <div className="row mt-3">
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Color</label>
    <select
      className="form-control form-control-md form-control-dark"
      value={userInput.Color}
      id="color"
      name="Color"
      onChange={updateuserInput}
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
    <label className="form-label text-dark" htmlFor="c-name">No of Axles</label><input
      className="form-control form-control-md form-control-dark"
      value={userInput.NoofAxles}
      id="NoofAxles"
      name="NoofAxles"
      type="number"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Suspension</label><input
      className="form-control form-control-md form-control-dark"
      id="Suspension"
      value={userInput.Suspension}
      name="Suspension"
      type="text"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Floor</label><input
      className="form-control form-control-md form-control-dark"
      id="Floor"
      value={userInput.Floor}
      name="Floor"
      type="text"
      onChange={updateuserInput}
    />
  </div>
  </div>
  <div className="row mt-3">
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Auto Air Fill Up</label><input
      className="form-control form-control-md form-control-dark"
      id="AutoAirFillUp"
      value={userInput.AutoAirFillUp}
      name="AutoAirFillUp"
      type="text"
      onChange={updateuserInput}
    />
  </div>
  
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Tire Tread Wear</label><input
      className="form-control form-control-md form-control-dark"
      id="TireTreadWear"
      value={userInput.TireTreadWear}
      name="TireTreadWear"
      type="text"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Break Wear</label><input
      className="form-control form-control-md form-control-dark"
      id="BreakWear"
      value={userInput.BreakWear}
      name="BreakWear"
      type="text"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Length</label><input
      className="form-control form-control-md form-control-dark"
      id="Length"
      value={userInput.Length}
      name="Length"
      type="number"
      onChange={updateuserInput}
    />
  </div>
  <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Quantity</label><input
      className="form-control form-control-md form-control-dark"
      id="Quantity"
      value={userInput.Quantity}
      name="Quantity"
      type="number"
      onChange={updateuserInput}
    />
  </div>
  </div>
  <div className="row mt-3">
    <div className="col">
    <label className="form-label text-dark" htmlFor="c-name">Title</label
    ><input
      className="form-control form-control-md form-control-dark"
      id="Title"
      value={userInput.Title}
      name="Title"
      type="text"
      onChange={updateuserInput}
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
</section>
    
  <section className=" drop card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
        <div className="row">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Description<span>*</span></label>
              <textarea className="form-control form-control-md form-control-dark" id="type" name="description" value={userInput.description} required onChange={updateuserInput}></textarea>
            </div>
          </div>
          </section>
    </div>
    
  </div>
  )
}


export default TrailerEdit;