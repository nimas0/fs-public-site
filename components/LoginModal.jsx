/*
 * TODO: Add buyer dashboard link
 */

'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Spinner, ModalBody } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
// import 'firebase/auth';
// import fetch from 'isomorphic-unfetch';
// import firebaseInit from '../utils/firebaseInit';
// import uploadUserDocument from '../utils/uploadUserDocument';
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';
import useMediaBreakpoints from '@tywmick/use-media-breakpoints';

// // Initialize Firebase app
// firebaseInit();

export default ({ shown, setShown }) => {
   // FirebaseUI does not support server-side rendering
   // https://github.com/firebase/firebaseui-web/issues/213
   const [renderAuth, setRenderAuth] = useState(false);
   const breakpoint = useMediaBreakpoints();


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
      <Modal style={{color: '#ffff', opacity: 1}} className='border-0 '  centered show={shown} onHide={close} backdrop={uploading ? 'static' : true}>
            <>
               <Modal.Header  className='text-white bg-dark border-0 schedulingShadow' closeButton>
                  <Modal.Title  className=' text-center '>Full Website Coming Soon</Modal.Title>
               </Modal.Header>
      

               <Modal.Body className='pt-5  bg-light px-3 text-center text-secondary'>
                  {/* {renderAuth ? (
                     <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                     />
                  ) : null} */}
                     Alpha version with all features is available in: <h2 className='mt-4'><Countdown  renderer={props => <h6>{props.days} days | {props.hours} hrs | {props.minutes} min | {props.seconds} secs</h6>} date={new Date(2020, 10, 9)} /></h2>
               </Modal.Body>
               <Modal.Body className='pb-5 px-5 pt-0 text-center text-secondary'>
                  In the meantime, please visit our learn more page:

                  <Button size='large' variant='outlined' className='text-primary ' onClick={() => router.push('/learnmore')}>LEARN MORE</Button>
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
