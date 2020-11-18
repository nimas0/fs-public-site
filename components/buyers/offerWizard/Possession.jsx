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
import { Typography } from 'antd';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

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
   proposal,
   ...rest
}) => {
   const router = useRouter();
   // grab id from URL
   // interestId is formatted as listingId_buyerId
   const interestId = router.query.Offer;
   console.log(interestId);
   console.log(interestId);
   // break apart the interest id into its individual components ie. listingId_buyerId
   // const { listingId, buyerId } = Object.fromEntries(
   //    interestId.split('_').map((a, index) => {
   //       if (index === 0) {
   //          return ['listingId', a];
   //       } else if (index === 1) {
   //          return ['buyerId', a];
   //       }
   //    })
   // );

   const listingId = interestId.split('_')[0];

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
      console.log(doc);
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
                     {
                        proposal && (
                           <>
                              <p>Homeowner has indicated the following</p>
                              <Form.Label className='pb-2' data-test='step-possession-header'>
                                 {proposal.offerDetails.possession}
                              </Form.Label>
                           </>
                        )
                     }
            
                     <Form.Group controlId='formGridAddress1'>
                     {
                        proposal && (
                           <Form.Label className='pb-2' data-test='step-possession-header'>
                           The homeowner has indicated the following preferences for handing over
                           possession of the subject property:
                           <div className='m-1'>
                           <b>Possession is:</b>
                           <ul>
                           {possession.map((item) => (
                                 <li>
                                    {item.label}
                                 </li>
                              ))}
                           </ul>
                            
                           </div>
                        </Form.Label>
                        )
                     }
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
                        <Form.Group controlId='exampleForm.SelectCustom'>
                        <h6 className='pb-2' data-test='step-possession-header'>
                           Select Closing Day
                        </h6>

                        <DatePicker className='form-control' id='closingDate' name='closingDate' {...rest}  selected={values.closingDate} onChange={date => rest.setFieldValue('closingDate', date)} />

                        
                           {/* <Form.Control
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
                           </Form.Control> */}
                        </Form.Group>
                     </Form.Group>
                  </div>
               )}
            </Body>
            {/* <SideBar
               sidebarHeader='What is a possession?'
               subHeaderText={subHeaderText()}
               enabled={true}
            /> */}
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

const subHeaderText = () => (
<>
   <p>
      1. The closing - or completion - date is when ownership and title to the home are transferred along with the payment of funds from the buyer to the seller. The closing date may have to change throughout the process. Sometimes, the lender does not give final approval on the mortgage loan in time to close by the first date that was established. If this occurs, then the seller and buyer must agree to a new closing date. 
   </p>
   <p>
      2. The possession date is when the buyer is entitled to take physical possession of the home/property. This date may also change throughout the process due to contingencies. 

   </p>
</>)






export default Possession;
