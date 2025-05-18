import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
