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
  apiKey: "AIzaSyBCMDRDy5l2bbRvBzL8QVdJCbMOnyGJbIk",
  authDomain: "apexmeta-3e1a7.firebaseapp.com",
  projectId: "apexmeta-3e1a7",
  storageBucket: "apexmeta-3e1a7.appspot.com",
  messagingSenderId: "473010808291",
  appId: "1:473010808291:web:f060544013e26c6ebe6cd6",
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
