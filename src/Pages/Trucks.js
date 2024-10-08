import React, { useEffect, useState } from 'react';
import {firebase} from "../Util/Firebase"
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const Trucks = () => { 
  const [trucks, setTrucks] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredArr, setArr] = useState();
  const [filters, setFilters] = useState({
    showFilter:"",
    text:"",
    yearsF: "",
    yearsS: "",
    transmission:"",
    type:"",
    brand: "",
    AUTO:["AUTO", false],
    ISHIFT:["I-SHIFT", false],
    SPEED10:["10 SPEED", false],
    SPEED13:["13 SPEED", false],
    SPEED18:["18 SPEED", false]
  });

  useEffect(() => {
    const FetchInfo = async () => {
      const cityRef = firebase.firestore().collection('Trucks');
      cityRef.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          let info = doc.data();
          let id = doc.id;
          items.push({...info, id});  
        });
        setTrucks(items);
        setLoading(false)
      });
    }
    FetchInfo();

    
  }, [])

  useEffect(() => {
    //props.setPage("home");
    window.scrollTo(0, 0)
  }, []);

  

  const changeFilter = (e) => {
    setFilters({
      ...filters, [e.target.name] : e.target.value
    })
  }

  const changeTrans = (e) => {
    setFilters({
      ...filters, [e.target.name] : [e.target.value, e.target.checked]
    })
  }

  const filter = (e) => {
    e.preventDefault();
    var ite = trucks;
    if (filters.text != ""){
      ite = trucks.filter(
        item => item.Title.toLowerCase().includes(filters.text.toLowerCase()) 
        || item.Stock === parseInt(filters.text)
      );
    }
    if (filters.type != ""){
        ite = ite.filter(item => item.TruckType === filters.type);
    }
    if (filters.brand != ""){
        ite = ite.filter(item => item.TruckMake === filters.brand);
    }
    if (filters.yearsF != ""){
      ite = ite.filter(item => (parseInt(filters.yearsF) <= parseInt(item.Year)) );
    }
    if (filters.yearsS != ""){
      ite = ite.filter(item => (parseInt(filters.yearsS) >= parseInt(item.Year)) );
    }
     
    if (filters.AUTO[1] || filters.ISHIFT[1]  || filters.SPEED10[1] || filters.SPEED13[1] ||filters.SPEED18[1]  ){
    ite = ite.filter(
      item => 
      (item.Transmission === filters.AUTO[0] && filters.AUTO[1] )
      || (item.Transmission === filters.ISHIFT[0]  && filters.ISHIFT[1] )
      || (item.Transmission === filters.SPEED10[0] && filters.SPEED10[1] )
      || (item.Transmission === filters.SPEED13[0]  && filters.SPEED13[1])
      || (item.Transmission === filters.SPEED18[0]  && filters.SPEED18[1]  )
      );
      }
      console.log("ran");
      setArr(ite);
      console.log(ite);
      setFilters({
        ...filters, showFilter: true
      })
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Trucks | Fastway Truck Sales</title>
      </Helmet>
      <PageTitle name="Trucks"/>
      <div className=" trucks-container flex fl-center services-container">
        <div className="content-widthfix filter-truck flex">
        <div className='filter-left flex'>
            <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="text" name="text" onChange={changeFilter} type="text" placeholder="What are you looking for?" required=""/>
            <select className="form-control filter-inputs-fields form-control-md form-control-dark" id="type" name="type" onChange={changeFilter} required="" >
              <option value="">Vehicle Type</option>
              <option value="DAYCAB">DAYCAB</option>
        <option value="HIGHWAY">HIGHWAY</option>
        <option value="DUMP TRUCK">DUMP TRUCK</option>
            </select>
            <select className="form-control filter-inputs-fields  form-control-md form-control-dark" id="brand" name="brand" onChange={changeFilter} required="">
              <option value="" disabled selected>Truck brand and model</option>
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
            <div className='selection-filter-single'>
              <h2>Years</h2>
              <div className='flex fl-center year-max fl-space-between'>
                <input className="form-control form-control-md form-control-dark" id="name" name="yearsF" type="number" placeholder="From" onChange={changeFilter} required=""/>
                <h3><i className="bi bi-dash-lg"></i></h3>
                <input className="form-control form-control-md form-control-dark" id="name" name="yearsS" type="number" placeholder="To" onChange={changeFilter} required=""/>
              </div>
            </div>
            <div className='selection-filter-single'>
              <h2>Transmission</h2>
              <ul className="tags-nav">
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox'  name="AUTO" value="AUTO" onChange={changeTrans} />
                      <span class='indicator'></span>
                      AUTO
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' name="ISHIFT" value="I-SHIFT" onChange={changeTrans}/>
                      <span class='indicator' ></span>
                      I-SHIFT
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' name="SPEED10"  value="10 SPEED" onChange={changeTrans}/>
                      <span class='indicator' ></span>
                      10 SPEED
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' name="SPEED13" value="13 SPEED" onChange={changeTrans}/>
                      <span class='indicator' ></span>
                      13 SPEED
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' name="SPEED18" value="18 SPEED" onChange={changeTrans}/>
                      <span class='indicator'  ></span>
                      18 SPEED
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <button onClick={filter} className='search-button-filter btn-general primary-btn'><i className="bi bi-search"></i> Search</button>
            <a className='reset-filter'><i className="bi bi-arrow-clockwise"></i> Reset Filter</a>
          </div>
          <div className='shop-items'>
            <div className='item-filter-top flex fl-center fl-space-between'>
              <i className="bi bi-arrow-return-left"></i>
              <span>Showing <b>&nbsp;{!loading ? trucks.length > 0 ? !filters.showFilter ? trucks.length : filteredArr.length : "0" : "0"}&nbsp;</b> results</span>
              <i className="bi bi-arrow-return-right"></i>
            </div>
            <ul className='listing-of-items flex fl-center fl-space-between'>
              {!loading && !filters.showFilter && (trucks.length > 0 ? trucks.map((item, index) => (
                <li className='single-item flex fl-col' key={index}>
                <div className="item-image" style={{backgroundImage: `url(${item.images.one})`}}>
                  <span className='new-item'>For Sale</span>
                </div>
                <div className='single-item-info flex fl-col'>
                  <span className='stock-num'>Stock #{item.Stock} | <b>Year: {item.Year}</b></span>
                  <h2>{item.Title}</h2>
                  <p>{item.description}</p>
                  <ul className='flex'>
                    <li><i className="bi bi-speedometer"></i> {item.Mileage} KMs</li>
                    <li><i className="bi bi-gear-wide"></i> {item.Transmission}</li>
                  </ul>
                </div>
                <Link to={`/truck-detail/${item.id}`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
              </li> 
              )) : <div className='centering-messages'><p>No Results Found Please try again later</p></div>)}
              {loading && <div className='centering-messages'><div class="spinner-border" role="status"></div><p>Loading</p></div>}


              {!loading && filters.showFilter && (filteredArr.length > 0 ? filteredArr.map((item, index) => (
                <li className='single-item flex fl-col' key={index}>
                <div className="item-image" style={{backgroundImage: `url(${item.images.one})`}}>
                  <span className='new-item'>For Sale</span>
                </div>
                <div className='single-item-info flex fl-col'>
                  <span className='stock-num'>Stock #{item.Stock} | <b>Year: {item.Year}</b></span>
                  <h2>{item.Title}</h2>
                  <p>{item.description}</p>
                  <ul className='flex'>
                    <li><i className="bi bi-speedometer"></i> {item.Mileage} KMs</li>
                    <li><i className="bi bi-gear-wide"></i> {item.Transmission}</li>
                  </ul>
                </div>
                <Link to={`/truck-detail/${item.id}`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
              </li> 
              )) : <div className='centering-messages'><p>No Results Found Please try again later</p></div>)}
              {loading && <div className='centering-messages'><div class="spinner-border" role="status"></div><p>Loading</p></div>}
          
            </ul>
          </div>
          
        </div>
      </div>
    </motion.div>
  )
}

export default Trucks;