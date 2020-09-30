'use strict';

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faGooglePlusG,
   faFacebookSquare,
   faTwitter,
   faInstagram,
   faBehance,
} from '@fortawesome/free-brands-svg-icons';

export default () => (
   <footer  className='mt-5 border-0 '>
      <Container  fluid='md'>
         <Row className='info mb-3 mb-lg-0  '>
            <Col xs={12} sm={6} lg={4} className='text-center  mb-sm-3'>
               {/* <div>Finding Spaces</div> */}
               <div>
                  <a href='mailto:supprt@findingspaces.com'>support@findingspaces.com</a>
               </div>
               {/* <div>
                  <a href='tel:+15558675309'>555-867-5309</a>
               </div> */}
            </Col>
            <Col xs={12} sm={6} lg={4} className='mb-sm-3 text-center'>
               <div>
                  <a
                     href='#'
                     title='Google+'
                     className='text-secondary h4-icon mr-4'>
                     <FontAwesomeIcon icon={faGooglePlusG} />
                  </a>
                  <a
                     href='#'
                     title='Facebook'
                     className='text-secondary h4-icon mr-4'>
                     <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                  <a
                     href='#'
                     title='Twitter'
                     className='text-secondary h4-icon mr-4'>
                     <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                     href='#'
                     title='Instagram'
                     className='text-secondary h4-icon mr-4 '>
                     <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href='#' title='Behance' className='text-secondary h4-icon '>
                     <FontAwesomeIcon icon={faBehance} />
                  </a>
               </div>
            </Col>
            <Col xs={12} sm={12} lg={4} className='text-center  mb-sm-3'>
               {/* <div className="h3">Newsletter</div>
          <Form inline className="justify-content-center my-lg-3">
            <Form.Control
              name="newsletterEmail"
              type="email"
              placeholder="Email"
              className="mr-2"
              style={{ width: "auto" }}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={e => {
                // Remove when newsletter submission added
                e.preventDefault();
              }}
            >
              Sign up
            </Button>
          </Form> */}
               <div className='text-center mb-3'>
                  &copy;&nbsp;{new Date().getFullYear()} Finding Spaces
               </div>
            </Col>
         </Row>
      </Container>
   </footer>
);
