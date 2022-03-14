import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAJDngnsH4oSEE1n3gUnCNPBB3VAVVuaY",
  authDomain: "get-a-book-3662d.firebaseapp.com",
  projectId: "get-a-book-3662d",
  storageBucket: "get-a-book-3662d.appspot.com",
  messagingSenderId: "117072558634",
  appId: "1:117072558634:web:98f44ffb2936854944a153",
  measurementId: "G-7MQ0R3YXC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
