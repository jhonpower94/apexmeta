import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { authState } from "rxfire/auth";


// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAG1HD-mTPdixEd31-kxDq7iaKmG948zXM",
  authDomain: "trustpay-27694.firebaseapp.com",
  projectId: "trustpay-27694",
  storageBucket: "trustpay-27694.appspot.com",
  messagingSenderId: "688128236737",
  appId: "1:688128236737:web:d3ce1f7b9ef4012c02c840"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage(app);

// Listen only for logged in state
const loggedIn$ = authState(auth);

export {
  app,
  loggedIn$,
  auth,
  db,
  storage,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
