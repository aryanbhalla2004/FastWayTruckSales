import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";


const app = firebase.initializeApp({
  apiKey: "AIzaSyA67WT2oLXR-mgVLsmCNHbmeHHcy4h8Ev4",
  authDomain: "fastway-trucking.firebaseapp.com",
  projectId: "fastway-trucking",
  storageBucket: "fastway-trucking.appspot.com",
  messagingSenderId: "711527336437",
  appId: "1:711527336437:web:33366b320ee948dfb3b8bc"
});

//auth and firestore references
const db = app.firestore();
const functions = app.functions();
const auth = app.auth();


export {auth, db, firebase, functions};  