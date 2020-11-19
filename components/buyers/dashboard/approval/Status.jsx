import React from 'react';
import { Card, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFrownOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
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
                     <h6 className='text-dark text-left px-1 pt-0 mt-0 pt-2'>
                        Scheduling has been unlocked. You will be notified of your approval within 3
                        hours of submittion.
                     </h6>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   </span>
);


export const Approved = ({verification: { createdAt, lender, loanType, verifType, amount, documentURL }}) => (
   <span className='mx-4'>
      <Row>
         <Col>
            <Card className='border-0'>
            <Card.Header className='py-2 bg-light border-0 '>
            
               <Row className='my-2'>
                  <Col xs={9} className='pt-1'>
                 <h5 className='text-secondary'>Qualification</h5>
                  </Col>
               <Col xs={3}>
  
                     <Button variant='outlined' as='a'  href={documentURL} target="_blank" className='px-4 py-2 rounded text-primary'>View</Button>
        
                 
            
               </Col>
                  
               </Row>
   
            </Card.Header>
            <Card.Body className='bg-light text-center pt-4 pb-3 px-3'>
                  <Row className='px-4'>
                     <Col className=''>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Lender: </b>
                           </h6>
                           <h6>{lender}</h6>
                        </Row>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Loan Type: </b>
                           </h6>
                              <h6>{loanType}</h6>
                        </Row>
                        <Row>
                           <h6 className='pr-1'>
                              <b>Amount: </b>
                           </h6>
                              <h6>{amount}</h6>
                        </Row>
                       
                        
                     </Col>
                     <Col >
    

     
                           <p className='text-muted'>Expires</p>
                            <h5 className='text-success'>{moment(createdAt).add(10, 'days').format('LL')}</h5>
                         
                 
                  
  
                          
                     
                     </Col>
                  </Row>
                  
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
