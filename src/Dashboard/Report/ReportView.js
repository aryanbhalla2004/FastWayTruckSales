import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../Util/Firebase";
import { renderToString } from "react-dom/server";
import "../Sales/Sales.css";
import logo from "../../Util/Images/billofsale.jpg";
import { printReport } from '../../Util/htmlFile';
import "./style.css"
import moment from 'moment';
const ReportView = (props) => {
  const currentDate = moment();
  const [generatedItem, setGeneratedItem] = useState([]);
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  useEffect(() => {
    filterData(props.SalesPost);
  }, [props.SalesPost]);

  const filterData = (data) => {
    let temp = [];
    for(let i = 0; i < data.length; i++) {
      temp.push({serial: data[i].data.serialNum, iwe: data[i].data.iwe, sale: data[i].data.amm, purchase: data[i].data.purchasePrice, date: data[i].data.date});
    }

    setSales(temp);
  }
  
  const [userInput, setUserInput] = useState({
    start: "",
    end: "",
  });

  const GenerateFile = () => {
    setLoading(true);
    printReport();
    setLoading(false);
  }

  const renderFormattedDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const generateReport = () => {
    setIsGenerating(true);
    if(userInput.start != "" && userInput.end != "") {
      const temp = sales.filter(item => item.date >= userInput.start && item.date <= userInput.end);
      setGeneratedItem(temp);
      setGenerated(true);
    } else {
      console.log("error")
    }

    setIsGenerating(false);
  }
  
  const reset = () => {
    setGenerated(false);
    setGeneratedItem([]);
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Sales Report</h3>
          {generated && <div className=''>
            <h3>Report for: ({userInput.start} to {userInput.end})</h3>
          </div>}
          <div style={{display: 'flex', gap: 10}}>
            {generated && <button className="btn-general primary-btn" onClick={reset}>{loading ? <div class="spinner-border text-light" role="status"></div> : <>New Report</>}</button>}
            {generated && <button className="btn-general edit-button" onClick={GenerateFile}>{loading ? <div class="spinner-border text-light" role="status"></div> : <><i class="bi bi-file-arrow-down"></i>  Download</>}</button>}
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response pdf-report-download" id="basic-info">
          <table className='activity-table bill-table report-table'>
            <thead>
              <th className='font-size-small'>Sale Date</th>
              <th className='font-size-small'>Customer</th>
              <th className='font-size-small'>Purchase Amount</th>
              <th className='font-size-small'>Sale Amount</th>
              <th className='font-size-small'>Serial</th>
            </thead>
            <tbody>
              {generated && !loading && (generatedItem && generatedItem.map((item, index) => (
                <tr key={index}>
                  <td className='font-size-small'>
                    {renderFormattedDate(item.date)}
                  </td>
                  <td className='font-size-small'><span>{item.iwe}</span></td>
                  <td className='font-size-small'>{item.purchasePrice === undefined ? "N/A" : "$" + item && parseInt(item.purchasePrice).toFixed(2)}</td>
                  <td className='font-size-small'>${item && parseInt(item.sale).toFixed(2)}</td>
                  <td className='font-size-small'>{item.serial === "" ? "N/A" : item.serial}</td>
                  {/* <td>
                    {item.status === "Pending" && <div className='new-item'>Pending</div>}  
                    {item.status === "Done" && <div className='old-item'>Done</div>}
                    {item.status === "" && <div className='old-item'>N/A</div>}
                  </td>
                  <td>{item.date}</td> */}
                </tr>
              )))}
            </tbody>
            {!loading && sales != undefined && sales.length <= 0 && 
              <div className='centering-messages mt-5'>
                <h4>No Items Found</h4>
                <p>It seems we don't have any inventory in the system</p>
                <Link className="btn-general primary-btn mt-3" to="/">Add Product</Link>
              </div>
            }
            {!generated && 
              <div className='centering-messages mt-5'>
                <h1>Generate a Report</h1>
                <p>Start by selection a date range for generating a report</p>
                <div className='generate-form'>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">Start Date<span></span></label>
                    <input className="form-control form-control-md form-control-dark" id="start" name="start" type="date" value={userInput.start} onChange={updateUserInput}  max={moment().format("YYYY-MM-DD")}/>
                  </div>
                  <div className="col">
                    <label className="form-label text-dark" htmlFor="c-name">End Date<span></span></label>
                    <input className="form-control form-control-md form-control-dark" id="end" name="end" type="date" value={userInput.end} onChange={updateUserInput} min={userInput.start} max={moment().format("YYYY-MM-DD")}/>
                  </div>
                </div>
                {/* <div className='divider'>
                  <div className='line'></div>
                  <p>or</p>
                  <div className='line'></div>
                </div> */}
                <button className="btn-general primary-btn mt-3" onClick={generateReport} disabled={isGenerating}>{isGenerating ? <div class="spinner-border text-light" role="status"></div> : <> Generate</>}</button>
              </div>
            }

            {loading && <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
          </table>
        </section>
      </div>
    </div>
  )
}


export default ReportView;