// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPH1HQiOPHX90LkXDlpDx8ZCi6d-fyMIs",
  authDomain: "ai-travel-planner-91808.firebaseapp.com",
  projectId: "ai-travel-planner-91808",
  storageBucket: "ai-travel-planner-91808.firebasestorage.app",
  messagingSenderId: "416185796409",
  appId: "1:416185796409:web:be19738101b4d5e6760ae8",
  measurementId: "G-XF8EBLHS1H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);