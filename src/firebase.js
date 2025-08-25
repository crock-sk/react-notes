import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD2AiuEa-bFEbc0Y1ciANHMr-iVk7YHfKE",
  authDomain: "reichman-notes.firebaseapp.com",
  projectId: "reichman-notes",
  storageBucket: "reichman-notes.firebasestorage.app",
  messagingSenderId: "880409665008",
  appId: "1:880409665008:web:f9a96888b19ca9e14fd135",
};

const app = initializeApp(firebaseConfig);

export const fireDataBase = getFirestore(app);