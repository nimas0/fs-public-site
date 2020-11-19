import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Header = ({ headerText, subHeaderText, children, ...rest }) => {
   return (
      <div>
         <Card.Header className='p-4 d-flex justify-content-between '>
         <Col className='d-flex justify-content-start mr-3'>
               {React.cloneElement(children, { ...rest })}
            </Col>
            <Col className='d-flex justify-content-end'>
               <div>
               <h6 data-test='headerText' className='headerText text-secondary'>
                  {headerText}
               </h6>
               <h6 data-test='subHeaderText'>{subHeaderText}</h6>
               </div>
             
          
              
              
            </Col>
           
         </Card.Header>
      </div>
   );
};

export default Header;
