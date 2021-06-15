

import firebase, { database } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/functions';







export default () => {
  // Initialize Firebase if it hasn't been already
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    });
  }





// Initialize Firebase

  firebase.functions().useEmulator('localhost', 5001);

const auth = firebase.auth();
const db = firebase.firestore();


  db.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');

};

