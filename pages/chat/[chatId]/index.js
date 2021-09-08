import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';
import ChatComponent from '../../../components/chat-ui/ChatComponent';
import './standard.css';
import ChatHeader from '../../../components/chat-ui/ChatHeader';
import { useMessenger } from '../../../utils/hooks/useMessenger';
import 'firebase/database';
import firebaseInit from '../../../utils/firebaseInit';
import useOnlineChat from '../../../utils/hooks/useOnlineChat';
import { DrawerProvider } from '../../../contexts/drawer/drawer.provider';

// Initialize Firebase app
firebaseInit();

const Chat = ({ AuthUserInfo, showLoginModal }) => {
  const { AuthUser = null } = AuthUserInfo;
  const [messageGroupCounter, setMessageGroupCounter] = useState(20);
  const router = useRouter();
  console.log('counterMessage', messageGroupCounter);
  useEffect(() => {
    if (!AuthUser) {
      router.back();
      // todo: add a toast explaining they need to login.
    }
  });

  // todo: migrate interestId to be called chatId
  // will affect database and seller app
  const { chatId } = router.query;

  const { messages, loading, error } = useMessenger(
    chatId,
    messageGroupCounter
  );
  const { isOnline, loading: processing } = useOnlineChat(chatId);
  const submitMessage = async (message) => {
    try {
      const { displayName, photoURL, id } = AuthUser;
      // new message entry
      const newMessage = {
        displayName,
        photoURL,
        author: id,
        message,
        timestamp: Date.now(),
      };
      // Get a key for a new Post.
      const newPostKey = firebase
        .database()
        .ref()
        .child('posts')
        .push().key;
      const update = {};
      update[`/interest_chat/${chatId}/${newPostKey}`] = newMessage;
      console.log(newPostKey);
      await firebase
        .database()
        .ref()
        .update(update);
    } catch (err) {
      console.log(err);
    }
  };
  console.log('error', error);
  if (processing) console.log('isOnline', isOnline);
  if (loading) return <p>loading</p>;
  if (error) return <p>{error}</p>;
  return (
    <DrawerProvider>
      <div>
        <Head>
          <title>Chat with Seller</title>
        </Head>
        <ChatHeader
          AuthUser={AuthUser}
          router={router}
          listingId={router.query.chatId.split('_')[0]}
        />

        <ChatComponent
          setMessageGroupCounter={setMessageGroupCounter}
          showLoginModal={showLoginModal}
          messages={messages}
          agentUser={AuthUser.id}
          iconSend={<FontAwesomeIcon icon={faCheck} size={15} />}
          onMessageSend={(message) => submitMessage(message)}
          timeFormatter='timeFormatter'
          displayStop
          onMessageStop={() => null}
        />
      </div>
    </DrawerProvider>
  );
};

export default withAuthUser(withAuthUserInfo(withLoginModal(Chat)));
