import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

//TODO abstract out buttons for versatility
const Footer = (props) => {
   return (
      <div>
         <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
            <Col xs='1' className='pl-1'>
               <Button as='a' className='rounded-lg' variant='light'>
                  CANCEL
               </Button>
            </Col>
            <Col className='d-flex justify-content-end mr-5'>
               <Button disabled={props.disabledBack} onClick={props.previousStep} className='rounded-lg' variant='light'>
                  BACK
               </Button>
               <Button disabled={props.disabledNext} onClick={props.nextStep} className='rounded-lg ml-3' variant='primary'>
                  NEXT
               </Button>
            </Col>
         </Card.Footer>
      </div>
   );
};

export default Footer;
