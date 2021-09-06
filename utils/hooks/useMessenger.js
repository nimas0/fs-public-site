/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();

export function useMessenger(chatId) {
  // listingId_userId chat id follows this convention
  // listingId will always represent the homeowner
  // userId will always represent the other person
  //   const listingId = (chatId && chatId.split('_')[0]) || null;
  //   const userId = (chatId && chatId.split('_')[1]) || null;
  console.log('chatid', chatId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('called me');

  useEffect(() => {
    const reference = firebase.database().ref(`interest_chat/${chatId}`);
    console.log('got this far');
    const listener = async () =>
      reference.on('value', (snapshot) => {
        const data = snapshot.val();
        const arrayOfObj = Object.entries(data).map((e) => e[1]);
        console.log('arrayOfObj', arrayOfObj);
        setMessages(arrayOfObj);
        setLoading(false);
      });
    listener();
    return reference.off('value', listener);
  }, []);

  return { messages, loading };
}
