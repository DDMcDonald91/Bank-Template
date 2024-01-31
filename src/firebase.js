/* eslint-disable */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9wVj61U9HPWwOgM8f7q7TDAJiuDnY-iY",
  authDomain: "sons-locksmiths.firebaseapp.com",
  projectId: "sons-locksmiths",
  storageBucket: "sons-locksmiths.appspot.com",
  messagingSenderId: "109705636417",
  appId: "1:109705636417:web:daaa698ca4fb85cf2134c0",
  measurementId: "G-7Q6688EB53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);