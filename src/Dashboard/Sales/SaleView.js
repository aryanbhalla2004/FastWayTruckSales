import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
import { renderToString } from "react-dom/server";
import "./Sales.css";
import logo from "../../Util/Images/logo.jpg";
import { print } from '../../Util/htmlFile';

const SaleView = () => {
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    firebase.firestore().collection('Sales').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });
  }

  const getTotal = (gst, pst) => {
    //! total value before taxes (product + warranty + admin fee)
    let totalValue = listing && (parseInt(listing.amm) + parseInt(listing.warranty) + listing.adminFee);
    //! Total GST tax on total value
    let gstCost = parseInt(totalValue) * 0.05;
    //! Total PST tax on total value
    let pstCost =  parseInt(totalValue) * 0.07;

    if(gst)
      totalValue += gstCost

    if(pst && listing.pst === "true")
      totalValue += pstCost

    return totalValue.toFixed(2);
  }

  const getGst = () => {
    let totalValue = listing && (parseInt(listing.amm) + parseInt(listing.warranty) + listing.adminFee);

    return totalValue * 0.05
  }

  const getPst = () => {
    let totalValue = listing && (parseInt(listing.amm) + parseInt(listing.warranty) + listing.adminFee);

    return totalValue * 0.07
  }

  const GenerateFile = () => {
    setLoading(true);
    print()
    setLoading(false);
  }
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Sale</h3>
          <div className='d-flex'>
            <Link to="/dashboard/sales/" className="btn-general primary-btn mr-3"><i class="bi bi-arrow-left"></i> Back</Link>
            <Link to={`/dashboard/sales/edit/${id}`} className="btn-general mr-3">Edit <i class="bi bi-binoculars"></i> </Link>
            <button className="btn-general edit-button" onClick={GenerateFile}>{loading ? <div class="spinner-border text-light" role="status"></div> : <><i class="bi bi-file-arrow-down"></i>  Download</>}</button>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 pdf-file-download" id="basic-info ">
          <div class="header-continer">
            <div class="content-sizing header-content-wrapper">
              <div class="company-info-top-left">
                <p><i class="bi bi-geo-alt"></i> 2095 Logan Ave Winnipeg, MB R2R 0J1</p>
                <p><i class="bi bi-telephone"></i> 204-615-1000</p>
                <p><i class="bi bi-envelope"></i>mb@fastwaytruck.com</p>
                <p><i class="bi bi-globe"></i> www.fastwaytrucksales.com</p>
              </div>
              <img src={logo} width="120" className='logo-box'/>  
              <div className="dealer-invo">
                <h2>Dealer No: <span>5661</span></h2>
              <h2>Invoice No: <span>{listing && listing.invoice}</span></h2>
              </div>
            </div>
          </div>
          <div class="header-title-info">
            <p className='pdf-edit-title-small'>RETAIL PURCHASER'S VEHICLE ORDER AND AGREEMENT (BILL OF SALE)</p>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing custer-info-wrapper">
              <ul className='dropdown-pdf light-padding'>
                <li>
                  <h3 className='pdf-edit-title'>Date:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.date}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>I/We:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.iwe}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Phone Number:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.phone}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Address:</h3>
                  <span className='pdf-edit-title'>{listing && listing.address} {listing && listing.city} {listing && listing.state} {listing && listing.pCode}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Email Address (end customer):</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.email}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Re:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.re}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="custer-vehcial-info">
            <div class="content-sizing custer-vehcial-wrapper">
              <ul className='light-padding'>
                <li>
                  <h3 className='pdf-edit-title'>Year:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.year}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Make:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.make}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Model:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.model}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Odometer reading:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.oReading} KM</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Color:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.color}</span>
                </li>
                <li>
                  <h3 className='pdf-edit-title'>Stock:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.stock}</span>
                </li>
              </ul>
              <ul class="col-2-flex-fix light-padding">
                <li class="col-half flex-fix">
                  <div className=''>
                    <h3 className='pdf-edit-title'>Serial Number:</h3>
                    <span className='pdf-edit-title-small'>{listing && listing.serialNum}</span>
                  </div>
                  <div className='col-half'>
                    <h3 className='pdf-edit-title'>Reefer  Serial Number:</h3>
                    <span className='pdf-edit-title-small'>{listing && listing.Vin}</span>
                  </div>
                </li>
                <li class="col-half">
                  <h3 className='pdf-edit-title'>Salerep:</h3>
                  <span className='pdf-edit-title-small'>{listing && listing.salesRep}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-bill-of-sale-info">
            <div class="content-sizing content-bill-of-sale-wrapper">
              <div class="left-side-info">
                <div>
                  <p className='pdf-edit-title-small'>SOLD AS EQUIPPED AT TIME OF DELIVERY, PLUS:</p>
                  <h4 className='mt-4'>{listing && listing.textbox}</h4>
                </div>
                <div class="signature-field-bottom">
                  <div class="content-sizing signature-field-wrapper">
                    <ul>
                      <li className='light-pd'>
                        <div class="container-space">
                          <div class="sigature-box">
                            <h4 className='pdf-edit-title-small'>signature of Purchaser</h4>
                          </div>
                          <div class="sigature-box">
                            <h4 className='pdf-edit-title-small'>co-signer (if any)</h4>
                          </div>
                        </div>
                      </li>
                      <li className='light-pd'>
                        <div class="container-space">
                          <div class="sigature-box">
                            <h4 className='pdf-edit-title-small'>signature of Manager</h4>
                          </div>
                          <div class="sigature-box">
                            <h4 class="col-half pdf-edit-title-small">Date</h4>
                            <h4 class="col-half pdf-edit-title-small">Title</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <div class="right-side-sale">
              <div class="spacing-top-bottom">
                <ul class="total-price">
                  <li>
                    <h3 className='pdf-edit-title-small'>Vehicle Price:</h3>
                    <span  className='pdf-edit-title'>$ {listing && parseInt(listing.amm).toFixed(2)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Warranty Price</h3>
                    <span  className='pdf-edit-title'>$ {listing && parseInt(listing.warranty).toFixed(2)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Total Price of Vehicle</h3>
                    <span  className='pdf-edit-title'>$ {listing && (parseInt(listing && listing.amm) + parseInt(listing && listing.warranty)).toFixed(2)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Admin. Fee:</h3>
                    <span  className='pdf-edit-title'>$ {listing && listing.adminFee.toFixed(2)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>G.S.T #(789007747RT0001):</h3>
                    <span  className='pdf-edit-title'>$ {listing && getGst().toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              <div class="difference">
                <h4 className='pdf-edit-title'>Difference  (exc. GST)</h4>
                <ul class="total-price">
                  <li>
                    <h3 className='pdf-edit-title-small'>Sub-total (Including GST):</h3>
                     <span className='pdf-edit-title'>$ {listing && getTotal(true, false)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>P.S.T (PST# 139101-0):</h3>
                    <span className='pdf-edit-title'>$ {listing && listing.pst === "true" ? getPst().toFixed(2) : "0.00"}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Sub-Total (incl GST+PST):</h3>
                    <span className='pdf-edit-title'>$ {listing && getTotal(true, true)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Deposit:</h3>
                    <span className='pdf-edit-title'>$ {listing && parseInt(listing.deposit).toFixed(2)}</span>
                  </li>
                  <li>
                    <h3 className='pdf-edit-title-small'>Balance:</h3>
                    <span className='pdf-edit-title'>$ {listing && (getTotal(true, true) - parseInt(listing.deposit)).toFixed(2)}</span>
                  </li>
                  <li>
                    <h2 className='pdf-edit-title'>Total:</h2>
                    <span className='pdf-edit-title'>$ {listing && getTotal(true, true)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}


export default SaleView;