/*
 * TODO: Add buyer dashboard link
 */

'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import firebaseInit from '../utils/firebaseInit';
import uploadUserDocument from '../utils/uploadUserDocument';

// Initialize Firebase app
firebaseInit();

export default ({ shown, setShown }) => {
   // FirebaseUI does not support server-side rendering
   // https://github.com/firebase/firebaseui-web/issues/213
   const [renderAuth, setRenderAuth] = useState(false);
   useEffect(() => {
      if (typeof window !== 'undefined') {
         setRenderAuth(true);
      }
   }, []);

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
   const firebaseAuthConfig = {
      signInFlow: 'popup',
      // Auth providers
      signInOptions: [
         {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
         },
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ['public_profile', 'email'],
         },
      ],
      credentialHelper: 'none',
      callbacks: {
         signInSuccessWithAuthResult: (authResult) => {
            setUserId(authResult.user.uid);
            processUser(authResult, (isNew, verified) => {
               console.log(verified);
               setNewUser(isNew);
               if (verified) {
                  // (fulfills on true or "pending")
                  // Login complete
                  close();
               } else {
                  // Go to verification
                  setPage('verification');
               }
            });
            setPage('authWait');
            return false; // Prevents redirect
         },
      },
   };

   return (
      <Modal show={shown} onHide={close} backdrop={uploading ? 'static' : true}>
         {page === 'auth' ? (
            <>
               <Modal.Header closeButton>
                  <Modal.Title>Please Sign In</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  {renderAuth ? (
                     <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                     />
                  ) : null}
               </Modal.Body>
            </>
         ) : page === 'authWait' ? (
            <>
               <Modal.Header closeButton>
                  <Modal.Title>Please Sign In</Modal.Title>
               </Modal.Header>

               <Modal.Body className='text-center'>
                  <Spinner animation='border' variant='primary' />
               </Modal.Body>
            </>
         ) : page === 'verification' ? (
            <>
               <Modal.Header>
                  <Modal.Title>Upload Pre-Approval</Modal.Title>
                  {/* Using custom button so I can disable it */}
                  <button
                     type='button'
                     className='close'
                     onClick={close}
                     aria-label='Close'
                     disabled={uploading}>
                     <span aria-hidden='true'>&times;</span>
                  </button>
               </Modal.Header>

               <Modal.Body>
                  <p>
                     You need to upload a verified pre-approval or proof of funds to book a tour
                     with a home. You may skip this process for now.
                  </p>
                  <Form.Control
                     ref={fileInput}
                     type='file'
                     name='document'
                     aria-label='Verification document'
                     onChange={(e) => setFileSelected(!!e.target.files)}
                     disabled={uploading}
                  />
                  {uploadFailure && (
                     <Form.Control.Feedback type='invalid'>
                        We're experiencing network errors&mdash;please try again later.
                     </Form.Control.Feedback>
                  )}
               </Modal.Body>

               <Modal.Footer>
                  <Button
                     variant='secondary'
                     onClick={() => (newUser ? setPage('welcome') : close())}
                     disabled={uploading}>
                     Skip
                  </Button>
                  <Button
                     variant='primary'
                     onClick={uploadVerification}
                     disabled={!fileSelected || uploading}>
                     {uploading ? (
                        <>
                           <Spinner
                              as='span'
                              animation='border'
                              size='sm'
                              role='status'
                              aria-hidden='true'
                              className='position-relative mr-2'
                              style={{ bottom: 3 }}
                           />
                           Uploading...
                        </>
                     ) : (
                        'Upload'
                     )}
                  </Button>
               </Modal.Footer>
            </>
         ) : page === 'welcome' ? (
            <>
               <Modal.Header closeButton>
                  <Modal.Title>Welcome!</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  <p>
                     You have successfully created an account! If you did not upload a pre-approval
                     you may still secure a time and date with this home. If you still have not
                     uploaded a pre-approval within 12 hours of the appointment, the appointment
                     will automatically be canceled.
                  </p>
               </Modal.Body>

               <Modal.Footer>
                  <Button variant='secondary' onClick={close}>
                     Return to listing
                  </Button>
                  <Button variant='primary' href='#'>
                     {/* TODO: Add buyer dashboard link */}
                     Go to buyer dashboard
                  </Button>
               </Modal.Footer>
            </>
         ) : (
            // page === "uploaded"
            <>
               <Modal.Header closeButton>
                  <Modal.Title>Upload complete!</Modal.Title>
               </Modal.Header>

               <Modal.Footer>
                  <Button variant='secondary' onClick={close}>
                     Return to listing
                  </Button>
                  <Button variant='primary' href='#'>
                     {/* TODO: Add buyer dashboard link */}
                     Go to buyer dashboard
                  </Button>
               </Modal.Footer>
            </>
         )}
      </Modal>
   );

   async function processUser(authResult, callback) {
      const { uid: id, displayName, photoURL } = authResult.user;

      // Get or create user in Firestore
      try {
         const response = await fetch('/api/check-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, displayName, photoURL }),
         });

         if (response.ok) {
            // Return whether this user is new and user's verification status
            const { created: isNew, verification } = await response.json();
            const { status: verified } = verification;
            return callback(isNew, verified);
         } else {
            // https://github.com/developit/unfetch#caveats
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
         }
      } catch (err) {
         console.error(
            'Auth success but database failure. Either a coding error or network issues.',
            err
         );
         close();
      }
   }

   async function uploadVerification() {
      // Set loading animations
      setUploading(true);

      // Remove upload failure message if there
      setUploadFailure(false);

      if (fileInput.current.files[0]) {
         try {
            // Upload file to Cloud Storage
            const documentURL = await uploadUserDocument(
               fileInput.current.files[0],
               `users/${userId}`
            );

            // Send file info through API
            const response = await fetch('/api/verification-doc', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ documentURL, userId }),
            });

            if (response.ok) {
               // Move on
               if (newUser) {
                  setPage('welcome');
               } else {
                  setPage('uploaded');
               }
            } else {
               // https://github.com/developit/unfetch#caveats
               let error = new Error(response.statusText);
               error.response = response;
               throw error;
            }
         } catch (err) {
            // Add upload failure message
            console.error('Either a coding error or network issues', err);
            setUploadFailure(true);
            setUploading(false);
         }
      } else {
         // Treat it as skipping the file upload
         if (newUser) {
            setPage('welcome');
         } else {
            close();
         }
      }
   }
};
