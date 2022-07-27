import React, {useState, useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { firebase } from '../../Util/Firebase';
export const NewListings = (props) => {
  const [setDeleteBox, setDeleteId] = useOutletContext();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cityRef = firebase.firestore().collection("TruckPost");
      cityRef.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          let info = doc.data();
          let id = doc.id;
          items.push({...info, id});  
        });
        setListings(items)
        setLoading(false);
      });
    }
    
    fetch();
  }, [])
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>New Listings</h3>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response" id="basic-info">
          <table className='activity-table listing-table'>
            <thead>
              <th>Status</th>
              <th>Email</th>
              <th>Type</th>
              <th>Make</th>
              <th>Year</th>
              <th></th>
            </thead>
            <tbody>
              {!loading && (listings && listings.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.status === "new" && <div className='new-item'>NEW</div>}
                    {item.status === "viewed" && <div className='old-item'>VIEWED</div>}
                  </td>
                  <td><span>{item.ContactName}</span>{item.ContactEmail}</td>
                  <td>{item.TruckType}</td>
                  <td>{item.TruckMake}</td>
                  <td>{item.Year}</td>
                  <td><a href="#" className="btn-danger delete-button-table" onClick={() => {setDeleteBox(true); setDeleteId({...item, type: "TruckPost"})}}><i class="bi bi-trash3"></i> Delete</a><Link className=" edit-button" to={`/dashboard/new-listing/${item.id}`}><i class="bi bi-binoculars"></i> View</Link></td>
                </tr>
              )))}
            </tbody>
            {!loading && listings != undefined && listings.length <= 0 && 
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

export default NewListings