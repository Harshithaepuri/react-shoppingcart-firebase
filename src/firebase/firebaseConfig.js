// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFv_H3Yhpp7t_ynYsgrUy0TL49gQetddM",
  authDomain: "shopping-cart-3d6bb.firebaseapp.com",
  projectId: "shopping-cart-3d6bb",
  storageBucket: "shopping-cart-3d6bb.appspot.com",
  messagingSenderId: "370198677886",
  appId: "1:370198677886:web:8c3066b9975bd0cf400b2f",
  measurementId: "G-6QM5LBM572"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
