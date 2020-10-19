import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
// import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const FinalComment = ({ errors, touched, handleChange, values, handleBlur, proposal, sending, ...rest }) => {
   return (
      <div data-test='step-comment'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
               {proposal &&
                  (<>
                  <p>Homeowner left the following remarks</p>
                  { proposal.offerDetails.comment}
                  </>)
               }
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='pb-2' data-test='step-comment-header'>
                        Please enter any comments or additional requests here:
                     </Form.Label>
                     <Form.Group controlId='exampleForm.ControlTextarea1'>
                        <Form.Control
                           name='comment'
                           type='text'
                           onChange={handleChange}
                           value={values.comment}
                           as='textarea'
                           rows='7'
                           onBlur={handleBlur}
                        />
                     </Form.Group>
                  </Form.Group>
               </div>
            </Body>
            {/* <SideBar
               sidebarHeader='Tips'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            /> */}
         </Row>
         <Footer {...rest} />
      </div>
   );
};

export default FinalComment;
