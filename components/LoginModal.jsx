/*
 * TODO: Add buyer dashboard link
 */

'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Spinner, ModalBody } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import firebaseInit from '../utils/firebaseInit';
import uploadUserDocument from '../utils/uploadUserDocument';
import PhoneInput from 'react-phone-number-input'
import Upload from '../components/buyers/approval/UploadForm'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useRouter } from 'next/router';
// Initialize Firebase app
firebaseInit();

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
   const router = useRouter();
   // phone number
   const [number, setNumber] = useState('');
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




   async function uploadNumber() {
      // Set loading animations
      setUploading(true);
   
      // Remove upload failure message if there
      setUploadFailure(false);
   
   
         try {
            
         if(!isValidPhoneNumber(number)) {
             // https://github.com/developit/unfetch#caveats
             let error = new Error('Wrong format');
             throw error;
         }
               // Send file info through API
               const response = await fetch('/api/upload-number', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ number, userId }),
               });
               setPage('verification');
               if (response.ok) {
                  // Move on
                  setPage('verification');
                  setUploading(false);
               } else {
                  // https://github.com/developit/unfetch#caveats
                  let error = new Error(response.statusText);
                  error.response = response;
                  throw error;
               }
         } catch (err) {
            // Add upload failure message
            console.error('Either a coding error or network issues', err);
            console.error('Either a coding error or network issues');
            setUploadFailure(true);
            setUploading(false);
         }
    
   }






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
                  setPage('number');
               }
            });
            setPage('authWait');
            return false; // Prevents redirect
         },
      },
   };

   return (
      <Modal size={page === 'verification' ? 'xl' : ''} centered animation show={shown}  backdrop={uploading ? 'static' : true}>
         {page === 'auth' ? (
            <>
               <Modal.Header className='bg-info text-white' closeButton>
                  <Modal.Title>Please Sign In</Modal.Title>
                  
               </Modal.Header>
      

               <Modal.Body className='pt-5  bg-light px-3 text-center text-secondary'>
                  {/* {renderAuth ? (
                     <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                     />
                  ) : null} */}
                     Beta version with all features is available in: <h2 className='mt-4'><Countdown  renderer={props => <h6>{props.days} days | {props.hours} hrs | {props.minutes} min | {props.seconds} secs</h6>} date={new Date(2020, 10, 19)} /></h2>
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
               <Upload userId={userId} setPage={setPage} newUser={newUser} />
               {/* <Modal.Footer>
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
               </Modal.Footer> */}
            </>
               ) : page === 'number' ? (
                  <>
                     <Modal.Header>
                        <Modal.Title>Enter your phone number</Modal.Title>
                        {/* Using custom button so I can disable it */}
                        {/* <button
                           type='button'
                           className='close'
                           onClick={close}
                           aria-label='Close'
                           disabled={uploading}>
                           <span aria-hidden='true'>&times;</span>
                        </button> */}
                     </Modal.Header>
      
                     <Modal.Body>
        
                        <PhoneInput
                           defaultCountry='US'
                           placeholder="Enter phone number"
                           value={number}
                           onChange={setNumber}/>
                        {/* <Form.Control
                           type="tel"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           required
                           name='number'
                           aria-label='Verification document'
                           onChange={(e) => setNumber(e.target.value)}
                           disabled={uploading}
                        />
                        <small>Format: 123-456-7890</small> */}
                        {uploadFailure && (
                           <Form.Control.Feedback type='invalid'>
                              We're experiencing network errors&mdash;please try again later.
                           </Form.Control.Feedback>
                        )}
                     </Modal.Body>
      
                     <Modal.Footer>
                        <Button
                           disabled={!isValidPhoneNumber(number)}
                           variant='primary'
                           onClick={uploadNumber}
                          >
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
                                 Loading...
                              </>
                           ) : (
                              'Next'
                           )}
                        </Button>
                     </Modal.Footer>
                  </>
         ) : page === 'welcome' ? (
            <>
               <Modal.Header className='bg-info text-white' closeButton>
                  <Modal.Title>Welcome!</Modal.Title>
               </Modal.Header>

               <Modal.Body className='p-5 text-centered'>
                  <p>
                  <p> 
                      “Finding Spaces Beta is a public feature-testing version of Finding Spaces, offering the newest features before they are available to the general public. 
                       In contrast, Finding Spaces Beta is feature conservative, ensuring its functionality is maximally reliable and dependable for the general public. 
                     We highly appreciate any constructive criticism. Please reach out to us at support@findingspaces.com if you come across any complications with the platform or have any suggestions for a better customer experience. 
                     To show our appreciation for being early users, professional photography, and our yard sign service is entirely free! Use coupon code - FINDINGSPACES”
                  </p>
                  </p>
               </Modal.Body>

               <Modal.Footer>
                  <Button variant='secondary' onClick={close}>
                     Close
                  </Button>
                  {/* <Button variant='primary' onClick={() => router.push('/buyer/dashboard')}>
                   
                     Go to buyer dashboard
                  </Button> */}
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
         )
         }
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


