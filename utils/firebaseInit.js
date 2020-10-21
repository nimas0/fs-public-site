import firebase, { database } from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBDtdJhJUuHUGEFW-ViyDxJErx2JoFz8Jw",
  authDomain: "finding-spaces-73b23.firebaseapp.com",
  databaseURL: "https://finding-spaces-73b23.firebaseio.com",
  projectId: "finding-spaces-73b23",
  storageBucket: "finding-spaces-73b23.appspot.com",
  messagingSenderId: "48951865601",
  appId: "1:48951865601:web:2eb4d8a3fe14a1caf22b00",
  measurementId: "G-7CK0W02CGV"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.firestore();

export default firebase;