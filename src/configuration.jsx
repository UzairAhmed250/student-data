import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, deleteField ,updateDoc, query, where, setDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signOut, sendEmailVerification, createUserWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence, signInWithEmailAndPassword, inMemoryPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, collection, addDoc , getDocs, doc, auth, getDoc, deleteDoc, deleteField, updateDoc, onAuthStateChanged, query, where, sendPasswordResetEmail, signOut, sendEmailVerification, createUserWithEmailAndPassword, updateProfile,setPersistence, browserSessionPersistence, signInWithEmailAndPassword, inMemoryPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, setDoc};

