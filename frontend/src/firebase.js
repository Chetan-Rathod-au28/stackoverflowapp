// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvRCvxx9hQlnD2_6fiwgPw6JVShul-Lo4",
  authDomain: "stackoverflow-5b0fe.firebaseapp.com",
  projectId: "stackoverflow-5b0fe",
  storageBucket: "stackoverflow-5b0fe.appspot.com",
  messagingSenderId: "305609038246",
  appId: "1:305609038246:web:f0835d6bc2d3f9fc2a9767",
  measurementId: "G-V097ZQY1RV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()