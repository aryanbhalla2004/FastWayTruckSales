import React, { useEffect, useState } from 'react';
import {firebase} from "../Util/Firebase"
import { PageTitle } from '../Components/page-header';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';


export const Trailers = () => {
  const [trailers, setTrailers] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const FetchInfo = async () => {
      const cityRef = firebase.firestore().collection('Trailers');
      cityRef.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          let info = doc.data();
          let id = doc.id;
          items.push({...info, id});  
        });
        setTrailers(items);
        setLoading(false)
      });
    }
    FetchInfo();

    
  }, [])

  useEffect(() => {
    //props.setPage("home");
    window.scrollTo(0, 0)
  }, []);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Helmet>
        <title>Trailers | Fastway Trucking</title>
      </Helmet>
      <PageTitle name="Trailers"/>
      <div className=" trucks-container flex fl-center services-container">
        <div className="content-widthfix flex">
          <div className='filter-left flex'>
            <input className="form-control filter-inputs-fields form-control-md form-control-dark" id="name" name="name" type="text" placeholder="What are you looking for?" required=""/>
            <select className="form-control filter-inputs-fields form-control-md form-control-dark" id="type" name="type" required="" >
              <option value="">Trailer Make</option>
              <option value="1">DAYCAB</option>
              <option value="2">HIGHWAY</option>
              <option value="3">DUMP TRUCK</option>
            </select>
            <div className='selection-filter-single'>
              <h2>Years</h2>
              <div className='flex fl-center year-max fl-space-between'>
                <input className="form-control form-control-md form-control-dark" id="name" name="name" type="number" placeholder="From" required=""/>
                <h3><i className="bi bi-dash-lg"></i></h3>
                <input className="form-control form-control-md form-control-dark" id="name" name="name" type="number" placeholder="To" required=""/>
              </div>
            </div>
            <div className='selection-filter-single'>
              <h2>Types of Trailers</h2>
              <ul className="tags-nav">
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      B-Train
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Bulk
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Car Carrier
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Cargo Trailer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Containers/Storage
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Curtain Side
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Dolley trailer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Drop Deck
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Dry Van
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Dump
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Enclosed
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Flat
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Floats
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Goose neck
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Grain
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Heavy Equipment
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Highboy
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Hopper
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Horse
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Live Floor
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Living Quarters
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Live Stock
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Logging & Forestry
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Lowboy
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      OTHER Specialty Trailer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Reefer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Roll-off
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Tag Trailer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Tandem Axle
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Tanker Trailer
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Tiltbed
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Heater
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Tri-Axle
                    </label>
                  </div>
                </li>
                <li>
                  <div class='checkboxes'>
                    <label class='checkbox'>
                      <input type='checkbox' />
                      <span class='indicator'></span>
                      Quad-Axle
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <a className='search-button-filter btn-general primary-btn'><i className="bi bi-search"></i> Search</a>
            <a className='reset-filter'><i className="bi bi-arrow-clockwise"></i> Reset Filter</a>
          </div>
          <div className='shop-items'>
            <div className='item-filter-top flex fl-center fl-space-between'>
              <i className="bi bi-arrow-return-left"></i>
              <span>Showing <b>&nbsp;{!loading ? trailers.length > 0 ? trailers.length : "0" : "0"}&nbsp;</b> results</span>
              <i className="bi bi-arrow-return-right"></i>
            </div>
            <ul className='listing-of-items flex fl-center fl-space-between'>
            {!loading && (trailers.length > 0 ? trailers.map((item, index) => (
                <li className='single-item flex fl-col' key={index}>
                <div className="item-image" style={{backgroundImage: `url(${item.images.one})`}}>
                  <span className='new-item'>For Sale</span>
                </div>
                <div className='single-item-info flex fl-col'>
                  <span className='stock-num'>Stock #{item.Stock} | <b>Year: {item.Year}</b></span>
                  <h2>{item.Title}</h2>
                  <p>{item.description}</p>
                  
                </div>
                <Link to={`/trailers-detail/${item.id}`} className='view-truck-button flex fl-space-between'>View Details <i className="bi bi-arrow-right"></i></Link>
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

export default Trailers;