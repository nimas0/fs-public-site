/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();

export function useMessenger(chatId, count) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // state to handle infinite loader

  const [firstKnownKey, setFirstKnownKey] = useState('');

  const postData = {
    author: 'HITFymnB6XahFv1IUtST0S1zuSl2',
    displayName: 'Smart Bot',
    message: 'Hello! Welcome What can I help you with?',
    photoURL:
      'https://lh3.googleusercontent.com/a/AATXAJwlxBo7ZLsvzN4twhzyAABiWPFvBpXN61qLNHtq=s96-c',
    timestamp: 1630869154948,
  };
  const reference = firebase.database().ref(`interest_chat/${chatId}`);
  useEffect(() => {
    // const childrenVal = [];
    // const childrenKey = [];
    // const getFirst = async () => {
    //   if (chatId) {
    //     await reference
    //       .limitToLast(5)
    //       .once('value')
    //       .then((snap) => {
    //         snap.forEach((childSnap) => {
    //           childrenVal.unshift(childSnap.val());
    //           childrenKey.unshift(childSnap.key);
    //         });
    //         setFirstKnownKey(childrenKey[childrenKey.length - 1]);
    //         setMessages(() => [...childrenVal]);
    //       })
    //       .catch((err) => setError(err));
    //   }
    // };

    // const exclude = (key) =>
    //   key.substring(0, key.length - 1) +
    //   String.fromCharCode(key.charCodeAt(key.length - 1) - 1);

    // const getNext = () => {
    //   console.log('called in GETNEXT');
    //   reference
    //     .orderByKey()
    //     .endAt(exclude(firstKnownKey))
    //     .limitToLast(5)
    //     .once('value')
    //     .then((snap) => {
    //       snap.forEach((childSnap) => {
    //         childrenVal.unshift(childSnap.val());
    //         childrenKey.unshift(childSnap.key);
    //       });
    //       setFirstKnownKey(childrenKey[childrenKey.length - 1]);
    //       setMessages((prev) => [...prev, ...childrenVal]);
    //     });
    // };
    // console.log('messages', messages);
    // if (messages.length === 0) {
    //   getFirst();
    //   console.log('called get first');
    // } else {
    //   getNext();
    // }

    // console.log('messagesResult', messages);
    const listener = async () =>
      reference.limitToLast(count).on('value', async (snapshot) => {
        const data = snapshot.val();
        // console.log('data');
        // console.log('data', data, !data);
        if (!data === true) {
          // setError(
          //   'Sorry we could not find this conversation. If this error persists please contact support.'
          // );
          // Write the new post's data simultaneously in the posts list and the user's post list.
          // Get a key for a new Post.
          const newPostKey = await firebase
            .database()
            .ref()
            .child('posts')
            .push().key;
          const update = {};
          update[`/interest_chat/${chatId}/${newPostKey}`] = postData;
          // console.log(newPostKey);

          // Post to firebase real time
          await firebase
            .database()
            .ref()
            .update(update, (er) => {
              if (er) {
                throw error;
              }
            });

          setLoading(false);
        } else {
          const arrayOfObj = Object.entries(data).map((e) => e[1]);
          // console.log('arrayOfObj', arrayOfObj);
          setMessages(arrayOfObj);
          setLoading(false);
          setError(false);
        }
      });
    listener();
    return reference.off('value', listener);
    setLoading(false);
    console.log(error);
  }, [count]);

  return { messages, loading, error };
}
