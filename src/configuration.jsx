// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore ,query, orderBy, limit, getDocs} from "firebase/firestore";
// import { getFirestore } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const q = query(db, orderBy("id"), limit(3));

// const querySnapshot = await getDocs(q;
// querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
// });
// const analytics = getAnalytics(app);

export default db;

