// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration object
// Make sure to restrict the API key in your Firebase Console for security.
const firebaseConfig = {
  apiKey: "AIzaSyCPsAtYzbNvD4AVgq7pma3PVkCqwnFkrYU",
  authDomain: "kikwetu-ventures.firebaseapp.com",
  projectId: "kikwetu-ventures",
  storageBucket: "kikwetu-ventures.appspot.com",
  messagingSenderId: "611149035554",
  appId: "1:611149035554:web:9b846820d2d5c4ce25727b",
  measurementId: "G-D0NVTVKNYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
// Uncomment the following line if you actively use Firebase Analytics.
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

// Export initialized services for use in other files
export { app, analytics, auth, db };
