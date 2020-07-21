import React from 'react';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
const Heading = () => {
   const router = useRouter();
   return (
      <>
         <span className='mx-4 mt-0 pt-0'>
            <Row>
               <Col className='mt-0 pt-0'>
                  <h3 className='text-muted mb-4 mt-0 pt-0'>
                     <i></i>Welcome to the Buying Dashboard
                  </h3>
               </Col>
            </Row>
            <Row>
               <Col xs='auto' className='mr-0 pr-0'>
                  <h2 className='text-info'>John SmitherField</h2>
               </Col>
               <Col xs='2' className='align-items-top mt-n2 pl-1'>
                  <span className='d-flex mr-auto '>
                     <Button
                        size='lg'
                        variant='link'
                        onClick={() => router.push('/buyer/assistants')}>
                        <FontAwesomeIcon className='align-top text-primary' icon={faUserPlus} />
                     </Button>
                  </span>
               </Col>
            </Row>
            <Row className='pl-3 mb-1'>
               <Badge className='mr-2' variant='secondary'>
                  Jack Lemons (<i>pending</i>) <FontAwesomeIcon icon={faTimes} />
               </Badge>
    
               <Badge variant='secondary'>
                  Donna Wright  <FontAwesomeIcon icon={faTimes} />
               </Badge>
    
            </Row>
         </span>
      </>
   );
};

export default Heading;
