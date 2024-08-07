// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbM_WZAnrEtJiUJt-TEiIcatsO9_CoKZQ",
  authDomain: "viewer-f3d23.firebaseapp.com",
  projectId: "viewer-f3d23",
  storageBucket: "viewer-f3d23.appspot.com",
  messagingSenderId: "661729412610",
  appId: "1:661729412610:web:0899f2c9cf54e299bbc91b",
  measurementId: "G-GSDY3M2KTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}