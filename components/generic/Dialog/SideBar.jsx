import React from 'react';
import { Col, Row } from 'react-bootstrap';

const SideBar = ({ sidebarHeader, subHeaderText, enabled = false }) => {
   const renderedComponent = () =>
      enabled ? (
            <Col xs='4' className='border-left'>
               <div className='p-4'>
                  <Row className='pb-3'>
                     <h6>
                        <b>{sidebarHeader}</b>
                     </h6>
                  </Row>
                  <Row>
                     <p>
                        <small>{subHeaderText}</small>
                     </p>
                  </Row>
               </div>
            </Col>
      ) : null;

   return renderedComponent();
};

export default SideBar;
