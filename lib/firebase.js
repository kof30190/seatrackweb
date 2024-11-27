import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPlsEcSkqdFga5umNB710xZNpXU0W72A0",
  authDomain: "seatrackweb-bcd58.firebaseapp.com",
  projectId: "seatrackweb-bcd58",
  storageBucket: "seatrackweb-bcd58.firebasestorage.app",
  messagingSenderId: "947479641463",
  appId: "1:947479641463:web:40e52cec3bcf8ab3cfb572",
  measurementId: "G-HZHR9WVYEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
