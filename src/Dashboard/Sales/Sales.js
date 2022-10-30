import React, {useState, useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { firebase } from '../../Util/Firebase';
export const Sales = (props) => {
  const [setDeleteBox, setDeleteId] = useOutletContext();
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    
    fetch();
  }, []);

  const fetch = async () => {
    const cityRef = firebase.firestore().collection("Sales");
    cityRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        let info = doc.data();
        let id = doc.id;
        items.push({...info, id});  
      });
      setSales(items)
      setLoading(false);
    });
  }

  const updateUserInput = (e) => {
    setSearch(e.target.value);
  }

  //! Add exiting companies from bill of sales
  const addAllComapanies = async () => {
    const tempArray = []
    for(let i = 0; i < sales.length; i++ ) {
      const findItem = tempArray.find(item => item.iwe.toLowerCase() === sales[i].iwe.toLowerCase());
      if(findItem === undefined) {
        
        tempArray.push({
          address: sales[i].address,
          puchaserGst: sales[i].puchaserGst,
          city: sales[i].city,
          state: sales[i].state,
          email: sales[i].email,
          iwe: sales[i].iwe,
          date: sales[i].date,
          phone: sales[i].phone,
        })

        //! If you wanna add more field in firebase or store data put object and key in tempItem
        const tempItem = {
          address: sales[i].address,
          puchaserGst: sales[i].puchaserGst,
          city: sales[i].city,
          state: sales[i].state,
          email: sales[i].email,
          iwe: sales[i].iwe,
          re: sales[i].re,
          pCode: sales[i].pCode,
          date: sales[i].date,
          phone: sales[i].phone,
        }; 

        let userDetails = await props.add("Companies",tempItem);
      }

      
    }
    
  }

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Bill of Sales</h3>
          {/* <button onClick={addAllComapanies}>All Companies</button> */}
          <div className='search-bar'>
            <input placeholder='Search Product' value={search} onChange={updateUserInput}/>
            <i class="bi bi-search"></i>
          </div>
          <Link to="/dashboard/sales/add" className="btn-general primary-btn">Create <i class="bi bi-plus-lg"></i> </Link>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response" id="basic-info">
          <table className='activity-table bill-table'>
            <thead>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Date</th>
              <th></th>
            </thead>
            <tbody>
              {!loading && (sales && sales.filter(item => item.re.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.invoice === parseInt(search.toLowerCase())).map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.invoice}
                  </td>
                  <td><span>{item.serialNum}</span>{item.re ? item.re : "N/A"}</td>
                  <td>
                    {item.status === "Pending" && <div className='new-item'>Pending</div>}  
                    {item.status === "Done" && <div className='old-item'>Done</div>}
                    {item.status === "" && <div className='old-item'>N/A</div>}
                  </td>
                  <td>{item.date}</td>
                  <td><a href="#" className="btn-danger delete-button-table" onClick={() => {setDeleteBox(true); setDeleteId({...item, type: "Sales"})}}><i class="bi bi-trash3"></i> Delete</a><Link className=" edit-button" to={`/dashboard/sales/${item.id}`}><i class="bi bi-binoculars"></i> View</Link></td>
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

            {loading && <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
          </table>
        </section>
      </div>
    </div>
  )
}

export default Sales