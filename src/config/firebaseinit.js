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
  apiKey: "AIzaSyAF41r0vB8WtTIgivFYG5MqrpSQ-4hyRUw",
  authDomain: "bitmax-49d16.firebaseapp.com",
  projectId: "bitmax-49d16",
  storageBucket: "bitmax-49d16.appspot.com",
  messagingSenderId: "262820151297",
  appId: "1:262820151297:web:b91b45c8665a62a9e5c000"
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
