// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4JnANPW5rRIBSAR_9cSHLeo9FucVtvMk",
    authDomain: "qotw-424600.firebaseapp.com",
    projectId: "qotw-424600",
    storageBucket: "qotw-424600.appspot.com",
    messagingSenderId: "860192974093",
    appId: "1:860192974093:web:5532a7015af40c87e3bc44",
    measurementId: "G-FFC6PG6W2K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);