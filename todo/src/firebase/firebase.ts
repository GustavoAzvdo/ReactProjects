// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_a1AafTuaP2etlXLJL-ciJMRjijfD2LI",
  authDomain: "todotaskz25.firebaseapp.com",
  projectId: "todotaskz25",
  storageBucket: "todotaskz25.firebasestorage.app",
  messagingSenderId: "396589144699",
  appId: "1:396589144699:web:4a404b7d626b40af9a60de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}