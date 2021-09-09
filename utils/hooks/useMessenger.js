/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();

/**
 * Creates a firebase real time connection to the chat user db and displays
 * x number of results based on count input.
 * Initializes first message if one doesnt exists
 * todo: remove hard coded values such as : document route
 * @param {string} chatId - accepts this type of string listingId_buyerId
 * @param {number} count - use for pagination
 * @returns {messages, loading, error}
 */

export function useMessenger(chatId, count) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // todo: remove hard coded initializer
  // Uses this data to initalize a new conversation if it doesnt already exist
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
    const listener = async () =>
      reference.limitToLast(count).on('value', async (snapshot) => {
        const data = snapshot.val();

        if (!data === true) {
          // Write the new post's data simultaneously in the posts list and the user's post list.
          // Get a key for a new Post.
          const newPostKey = await firebase
            .database()
            .ref()
            .child('posts')
            .push().key;
          const update = {};
          update[`/interest_chat/${chatId}/${newPostKey}`] = postData;

          // Post to firebase real time
          await firebase
            .database()
            .ref()
            .update(update, (er) => {
              if (er) {
                throw error;
              }
            })
            .catch((er) => setError(er));

          setLoading(false);
        } else {
          const arrayOfObj = Object.entries(data).map((e) => e[1]);
          setMessages(arrayOfObj);
          setLoading(false);
          setError(false);
        }
      });
    listener();

    return reference.off('value', listener);
  }, [count]);

  return { messages, loading, error };
}
