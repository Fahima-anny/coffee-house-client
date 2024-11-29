// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvnz8GXdiLyoxOwUsEyG8tttrcbsUPd4k",
  authDomain: "coffee-house-ph.firebaseapp.com",
  projectId: "coffee-house-ph",
  storageBucket: "coffee-house-ph.firebasestorage.app",
  messagingSenderId: "26421102279",
  appId: "1:26421102279:web:b4dd0bf1701e2ae239e0e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;