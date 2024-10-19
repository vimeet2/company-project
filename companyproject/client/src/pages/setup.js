// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt17UCkZ09L0V9YuP_Ifh6MVy94FaafUY",
  authDomain: "mern-project-14228.firebaseapp.com",
  projectId: "mern-project-14228",
  storageBucket: "mern-project-14228.appspot.com",
  messagingSenderId: "587361305554",
  appId: "1:587361305554:web:484b09849135e62fd27e0b",
  measurementId: "G-F2R2RL4CFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);