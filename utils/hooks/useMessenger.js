/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();

export function useMessenger(chatId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const reference = firebase.database().ref(`interest_chat/${chatId}`);
    const listener = async () =>
      reference.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('data');
        console.log('data', data, !data);
        if (!data === true) {
          // setError(
          //   'Sorry we could not find this conversation. If this error persists please contact support.'
          // );
          // setLoading(false);
          const arrayOfObj = Object.entries(data).map((e) => e[1]);
          console.log('arrayOfObj', arrayOfObj);
          setMessages(arrayOfObj);
          setLoading(false);
          setError(false);
        } else {
          const arrayOfObj = Object.entries(data).map((e) => e[1]);
          console.log('arrayOfObj', arrayOfObj);
          setMessages(arrayOfObj);
          setLoading(false);
          setError(false);
        }
      });
    listener();
    return reference.off('value', listener);
  }, []);

  return { messages, loading, error };
}
