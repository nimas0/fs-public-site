import React from 'react';
import './Compose.css';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/database';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import firebaseInit from '../../../../utils/firebaseInit';

// Initialize Firebase app
firebaseInit();

export default function Compose({
  messagesEndRef,
  auth,
  rightItems,
  setProposalData,
}) {
  // get id from url
  const router = useRouter();
  const { interestId } = router.query;

  const submitMessage = async (values, { resetForm }) => {
    try {
      console.log(auth.AuthUser);
      const { message } = values;
      const { displayName, photoURL, id } = auth.AuthUser;
      // new message entry
      const newMessage = {
        displayName,
        photoURL,
        author: id,
        message,
        timestamp: Date.now(),
      };
      // Get a key for a new Post.
      const newPostKey = await firebase
        .database()
        .ref()
        .child('posts')
        .push().key;
      const update = {};
      update[`/interest_chat/${interestId}/${newPostKey}`] = newMessage;
      console.log(newPostKey);
      await firebase
        .database()
        .ref()
        .update(update);
      resetForm();
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      // TODO: inefficent calls to firestore to count messages
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={{ message: '' }} onSubmit={submitMessage}>
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <div className='compose'>
            <Form.Control
              autoFocus
              wrap='soft'
              name='message'
              className='compose-input'
              type='text'
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.message && !!errors.message}
              placeholder='Type a message, @name'
            />
            {rightItems}
          </div>
        </Form>
      )}
    </Formik>
  );
}
