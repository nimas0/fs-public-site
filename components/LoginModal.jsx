/*
 * TODO: Add buyer dashboard link
 */

'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Spinner, ModalBody } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
<<<<<<< HEAD
// import 'firebase/auth';
// import fetch from 'isomorphic-unfetch';
// import firebaseInit from '../utils/firebaseInit';
// import uploadUserDocument from '../utils/uploadUserDocument';
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';

// // Initialize Firebase app
// firebaseInit();
=======
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import firebaseInit from '../utils/firebaseInit';
import uploadUserDocument from '../utils/uploadUserDocument';
import Countdown from 'react-countdown';

// Initialize Firebase apppppp
firebaseInit();
>>>>>>> experiement-buyer

export default ({ shown, setShown }) => {
   // FirebaseUI does not support server-side rendering
   // https://github.com/firebase/firebaseui-web/issues/213
   const [renderAuth, setRenderAuth] = useState(false);
   useEffect(() => {
      if (typeof window !== 'undefined') {
         setRenderAuth(true);
      }
   }, []);

   const router = useRouter();

   // File input
   const fileInput = useRef(0);
   const [fileSelected, setFileSelected] = useState(false);
   const [userId, setUserId] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [uploadFailure, setUploadFailure] = useState(false);

   // Modal navigation
   const [page, setPage] = useState('auth');
   const close = () => {
      setShown(false);
      setTimeout(() => {
         setPage('auth');
         setUploading(false);
         setUploadFailure(false);
      }, 1000);
   };
   const [newUser, setNewUser] = useState(undefined);

   // Firebase auth config
   // const firebaseAuthConfig = {
   //    signInFlow: 'popup',
   //    // Auth providers
   //    signInOptions: [
   //       {
   //          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
   //          requireDisplayName: false,
   //       },
   //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   //       {
   //          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
   //          scopes: ['public_profile', 'email'],
   //       },
   //    ],
   //    credentialHelper: 'none',
   //    callbacks: {
   //       signInSuccessWithAuthResult: (authResult) => {
   //          setUserId(authResult.user.uid);
   //          processUser(authResult, (isNew, verified) => {
   //             console.log(verified);
   //             setNewUser(isNew);
   //             if (verified) {
   //                // (fulfills on true or "pending")
   //                // Login complete
   //                close();
   //             } else {
   //                // Go to verification
   //                setPage('verification');
   //             }
   //          });
   //          setPage('authWait');
   //          return false; // Prevents redirect
   //       },
   //    },
   // };

   return (
<<<<<<< HEAD
      <Modal style={{color: '#ffff', opacity: 1}} className='border-0 m-4 '  centered show={shown} onHide={close} backdrop={uploading ? 'static' : true}>
            <>
               <Modal.Header  className='text-white bg-dark schedulingShadow' closeButton>
                  <Modal.Title  className=' text-center '>Full Website Coming Soon</Modal.Title>
=======
      <Modal className='border-0' show={shown} onHide={close} backdrop={uploading ? 'static' : true}>
         {page === 'auth' ? (
            <>
               <Modal.Header className='border-0 text-muted text-uppercase' closeButton>
              
>>>>>>> experiement-buyer
               </Modal.Header>
      

<<<<<<< HEAD
               <Modal.Body className='pt-5  bg-light px-3 text-center text-secondary'>
=======
               <Modal.Body className='pt-2 text-center border-0'>
                  {/* {renderAuth ? (
                     <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                     />
                  ) : null} */}
                      <h6>Login and Full Features Available in:</h6>
                  <Countdown
                  className='p-5 text-center text-bold'
                     date={new Date('11/01/2020')}
                     precision={1}
                     renderer={props => <h5 className='p-2'><b>{`${props.days} days,   ${props.hours} hour(s),   ${props.minutes} minutes, ${props.seconds} seconds`}</b> </h5>}
                  />
               </Modal.Body>
               <Modal.Body className='pb-5 text-center'>
>>>>>>> experiement-buyer
                  {/* {renderAuth ? (
                     <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                     />
                  ) : null} */}
<<<<<<< HEAD
                     Alpha version with all features is available in: <h2 className='mt-4'><Countdown date={new Date(2020, 10)} /></h2>
=======
                 
                  <Button href='/learnmore' size='large' className=' px-5 py-3 text-uppercase text-primary text-bold' variant='outlined-primary'>Learn More</Button>
               </Modal.Body>
            </>
         ) : page === 'authWait' ? (
            <>
               <Modal.Header closeButton>
                  <Modal.Title>Please Sign In</Modal.Title>
               </Modal.Header>

               <Modal.Body className='text-center'>
                  <Spinner animation='border' variant='primary' />
>>>>>>> experiement-buyer
               </Modal.Body>
               <Modal.Body className='pb-5 px-5 pt-0 text-center text-secondary'>
                  In the meantime, please visit our learn more page:

<<<<<<< HEAD
                  <Button size='large' variant='outlined' className='text-primary ' onClick={() => router.push('/learnmore')}>LEARN MORE</Button>
=======
               <Modal.Body>
                  <p>
                     You have successfully created an account! If you did not upload a pre-approval
                     you may still secure a time and date with this home. If you still have not
                     uploaded a pre-approval within 12 hours of the appointment, the appointment
                     will automatically be canceled.
                  </p>
>>>>>>> experiement-buyer
               </Modal.Body>
            </>
      </Modal>
   );

   // async function processUser(authResult, callback) {
   //    const { uid: id, displayName, photoURL } = authResult.user;

   //    // Get or create user in Firestore
   //    try {
   //       const response = await fetch('/api/check-user', {
   //          method: 'POST',
   //          headers: { 'Content-Type': 'application/json' },
   //          body: JSON.stringify({ id, displayName, photoURL }),
   //       });

   //       if (response.ok) {
   //          // Return whether this user is new and user's verification status
   //          const { created: isNew, verification } = await response.json();
   //          const { status: verified } = verification;
   //          return callback(isNew, verified);
   //       } else {
   //          // https://github.com/developit/unfetch#caveats
   //          let error = new Error(response.statusText);
   //          error.response = response;
   //          throw error;
   //       }
   //    } catch (err) {
   //       console.error(
   //          'Auth success but database failure. Either a coding error or network issues.',
   //          err
   //       );
   //       close();
   //    }
   // }

   // async function uploadVerification() {
   //    // Set loading animations
   //    setUploading(true);

   //    // Remove upload failure message if there
   //    setUploadFailure(false);

   //    if (fileInput.current.files[0]) {
   //       try {
   //          // Upload file to Cloud Storage
   //          const documentURL = await uploadUserDocument(
   //             fileInput.current.files[0],
   //             `users/${userId}`
   //          );

   //          // Send file info through API
   //          const response = await fetch('/api/verification-doc', {
   //             method: 'POST',
   //             headers: { 'Content-Type': 'application/json' },
   //             body: JSON.stringify({ documentURL, userId }),
   //          });

   //          if (response.ok) {
   //             // Move on
   //             if (newUser) {
   //                setPage('welcome');
   //             } else {
   //                setPage('uploaded');
   //             }
   //          } else {
   //             // https://github.com/developit/unfetch#caveats
   //             let error = new Error(response.statusText);
   //             error.response = response;
   //             throw error;
   //          }
   //       } catch (err) {
   //          // Add upload failure message
   //          console.error('Either a coding error or network issues', err);
   //          setUploadFailure(true);
   //          setUploading(false);
   //       }
   //    } else {
   //       // Treat it as skipping the file upload
   //       if (newUser) {
   //          setPage('welcome');
   //       } else {
   //          close();
   //       }
   //    }
   // }
};
