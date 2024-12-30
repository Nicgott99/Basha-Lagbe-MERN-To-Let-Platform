
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVu6kUPiGchi0aMSnWYNv1CjnLFhLpZds",
  authDomain: "basha-lagbe-7c2ec.firebaseapp.com",
  projectId: "basha-lagbe-7c2ec",
  storageBucket: "basha-lagbe-7c2ec.firebasestorage.app",
  messagingSenderId: "889669293249",
  appId: "1:889669293249:web:d2162264d5f67d88ef7040",
  measurementId: "G-F8DJFBPX3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
