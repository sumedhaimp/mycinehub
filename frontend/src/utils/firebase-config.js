// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd9hHwo-lkK1PZP_l5IO4n3eSMpaMT-M8",
  authDomain: "cinehub-918ea.firebaseapp.com",
  projectId: "cinehub-918ea",
  storageBucket: "cinehub-918ea.appspot.com",
  messagingSenderId: "552975357898",
  appId: "1:552975357898:web:28949e476e38f7a44b6133",
  measurementId: "G-X2536L5BN8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
