import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth";
// import { GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh_g9svOC3PYUJpcwhClrfn18HytqAc4E",
  authDomain: "nested-list-61e11.firebaseapp.com",
  projectId: "nested-list-61e11",
  storageBucket: "nested-list-61e11.appspot.com",
  messagingSenderId: "435036591433",
  appId: "1:435036591433:web:1f7f5a56eb311f33b2b698",
  measurementId: "G-3DP93FC5S9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export { auth, app, db };
