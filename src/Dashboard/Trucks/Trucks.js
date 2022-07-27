import React, {useState, useEffect} from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom'
import { firebase } from '../../Util/Firebase';
export const Trucks = (props) => {
  const history = useNavigate();
  const [setDeleteBox, setDeleteId] = useOutletContext();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cityRef = firebase.firestore().collection("Trucks");
      cityRef.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          let info = doc.data();
          let id = doc.id;
          items.push({...info, id});  
        });
        setTrucks(items)
        setLoading(false);
      });
    }
    
    fetch();
  }, [])
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>My Trucks</h3>
          <Link to="/dashboard/trucks/add" className="btn-general primary-btn">Create <i class="bi bi-plus-lg"></i> </Link>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <table className='activity-table'>
            <thead>
              <th>Stocks #</th>
              <th>Title</th>
              <th>Year</th>
              <th>Created Date</th>
              <th>Quantity</th>
              <th></th>
            </thead>
            <tbody>
              {!loading && (trucks && trucks.map((item, index) => (
                <tr key={index}>
                  <td>{item.Stock}</td>
                  <td>{item.Title}</td>
                  <td>{item.Year}</td>
                  <td>{item.Date}</td>
                  <td>{item.Quantity}</td>
                  <td><a href="#" className="btn-danger delete-button-table" onClick={() => {setDeleteBox(true); setDeleteId({...item, type: "Trucks"})}}><i class="bi bi-trash3"></i> Delete</a><Link className="edit-button" to={`/truck-detail/${item.id}`}><i class="bi bi-binoculars"></i> View</Link></td>
                </tr>
              )))}
            </tbody>
            {!loading && trucks != undefined && trucks.length <= 0 && 
            <div className='centering-messages mt-5'>
              <h4>No Items Found</h4>
              <p>It seems we don't have any inventory in the system</p>
              <Link className="btn-general primary-btn mt-3" to="/dashboard/trucks/add">Add Product</Link>
            </div>
            }

            {loading && <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
          </table>
        </section>
      </div>
    </div>
  )
}

export default Trucks