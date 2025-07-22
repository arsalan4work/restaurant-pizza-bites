// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE6t-KgqMdgGMzzywUzoPcLQ4Ra-xnPTE",
  authDomain: "pizzabites-75454.firebaseapp.com",
  projectId: "pizzabites-75454",
  storageBucket: "pizzabites-75454.appspot.com",
  messagingSenderId: "429237174040",
  appId: "1:429237174040:web:6b8b1fa0003ce15bf6686d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
