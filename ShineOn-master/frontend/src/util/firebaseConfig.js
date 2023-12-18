// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFi-ctaODyTYjidn0VXoYGjBNCEtvQS3U',
  authDomain: 'imasha-itp.firebaseapp.com',
  projectId: 'imasha-itp',
  storageBucket: 'imasha-itp.appspot.com',
  messagingSenderId: '736855383107',
  appId: '1:736855383107:web:ad72533514f0f2a27e48f6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
