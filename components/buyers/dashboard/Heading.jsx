import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
const Heading = () => {
   return (
      <>
         <span className='mx-4'>
            <Row>
               <Col xs='auto' className='mr-0 pr-0'>
                  <h2 className='font-weight-bold'>John SmitherField</h2>
               </Col>
               <Col xs='2' className='align-items-top mt-n2 pl-1'>
                  <span className='d-flex mr-auto '>
                     <Button size='lg' variant='link'>
                        <FontAwesomeIcon className='align-top ' icon={faUserPlus} />
                     </Button>
                  </span>
               </Col>
            </Row>
            <Row>
               <Col>
                  <h3 className='text-muted'>Welcome to the Buyer's Center</h3>
               </Col>
            </Row>
         </span>
      </>
   );
};

export default Heading;
