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
  apiKey: "AIzaSyBr3vAiUJURiddaM6xF0IGgkUsw3BsIfsg",
  authDomain: "bitmax-937a0.firebaseapp.com",
  projectId: "bitmax-937a0",
  storageBucket: "bitmax-937a0.appspot.com",
  messagingSenderId: "738537975374",
  appId: "1:738537975374:web:b160efd459ffbb0bce1d1f"
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
