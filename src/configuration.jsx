// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcl_s3HPSn1Va3KooHR0RkFT2OdFPV5Ws",
  authDomain: "student-data-42a13.firebaseapp.com",
  projectId: "student-data-42a13",
  storageBucket: "student-data-42a13.firebasestorage.app",
  messagingSenderId: "696340679746",
  appId: "1:696340679746:web:e8284aa77d44a6f19a31db",
  measurementId: "G-G8JFXYLQ5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// const analytics = getAnalytics(app);

export default db;

