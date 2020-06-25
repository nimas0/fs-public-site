import React from 'react';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';
import { Col } from 'react-bootstrap';

const dataObject = {
   disclaimerHeader: 'Disclaimer: Non-Official Offer',
   disclaimerBody: 'alsdfjalsdfjfff',
   sidebar: false,
};

const Disclaimer = ({ ...props }) => {
   return (
      <>
         <div data-test='step-disclaimer'>
            <Body className='text-center p-3 m-3 '>
               <Col xs={12} >
                  <h2
                     className='pb-1 text-center'
                     data-test='step-disclaimer-header'>
                     Disclaimer: Non-Official Offer
                  </h2>
                  <p   className='pb-1 text-center' data-test='step-disclaimer-sub-header'>
                     After both parties have agreed to mutual terms, an
                     official binding purchase agreement will be drafted and signed.
                  </p>
               </Col>
            </Body>
            <Footer disabledBack={true} {...props} />
         </div>
      </>
   );
};

export default Disclaimer;
