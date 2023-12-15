import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCtYa2uRXSiKqnkWkHXib8D24P_PuJuB1k",
  authDomain: "chat-308a4.firebaseapp.com",
  projectId: "chat-308a4",
  storageBucket: "chat-308a4.appspot.com",
  messagingSenderId: "1091682179857",
  appId: "1:1091682179857:web:207da461a4ae0017464ab0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
