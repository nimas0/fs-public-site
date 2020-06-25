import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const Contingency = ({ errors, touched, handleChange, values, handleBlur, sending, ...rest }) => {
   return (
      <div data-test='step-contingency'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='pb-2' data-test='step-contingency-header'>
                        <b>
                           Do you need to sell your home first?
                        </b>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control as='select' custom>
                           <option>Yes, I have my home listed online</option>
                           <option>Yes, I need to list my home</option>
                           <option>No, I am able to purchase home right away</option>
                        </Form.Control>
                     </Form.Group>
                     <Form.Control.Feedback type='invalid'>
                        {errors.contingency}
                     </Form.Control.Feedback>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='What is a Contingency?'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            />
         </Row>
         <Footer {...rest} />
      </div>
   );
};

export default Contingency;
