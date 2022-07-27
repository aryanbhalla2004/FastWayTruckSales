import {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import {firebase, auth, db} from './Util/Firebase'
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import "./App.css";
import "./index.css";
import Header from './Components/header';
import Footer from './Components/footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Loading } from './Components/loading';
import SellTruck from './Pages/SellTruck';
import Trucks from './Pages/Trucks';
import TruckDetail from './Pages/TruckDetail';
import Trailers from './Pages/Trailers';
import TrailerDetail from './Pages/TrailerDetail';
import Dashboard from './Dashboard/Dashboard';
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';

import {Trucks as DashboardTruck} from './Dashboard/Trucks/Trucks';
import {Trailers as DashboardTrailers} from './Dashboard/Trailers/Trailer';
import {Inquires as DashboardInquires} from './Dashboard/ProductInquries/Inquires';
import {NewListings as DashboardListings} from './Dashboard/NewListings/NewListings';
import {Sales as DashboardSales} from './Dashboard/Sales/Sales';
import SaleView from './Dashboard/Sales/SaleView';
import SalesAdd from './Dashboard/Sales/SalesAdd';
import SalesEdit from './Dashboard/Sales/SalesEdit';
import NewListingView from './Dashboard/NewListings/NewListingView';
import InquireView from './Dashboard/ProductInquries/InquireView';
import TrailerView from './Dashboard/Trailers/TrailerView';
import TrailerAdd from './Dashboard/Trailers/TrailerAdd';
import TrailerEdit from './Dashboard/Trailers/TrailerEdit';
import TruckView from './Dashboard/Trucks/TruckView';
import TruckAdd from './Dashboard/Trucks/TruckAdd';
import TruckEdit from './Dashboard/Trucks/TruckEdit';
import DashboardHome from './Dashboard/DashboardHome';
const App = () => {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [trucks, setTrucks] = useState();
  const [trailers, setTrailers] = useState();
  const [Inquires, setInquires] = useState();
  const [TruckPost, setTruckPost] = useState();
  const [SalesPost, setSalesPost] = useState();
  const [ExtraInfo, setExtraInfo] = useState();
  useEffect(() => {
    db.collection("TruckPost").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setTruckPost(tempList);
    });
  }, [])
  useEffect(() => {
    db.collection("ExtraInfo").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setExtraInfo(tempList[0]);
    });
  }, [])
  useEffect(() => {
    db.collection("Sales").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setSalesPost(tempList);
    });
  }, [])
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(function() {setLoading(false)}, 0);
  }, [loading]);

  useEffect(() => {
    db.collection("Trucks").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setTrucks(tempList);
    });
  }, [])

  useEffect(() => {
    db.collection("Trailers").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setTrailers(tempList);
    });
  }, [])

  useEffect(() => {
    db.collection("Inquires").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setInquires(tempList);
    });
  }, [])

  const login = (email, password) => {
    console.log("login");
    return auth.signInWithEmailAndPassword(email, password);
  };

  const add = async (type,obj) => {
    try{
      await firebase.firestore().collection(type).doc().set(obj);
    }
    catch(e){
      return e.message
    } 
}

  const edit = async (obj,type,id) => {
    try{
      await firebase.firestore().collection(type).doc(id).update(obj);
    }
    catch(e){
      return e.message
    } 
  }
  const del = async (type, id) => {
    try {
      await firebase.firestore().collection(type).doc(id).delete();
    } catch(e){
      return e.message
    } 
  }

  const getData = async (from) => {
    const cityRef = firebase.firestore().collection(from);
    cityRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        let info = doc.data();
        let id = doc.id;
        items.push({...info, id});  
      });
      return items
    });
  }


  const logout = () => {
    auth.signOut().then((res) => {
        setCurrentUser(null);
        history("/login");
        return res;
      }).catch((err) => {
        return err;
      });
  };

  return (
    <>
    {!loading ?
    <AnimatePresence>
      <Routes>
        <Route path="dashboard" element={currentUser ? <Dashboard del={del} getData={getData} add={add} edit={edit} currentUser={currentUser} logout={logout}/> : <Navigate to="/login"/>}>
          <Route index element={<DashboardHome trucks={trucks} trailers={trailers} TruckPost={TruckPost} SalesPost={SalesPost} Inquires={Inquires}/>}/>
          //! Trucks
          <Route path="trucks" element={<DashboardTruck getData={getData} del={del}/>}/>
          {/* <Route path="trucks/:id" element={<TruckView trucks={trucks} del={del}/>}/> */}
          <Route path="trucks/add" element={<TruckAdd add={add}/>}/>
          <Route path="trucks/edit/:id" element={<TruckEdit trucks={trucks} edit={edit}/>}/>

          //! Trailers
          <Route path="trailers" element={<DashboardTrailers getData={getData} del={del}/>} />
          {/* <Route path="trailers/:id" element={<TrailerView trailers={trailers} getData={getData} del={del}/>}/> */}
          <Route path="trailers/add" element={<TrailerAdd  add={add}/>}/>
          <Route path="trailers/edit/:id" element={<TrailerEdit trailers={trailers} getData={getData} edit={edit}/>}/>

          <Route path="product-inquire" element={<DashboardInquires getData={getData}/>} />
          <Route path="product-inquire/:id" element={<InquireView trucks={trucks} trailers={trailers} Inquires={Inquires} getData={getData} edit={edit} del={del}/>}/>

          <Route path="new-listings" element={<DashboardListings  getData={getData} del={del}/>} />
          <Route path="new-listing/:id" element={<NewListingView TruckPost={TruckPost} getData={getData}  edit={edit} del={del}/>}/>

          //! Bill of Sales
          <Route path="sales" element={<DashboardSales getData={getData} del={del}/>} />
          <Route path="sales/:id" element={<SaleView getData={getData} del={del}/>}/>
          <Route path="sales/add"  element={<SalesAdd ExtraInfo={ExtraInfo} SalesPost={SalesPost} edit={edit} add={add}/>}/>
          <Route path="sales/edit/:id"  element={<SalesEdit  SalesPost={SalesPost} getData={getData} edit={edit}/>}/>
        </Route>

        <Route path="/" element={<LandingPage setPage={setPage} setLoading={setLoading} page={page}/>}>
          <Route index element={<Home setPage={setPage} setLoading={setLoading} page={page}/>}/>
          <Route path="about" element={<About setPage={setPage}/>}/>
          <Route path="trucks" element={<Trucks setPage={setPage}/>}/>
          <Route path="trailers" element={<Trailers setPage={setPage}/>}/>
          <Route path="about-us" element={<About setPage={setPage}/>}/>
          <Route path="contact-us" element={<Contact setPage={setPage}/>}/>
          <Route path="sell-truck" element={<SellTruck setPage={setPage} add={add}/>} />
          <Route path="truck-detail/:id" element={<TruckDetail currentUser={currentUser} setPage={setPage} add={add}/>} />
          <Route path="trailers-detail/:id" element={<TrailerDetail currentUser={currentUser} setPage={setPage}/>} />
          <Route path="login" element={currentUser ? <Navigate to="/dashboard"/> : <Login login={login}/>}/>
        </Route>
      </Routes>
      
    </AnimatePresence> : <Loading/> }
    </>
  )
}

export default App;
