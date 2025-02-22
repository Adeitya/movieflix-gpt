// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1JTB4LqLs-01RkcODVAR59fJDFwXz5wg",
  authDomain: "movieflix-gpt-e9496.firebaseapp.com",
  projectId: "movieflix-gpt-e9496",
  storageBucket: "movieflix-gpt-e9496.firebasestorage.app",
  messagingSenderId: "499916336591",
  appId: "1:499916336591:web:38e6843bd5b20dd73976ba",
  measurementId: "G-VGCC0VLMD9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
