// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app’s Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCi93bWn8h48YqZDm0aVWF4T1nWWJU-Lw4",
    authDomain: "stockproject-a40e7.firebaseapp.com",
    projectId: "stockproject-a40e7",
    storageBucket: "stockproject-a40e7.appspot.com",
    messagingSenderId: "118782084993",
    appId: "1:118782084993:web:d20589a0c684a7b5ab8a80",
    measurementId: "G-QX6WN596HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication and GoogleAuthProvider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
