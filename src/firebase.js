// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAcdFI7K-18AQqnxAMMwcifTO9KGZpBQcM",
  authDomain: "bookbro-84d55.firebaseapp.com",
  projectId: "bookbro-84d55",
  storageBucket: "bookbro-84d55.firebasestorage.app",
  messagingSenderId: "775505269094",
  appId: "1:775505269094:web:fb2cdfc7d82eda473a78a7",
  measurementId: "G-BB7J9SPJKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider,db,storage};
