import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc } from "firebase/firestore"; 
// import { getFirestore } from "firebase/firestore";
// import { getDocs } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseurl: process.env.REACT_APP_DATABASE_URL,
};

console.log("API KEY:", process.env.REACT_APP_DATABASE_URL);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db, collection, addDoc , getDocs, doc};

