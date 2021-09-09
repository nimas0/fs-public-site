import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Header = ({ headerText, subHeaderText, children, ...rest }) => (
  <div>
    <Card.Header className='p-5 d-flex justify-content-between '>
      <Row className='d-flex justify-content-start mr-3'>
        {React.cloneElement(children, { ...rest })}
   
        <div>
          <h6 data-test='headerText' className='headerText text-secondary'>
            {headerText}
          </h6>
          <h6 data-test='subHeaderText'>{subHeaderText}</h6>
        </div>
             
          
              
              
      </Row>
           
    </Card.Header>
  </div>
   );

export default Header;
