import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const FinalComment = ({ errors, touched, handleChange, values, handleBlur, sending, ...rest }) => {
   return (
      <div data-test='step-comment'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='pb-2' data-test='step-comment-header'>
                        Please enter any comments or additional requests here:
                     </Form.Label>
                     <Form.Group controlId='exampleForm.ControlTextarea1'>
                        <Form.Control as='textarea' rows='3' />
                     </Form.Group>
                     <Form.Control.Feedback type='invalid'>
                        {errors.comment}
                     </Form.Control.Feedback>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='Tips'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            />
         </Row>
         <Footer {...rest} />
      </div>
   );
};

export default FinalComment;
