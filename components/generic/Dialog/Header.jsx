import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Header = ({ headerText, subHeaderText, children, ...rest }) => {
   return (
      <div>
         <Card.Header className='p-4 d-flex justify-content-between align-items-center'>
            <Col>
               <h4 data-test='headerText' className='headerText pr-3 text-secondary'>
                  <b>{headerText}</b>
               </h4>
               <h6 data-test='subHeaderText'>{subHeaderText}</h6>
            </Col>
            <Col className='d-flex justify-content-end mr-5'>
               {React.cloneElement(children, { ...rest })}
            </Col>
         </Card.Header>
      </div>
   );
};

export default Header;
