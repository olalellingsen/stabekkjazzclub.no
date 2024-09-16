import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeELag_9Po5eC-6jJkJDjaZATgLqu8McU",
  authDomain: "stabekk-jazz-club.firebaseapp.com",
  projectId: "stabekk-jazz-club",
  storageBucket: "stabekk-jazz-club.appspot.com",
  messagingSenderId: "881735615664",
  appId: "1:881735615664:web:39f897b8a334d9c139e775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
