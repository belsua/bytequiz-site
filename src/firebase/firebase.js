import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUWIRYkvb6chz5RdLNUMl71jrHgdvxQG8",
  authDomain: "bytequiz-ec3b9.firebaseapp.com",
  databaseURL: "https://bytequiz-ec3b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bytequiz-ec3b9",
  storageBucket: "bytequiz-ec3b9.appspot.com",
  messagingSenderId: "638824992602",
  appId: "1:638824992602:web:e9b5caee531a6fab09ed63",
  measurementId: "G-TP07RE1T3S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };