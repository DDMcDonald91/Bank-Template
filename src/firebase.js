// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcI8vqEHIgzFIvuzH2faUpH2bhWhgQ6jQ",
  authDomain: "loyal-4-dmv.firebaseapp.com",
  projectId: "loyal-4-dmv",
  storageBucket: "loyal-4-dmv.appspot.com",
  messagingSenderId: "9047788118",
  appId: "1:9047788118:web:6be38ee2eabb5378df49f7",
  measurementId: "G-XT88QM1ZW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);