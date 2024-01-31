// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjg7ZEX0UWZtXCydfV-mwc6Ey_VQmY2gY",
  authDomain: "teste-af6da.firebaseapp.com",
  projectId: "teste-af6da",
  storageBucket: "teste-af6da.appspot.com",
  messagingSenderId: "64398630413",
  appId: "1:64398630413:web:201f6d5dfb57849943ff44",
  measurementId: "G-1RSBDWQ5HW"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase)
console.log('conectado ao firebase')
export { firestore };