// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACsdMgYeCIuzrx837CucM3smqeCLjyLNc",
  authDomain: "proleverage-39ed7.firebaseapp.com",
  projectId: "proleverage-39ed7",
  storageBucket: "proleverage-39ed7.appspot.com",
  messagingSenderId: "256426912380",
  appId: "1:256426912380:web:7106d8c68d6f2f6242b7f9",
  measurementId: "G-WB608P02BL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
