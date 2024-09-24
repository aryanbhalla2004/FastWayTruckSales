import React, {useState, useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { firebase } from '../../Util/Firebase';

export const Cheque = (props) => {
  const [setDeleteBox, setDeleteId] = useOutletContext();
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const cityRef = firebase.firestore().collection("cheque");
    cityRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        let info = doc.data();
        let id = doc.id;
        items.push({...info, id});  
      });
      setCompanies(items)
      setLoading(false);
    });
  }

  const updateUserInput = (e) => {
    setSearch(e.target.value);
  }
  

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>List of Cheque</h3>
          
          
          <Link to="/dashboard/cheque/add" className="btn-general primary-btn">Create <i class="bi bi-plus-lg"></i> </Link>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response" id="basic-info">
          <table className='activity-table company-table'>
            <thead>
              <th>Cheque #</th>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </thead>
            <tbody>
              {!loading && (companies && companies.filter(item => item.for.toLowerCase().includes(search) || item.memo.toLowerCase().includes(search)).map((item, index) => (
                <tr key={index}>
                  <td>
                    {index+1}
                  </td>
                  <td><span>{item.for}</span>{parseFloat(item.amount).toFixed(2)}</td>
                  <td>{item.date}</td>
                  <td><a href="#" className="btn-danger delete-button-table" onClick={() => {setDeleteBox(true); setDeleteId({...item, type: "Companies"})}}><i class="bi bi-trash3"></i> Delete</a><Link className=" edit-button" to={`/dashboard/cheque/${item.id}`}><i class="bi bi-binoculars"></i> View</Link></td>
                </tr>
              )))}
            </tbody>
            {!loading && companies != undefined && companies.length <= 0 && 
            <div className='centering-messages mt-5'>
              <h4>No Items Found</h4>
              <p>It seems we don't have any cheque in the system</p>
            </div>
            }
            {loading && <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
          </table>
        </section>
      </div>
    </div>
  )
}

export default Cheque