import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwLowFc00STsmJFkUlsdcWFwRbxJrCyc0",
  authDomain: "house-market-app-b93e8.firebaseapp.com",
  projectId: "house-market-app-b93e8",
  storageBucket: "house-market-app-b93e8.appspot.com",
  messagingSenderId: "540842457055",
  appId: "1:540842457055:web:0e3d4330d481e7bb7bf66a",
  measurementId: "G-JGMZ9R7SEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
