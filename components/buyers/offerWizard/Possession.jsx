import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

//firebase initialization imports
import firebaseInit from '../../../utils/firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

// Initialize Firebase app
firebaseInit();

const Possession = ({
   errors,
   touched,
   handleChange,
   values,
   handleBlur,
   sending,
   dirty,
   ...rest
}) => {
   const router = useRouter();
   // grab id from URL
   // interestId is formatted as listingId_buyerId
   const interestId = router.query.offer;

   // break apart the interest id into its individual components ie. listingId_buyerId
   const { listingId, buyerId } = Object.fromEntries(
      interestId.split('_').map((a, index) => {
         if (index === 0) {
            return ['listingId', a];
         } else if (index === 1) {
            return ['buyerId', a];
         }
      })
   );

   const [doc, loadingDoc, errorDoc] = useDocumentData(
      firebase
         .firestore()
         .collection('listings')
         .doc(listingId)
   );

   /// LEFT OFF HERE... firebase listing doc loading in
   // now just need to wire up possession to UI
   let possession = [];
   if (!loadingDoc && !errorDoc) {
      possession = doc.homeFeatures.possession.filter((type) => type.value === true);
   }

   return (
      <div data-test='step-possession'>
         <Row>
            <Body className='d-flex justify-content-center'>
               {errorDoc && <strong>Error: {JSON.stringify(error)}</strong>}
               {loadingDoc && <span>Loading...</span>}
               {doc && (
                  <div className='w-75'>
                     <Form.Group controlId='formGridAddress1'>
                        <Form.Label className='pb-2' data-test='step-possession-header'>
                           The homeowner has indicated the following preferences for handing over
                           possession of the subject property:
                           <div className='m-2'>
                              {possession.map((item) => (
                                 <p>
                                    <b>Possession is: {item.label}</b>
                                 </p>
                              ))}
                           </div>
                        </Form.Label>
                        <Form.Group controlId='exampleForm.SelectCustom'>
                           <Form.Control
                              name='possession'
                              value={values.possession}
                              onChange={handleChange}
                              className='rounded-sm w-100'
                              style={{ display: 'block' }}
                              as='select'
                              custom>
                              <option label='Choose an option' />
                              {Object.entries(rest.possessionOptions).map((option) => (
                                 <option value={option[1]} label={option[1]} />
                              ))}
                           </Form.Control>
                        </Form.Group>
                     </Form.Group>
                  </div>
               )}
            </Body>
            <SideBar
               sidebarHeader='What is a possession?'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            />
         </Row>
         <Footer
            disabledNext={
               !(values.possession.length > 0) || (touched.possession && !!errors.possession)
            }
            {...rest}
         />
      </div>
   );
};

export default Possession;
