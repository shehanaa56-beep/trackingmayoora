// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM0f1HFu3HLnkvtCzvX-haH1YMsVWpwQ8",
  authDomain: "tracking-8c169.firebaseapp.com",
  databaseURL: "https://tracking-8c169-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracking-8c169",
  storageBucket: "tracking-8c169.firebasestorage.app",
  messagingSenderId: "83655418556",
  appId: "1:83655418556:web:53f8170845c69bb86666b9",
  measurementId: "G-C85HXJCFG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
