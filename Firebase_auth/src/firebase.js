// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAywBgWBEhUeaDGf7XtHGCkHeAMLQv36o",
  authDomain: "project-c7053.firebaseapp.com",
  projectId: "project-c7053",
  storageBucket: "project-c7053.appspot.com",
  messagingSenderId: "589153293396",
  appId: "1:589153293396:web:037062eb562f6b75b389c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);