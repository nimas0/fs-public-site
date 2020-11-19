import { useState, useEffect } from 'react';
import Body from '../../generic/Dialog/Body';
import Footer from '../../generic/Dialog/Footer';
import { Col, Button, Spinner } from 'react-bootstrap';
import Timer from '../../Timer';
import { faKey, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const dataObject = {
   disclaimerHeader: 'Disclaimer: Non-Official Offer',
   disclaimerBody: 'alsdfjalsdfjfff',
   sidebar: false,
   
};

const handleFooter = () => {};

const Disclaimer = ({ ...props }) => {
   const [seconds, setSeconds] = useState(7);

   // force user to read disclaimer for 7 seconds before proceeding
   useEffect(() => {
      let myInterval = setInterval(() => {
         if (seconds > 0) {
            setSeconds(seconds - 1);
         }
      }, 1000);
      return () => {
         clearInterval(myInterval);
      };
   });

   const renderCountDownFooter = () => (
      <>
         <Col xs='1' className='pl-1'>
            {/* <Button disabled={true} as='a' target="_blank" className='rounded-lg' variant='light'>
               CANCEL
            </Button> */}
         </Col>
         <Col className='d-flex justify-content-end mr-5'>
            <Spinner animation='grow' role='status' />
            <h4 className='mx-4'>Continue in {seconds}</h4>
         </Col>
      </>
   );

   return (
      <>
         <div data-test='step-disclaimer'>
            <Body className='text-center p-3 m-3 '>
               <Col xs={12}>
                  <h2 className='pb-1 text-center' data-test='step-disclaimer-header'>
                     Disclaimer: Non-Official Offer
                  </h2>
                  <p className='pb-1 text-center' data-test='step-disclaimer-sub-header'>
                  After both parties have agreed to mutual terms, an official binding purchase agreement will be <strong>provided for you</strong> and the seller to complete.
                  </p>
               </Col>
            </Body>
            {seconds !== 0 ? (
               <Footer disabledBack={true} custom={true} {...props}>
                  {renderCountDownFooter()}
               </Footer>
            ) : (
               <Footer
                  customButtonIcon={<FontAwesomeIcon size="lg" className='ml-4 pt-1' icon={faLongArrowAltRight} pull="right" />}
                  customButtonName='Propose Informal Offer'
                  disabledBack={true}
                  {...props}
               />
            )}
         </div>
      </>
   );
};

export default Disclaimer;
