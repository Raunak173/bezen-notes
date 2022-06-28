import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABw09DKGP0FftOMtYZ4MEjhqigMXaT8Rw",
  authDomain: "be-zen-notes.firebaseapp.com",
  projectId: "be-zen-notes",
  storageBucket: "be-zen-notes.appspot.com",
  messagingSenderId: "911204058662",
  appId: "1:911204058662:web:1a9a53e42f23f5722648e7",
  measurementId: "G-LG8422N6WW",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
