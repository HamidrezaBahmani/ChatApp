// Importing necessary functions from the Firebase Modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Defining Firebase configuration directly (without dotenv)
const firebaseConfig = {
  apiKey: JSON.stringify(import.meta.env.VITE_APIKEY),
  authDomain: JSON.stringify(import.meta.env.VITE_AUTHDOMAIN),
  projectId: JSON.stringify(import.meta.env.VITE_PROJECTID),
  storageBucket: JSON.stringify(import.meta.env.VITE_STORAGEBUCKET),
  messagingSenderId: JSON.stringify(import.meta.env.VITE_MESSAGINGSENDERID),
  appId: JSON.stringify(import.meta.env.VITE_APPID),
};

// Initializing Firebase with the configuration
export const app = initializeApp(firebaseConfig);

// Initializing Firebase services (authentication, storage, and Firestore)
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
