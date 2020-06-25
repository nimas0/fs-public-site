import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const Deposit = ({ errors, touched, handleChange, values, handleBlur, sending, ...rest }) => {
   return (
      <div data-test='step-amount'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label data-test='step-amount-header'>
                        2.) How much can you deposit?
                     </Form.Label>
                     <Form.Control
                        data-test='step-amount-field'
                        className='rounded-sm w-100'
                        value={values.deposit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.desposit && !!errors.desposit} // !! is two (not) operators and converts object to boolean then negates it
                        disabled={sending}
                        type='text'
                        name='desposit'
                        placeholder='Ex. Utilities, Contractor Report, Repair List'
                     />
                     <Form.Control.Feedback type='invalid'>{errors.desposit}</Form.Control.Feedback>
                  </Form.Group>
                  <a className='text-warning'>Opt out of deposit</a>
               </div>
            </Body>
            <SideBar
               sidebarHeader='What is a deposit?'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            />
         </Row>
         <Footer {...rest} />
      </div>
   );
};

export default Deposit;
