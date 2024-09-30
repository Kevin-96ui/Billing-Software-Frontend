// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCr8Me7nE4u1Pf94Gspj2G683YwKgBMCqI',
  authDomain: 'otp-login-4e6d0.firebaseapp.com',
  projectId: 'otp-login-4e6d0',
  storageBucket: 'otp-login-4e6d0.appspot.com',
  messagingSenderId: '425775723705',
  appId: '1:425775723705:web:49b7a868c44095e574d768',
  measurementId: 'G-G4YQDEXG11'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
