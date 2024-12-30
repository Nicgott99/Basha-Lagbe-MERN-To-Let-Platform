<<<<<<< HEAD

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
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f8f18.firebaseapp.com",
  projectId: "mern-estate-f8f18",
  storageBucket: "mern-estate-f8f18.appspot.com",
  messagingSenderId: "304767473129",
  appId: "1:304767473129:web:e67df8378b70567db42778"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
>>>>>>> 6d955619a519b6533b068373d0919cd63efb5f5d
