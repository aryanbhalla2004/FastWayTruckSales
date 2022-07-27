import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";


const app = firebase.initializeApp({
  apiKey: "AIzaSyCkze8xPsuVbfvQwTMPOItgYF60h_38ssI",
  authDomain: "abwork-75b9a.firebaseapp.com",
  projectId: "abwork-75b9a",
  storageBucket: "abwork-75b9a.appspot.com",
  messagingSenderId: "995671228533",
  appId: "1:995671228533:web:f73bccf200813eec3d783c"
});

//auth and firestore references
const db = app.firestore();
const functions = app.functions();
const auth = app.auth();


export {auth, db, firebase, functions};  