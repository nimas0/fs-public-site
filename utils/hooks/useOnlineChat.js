/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();
/**
 * This hook generates a users presence
 * and disconnects automatically when leaving page.
 * @param {string} userId - get this from the auth() provider instead of props
 * @param {*} listingId - reference to a home
 * @returns {loading, error, status} - status return either true or false
 */
const useOnlineChat = (chatId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const userId = chatId.split('_')[1];
  const listingId = chatId.split('_')[0];

  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  // Create a reference to the special '.info/connected' path in
  // Realtime Database. This path returns `true` when connected
  // and `false` when disconnected.
  useEffect(() => {
    const userStatusDatabaseRef = firebase
      .database()
      .ref(`online/${chatId}/${userId}`);
    firebase
      .database()
      .ref('.info/connected')
      .on('value', (snapshot) => {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
          return;
        }

        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect()
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            setLoading(false);
            setIsOnline(true);
            userStatusDatabaseRef.set(isOnlineForDatabase);
          });
      });
  }, []);

  return { isOnline, loading };
};

export default useOnlineChat;
