import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFrownOpen, faBell } from '@fortawesome/free-solid-svg-icons';

export const Pending = () => (
   <span className='mx-2'>
      <Row>
         <Col>
            <Card className='border-0 bg-transparent'>
               {/* <Card.Header className='py-4 bg-transparent border-0 text-muted' as='h5'>
                  Pre-Approval
               </Card.Header> */}
               <Card.Body className='text-center py-1'>
                  <div className='text-success d-flex justify-content-start py-3 '>
                     <FontAwesomeIcon size='2x' icon={faCheck} />
                     <h4 className='ml-3 text-success pt-1'>Pending Review</h4>
                  </div>

                  <Card.Text>
                     <h6 className=' text-dark text-left px-1 pt-0 mt-0 pt-2'>
                        Scheduling has been unlocked. You will be notified of your approval within 3
                        hours of submittion.
                     </h6>
                  </Card.Text>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   </span>
);

export const Approved = () => (
   <span className='mx-4'>
      <Row>
         <Col>
            <Card className='defaultCard'>
               <Card.Header className='py-4 text-muted' as='h5'>
                  Qualification
               </Card.Header>
               <Card.Body className='text-center pt-4 pb-5 px-3'>
                  <Row className='px-4'>
                     <Col xs={8} className='pt-4'>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Lender: </b>
                           </h6>
                           <h6>Back of America </h6>
                        </Row>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Loan Type: </b>
                           </h6>
                           <h6>Conv. 10 Year</h6>
                        </Row>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Amount: </b>
                           </h6>
                           <h6>$150,000</h6>
                        </Row>
                     </Col>
                     <Col xs={4}>
                        <div className='text-dark'>
                           <b>Expires</b>
                        </div>
                        <div className='border border-info p-2 mt-1 pt-2 rounded'>
                           <h4 className='text-success p-0 mb-0'>
                              <b>28</b>
                           </h4>
                           <h5 className='text-success p-0'>
                              <b>July</b>
                           </h5>
                        </div>
                     </Col>
                  </Row>
                  <Card.Text></Card.Text>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   </span>
);

export const Denied = ({ reset }) => {
   return (
      <span className='mx-4'>
         <Row>
            <Col>
               <Card className='defaultCard'>
                  <Card.Header className='py-3 text-muted' as='h5'>
                     Pre-Approval
                  </Card.Header>
                  <Card.Body className='text-left py-5'>
                     <div className='text-warning d-flex justify-content-start px-3 '>
                        <FontAwesomeIcon size='2x' icon={faFrownOpen} />
                        <h4 className='ml-3 text-dark pt-1'>Something went wrong</h4>
                     </div>

                     <Card.Text className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
                        <h6>
                           Your pre-approval did not qualify based on the this home's
                           qualifications. Please review the home policy and try again. If you
                           believe this to be a mistake please contact support at
                           team@findingspaces.com
                        </h6>
                        <Button className='mt-2' onClick={reset}>
                           Try Again
                        </Button>
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </span>
   );
};

export const Expired = ({ uploadPageRedirect }) => (
   <span className='mx-4'>
      <Row>
         <Col>
            <Card className='defaultCard'>
               <Card.Header className='py-4 text-muted' as='h5'>
                  Pre-Approval
               </Card.Header>
               <Card.Body className='text-center py-5 '>
                  <div className='text-danger d-flex justify-content-start px-3 '>
                     <FontAwesomeIcon size='2x' icon={faBell} />
                     <h4 className='ml-3 text-danger pt-1'>Your qualification has expired.</h4>
                  </div>

                  <Card.Text className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
                     <h6>
                        In order to view a home you will need to update your Verification document.
                     </h6>
                     <Button variant='danger' className='rounded-lg mt-2' onClick={uploadPageRedirect}>
                        Update Verification
                     </Button>
                  </Card.Text>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   </span>
);
