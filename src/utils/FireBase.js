// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKVvdK2NHQYYR3RmxMlztLv8OIsBHIW2Q",
  authDomain: "netflix-ai-5d33f.firebaseapp.com",
  projectId: "netflix-ai-5d33f",
  storageBucket: "netflix-ai-5d33f.appspot.com",
  messagingSenderId: "372736005149",
  appId: "1:372736005149:web:45cbce93f74485133462f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();