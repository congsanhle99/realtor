// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClCLbI96e7fTuJTr4cpA_EAO9fBPAp-aU",
  authDomain: "realtor-728fc.firebaseapp.com",
  projectId: "realtor-728fc",
  storageBucket: "realtor-728fc.appspot.com",
  messagingSenderId: "477205152919",
  appId: "1:477205152919:web:e233350bb4108def0695d2",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
