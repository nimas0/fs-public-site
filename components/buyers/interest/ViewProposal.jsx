import React, { useEffect } from 'react';
import { Row, Col, Button, Container, Collapse, ListGroup } from 'react-bootstrap';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import firebaseInit from '../../../utils/firebaseInit';
import { useDocument, useCollectionData } from 'react-firebase-hooks/firestore';
import Timer from '../../Timer';

// Initialize Firebase app
firebaseInit();

const ViewProposal = ({ toggle, setToggle, handleToggleSidebar, interestId, interestData, proposalData }) => {
   // interest id includes embed buyer id after '_' underscore
   const MY_USER_ID = interestId.split('_')[1];
   const isMine = interestData.proposal ? MY_USER_ID === interestData.proposal.offererId : '';

   return (
      <>
         <Collapse timeout={100} dimension='width' in={toggle}>
            <Col noGutters className='ml-0' md={4}>
               <div className='sidebar  bg-light  mb-2 defaultCard h-100'>
                  <div className='header bg-info border-0 d-flex align-items-center'>
                     <Row noGutters className='p-3 w-100'>
                        <Col xs={1} className='p-1'>
                           <Button
                              variant='link'
                              className='rounded=sm'
                              onClick={() => setToggle((prevState) => !prevState)}>
                              <FontAwesomeIcon icon={faTimes} />
                           </Button>
                        </Col>
                        <Col xs={9} className='p-2 '>
                           <h4 className='text-white mt-1'>
                              {isMine ? (
                                 <>
                                    <h5 className='text-white d-inline pr-3'>
                                       You made a proposal for
                                    </h5>
                                    <NumberFormat
                                       value={proposalData && proposalData.offerDetails.amount}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       prefix={'$'}
                                    />
                                 </>
                              ) : (
                                 <>
                                    <h5 className='text-white d-inline pr-3'>
                                       HOMEOWNER HAS OFFERED YOU
                                    </h5>
                                    <NumberFormat
                                       value={proposalData && proposalData.offerDetails.amount}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       prefix={'$'}
                                    />
                                 </>
                              )}
                           </h4>
                        </Col>
                     </Row>
                  </div>
                  <div className=' p-3 header bg-white border-bottom border-right-0 border-left-0 d-flex align-items-center'>
                     <Row noGutters className='d-flex justify-content-start w-100'>
                        Offer Expires in {<h6><Timer initialMinute={59} /></h6>}
                     </Row>
                  </div>
                  <Row className='p-1 w-100'>
                     <Col className='border-right m-2 h-100' xs={7}>
                        <h4 className='p-2'>Terms</h4>
                        <ListGroup variant='flush' className='bg-light rounded-0'>
                           <ListGroup.Item className='bg-light p-2'>
                              Lender:<h6>Bank of America</h6>
                           </ListGroup.Item>
                           <ListGroup.Item className='bg-light p-2'>
                              Loan Type:<h6>Conv 10 year down</h6>
                           </ListGroup.Item>
                           <ListGroup.Item className='bg-light p-2'>
                              Amount:
                              <h6>
                                 <NumberFormat
                                    value={proposalData && proposalData.offerDetails.amount}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                 />
                              </h6>
                           </ListGroup.Item>
                           <ListGroup.Item className='bg-light p-2'>
                              Deposit:
                              <h6>
                                 <NumberFormat
                                    value={proposalData && proposalData.offerDetails.deposit}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                 />
                              </h6>
                           </ListGroup.Item>
                           <ListGroup.Item className='bg-light p-2'>
                              Contengency:
                              <h6>{proposalData && proposalData.offerDetails.contingency}</h6>
                           </ListGroup.Item>
                        </ListGroup>
                     </Col>
                     <Col className='b m-2 h-100'>
                        <h4 className='pt-2 mb-4'>Remarks</h4>
                        <p>{proposalData && proposalData.offerDetails.comment}</p>
                     </Col>
                  </Row>
                  <Row noGutters className='  d-flex pt-5 justify-content-center w-100'>
                     <small>
                        This is not an official offer. At this stage of the process you are only
                        verbally agreeing to the terms.
                     </small>
                  </Row>
                  <div className='footer border border-top d-flex align-items-center'>
                     <Row noGutters className='  d-flex justify-content-center w-100'>
                        <Col
                           xs={4}
                           as={Button}
                           disabled={isMine}
                           variant='primary'
                           onClick={() => setToggle((prevState) => !prevState)}
                           className='defaultCard rounded-0 bg-primary p-4 border-right justify-content-center d-flex '>
                           <div>
                              <h6 className='pt-2 text-white'>ACCEPT</h6>
                           </div>
                        </Col>
                        <Col
                           xs={4}
                           as={Button}
                           variant='primary'
                           disabled={isMine}
                           onClick={() => setToggle((prevState) => !prevState)}
                           className='defaultCard bg-primary rounded-0 p-4 border-right justify-content-center d-flex '>
                           <div>
                              <h6 className='pt-2 text-white'>COUNTER</h6>
                           </div>
                        </Col>
                        <Col
                           xs={4}
                           as={Button}
                           disabled={isMine}
                           variant='dark'
                           onClick={() => setToggle((prevState) => !prevState)}
                           className='border-0 defaultCard rounded-0 bg-info p-4 border-right justify-content-center d-flex '>
                           <div>
                              <h6 className='pt-2 text-white'>REJECT</h6>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </div>
            </Col>
         </Collapse>
      </>
   );
};

export default ViewProposal;
