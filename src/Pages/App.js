import LogIn from "./pages/login/login";
import Home from "./pages/home/home";
import Sales from "./pages/home/sales/sales";
import SalesAdd from "./pages/home/sales/add/add";
import SalesEdit from "./pages/home/sales/edit/edit";
import SalesView from "./pages/home/sales/view/view"
import Dashboard from './pages/home/dashboard/dashboard'
import {firebase, auth, db} from './util/Firebase'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user.uid === "YOFCfE9wErbs8hFYWcnshgOJjc72"){
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    db.collection("Sales").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setSales(tempList);
    });
  }, [])

  const login = (email, password) => {
    console.log("login");
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    
    auth
      .signOut()
      .then((res) => {
        setCurrentUser(null);
        history("/login");
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
  const add = async (obj , type) => {
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
    try{
      await firebase.firestore().collection(type).doc(id).delete();
    }
    catch(e){
      return e.message
    } 
  }

  return ( 
    <>

      <Routes>
        <Route path="login" element={currentUser ? <Navigate to="/dashboard" /> : <LogIn login={login}/>} />
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}/>
        <Route path="dashboard" element={currentUser ? <Home currentUser logout={logout}/> : <Navigate to="/login" />}>
          <Route index element={currentUser ? <Dashboard currentUser logout={logout}/> : <Navigate to="/login" />}/>
          <Route path="sales"element={currentUser ? <Sales  del={del} sales={sales}/> : <Navigate to="/login" />} />
          <Route path="sales/add"  element={currentUser ? <SalesAdd add={add}/> : <Navigate to="/login" />}/>
          <Route path="sales/edit/:id" element={currentUser ? <SalesEdit edit={edit} sales={sales}/> : <Navigate to="/login" />}/>
          <Route path="sales/view/:id" element={currentUser ? <SalesView del={del} sales={sales}/> : <Navigate to="/login" />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;

//<Route path="/sales/add" element={currentUser ? <SalesAdd login={login} add={add} /> : <Navigate to="/login" />}/>
//<Route path="/sales/edit" element={currentUser ? <SalesEdit login={login}  edit={edit} get={get} /> : <Navigate to="/login" />}/>
//<Route path="/sales/view" element={currentUser ? <SalesView login={login}  edit={edit} del={del} get={get} /> : <Navigate to="/login" />}/>