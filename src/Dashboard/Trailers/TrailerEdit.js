import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from 'react-select';
import options from "../../Util/options.js"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TrailerEdit = (props) => {
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
      let userDetails = await props.props.edit(item, "Trailers", id);
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
      <section className=" drop card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
      <div className='dropzone'>
        <div className="dz-message">
        <h4 className="my-4">Drop files here or click to upload.</h4>  
        <input type="file"/>                      
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