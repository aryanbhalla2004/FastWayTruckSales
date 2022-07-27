import React, {useState, useEffect} from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom'
import { firebase } from '../../Util/Firebase';

export const Inquires = () => {
  const history = useNavigate();
  const [setDeleteBox, setDeleteId] = useOutletContext();
  const [inquires, setInquires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cityRef = firebase.firestore().collection("Inquires");
      cityRef.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          let info = doc.data();
          let id = doc.id;
          items.push({...info, id});  
        });
        setInquires(items)
        setLoading(false);
      });
    }
    
    fetch();
  }, [])

  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Products Inquires</h3>
          <Link to="/dashboard/trucks/add" className="btn-general primary-btn">Clear All <i class="bi bi-dash-lg"></i> </Link>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response" id="basic-info">
          <table className='activity-table inquire-table'>
            <thead>
              <th>Status</th>
              <th>Email</th>
              <th>Product</th>
              <th>Subject</th>
              <th></th>
            </thead>
            <tbody>
              {!loading && (inquires && inquires.map((item, index) => (
                <tr key={index}>
                  <td> {item.status === "new" && <div className='new-item'>NEW</div>}  {item.status === "viewed" && <div className='old-item'>VIEWED</div>}</td>
                  <td><span>{item.name}</span>{item.email}</td>
                  <td>{item.productId}</td>
                  <td>{item.subject}</td>
                  <td><a href="#" className="btn-danger delete-button-table" onClick={() => {setDeleteBox(true); setDeleteId({...item, type: "Inquires"})}}><i class="bi bi-trash3"></i> Delete</a><Link className=" edit-button" to={`/dashboard/product-inquire/${item.id}`}><i class="bi bi-binoculars"></i> View</Link></td>
                </tr>
              )))}
            </tbody>
            {!loading && inquires != undefined && inquires.length <= 0 && 
            <div className='centering-messages mt-5'>
              <h4>No Items Found</h4>
              <p>It seems we don't have any inventory for product Inquires</p>
              <Link className="btn-general primary-btn mt-3" to="/dashboard">Back Home</Link>
            </div>
            }

            {loading && <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
        
          </table>
        </section>
      </div>
    </div>
  )
}

export default Inquires