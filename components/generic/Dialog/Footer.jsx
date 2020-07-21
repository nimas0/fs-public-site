import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or custom if `custom` prop is true).
 */

const Footer = (props) => {
   // return custom footer
   // props.custom = boolean
   if (props.custom) {
      return (
         <div>
            <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
               {props.children}
            </Card.Footer>
         </div>
      );
   }

   // default => return standard navigation footer
   return (
      <div>
         <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
            <Col xs='1' className='pl-1'>
               <Button onClick={props.cancelAction} as='a' className='rounded-lg' variant='light'>
                  CANCEL
               </Button>
            </Col>
            <Col className='d-flex justify-content-end mr-5'>
               <Button
                  disabled={props.disabledBack}
                  onClick={props.previousStep}
                  className='rounded-lg text-dark'
                  variant='light'>
                  BACK
               </Button>
               <Button
                  disabled={props.disabledNext}
                  onClick={props.nextStep}
                  className='rounded-lg ml-3'
                  variant='primary'>
                  {props.customButtonName || 'NEXT'}
                  {props.customButtonIcon || null}
               </Button>
            </Col>
         </Card.Footer>
      </div>
   );
};

export default Footer;
