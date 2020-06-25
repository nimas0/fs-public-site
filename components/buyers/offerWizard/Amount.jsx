import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const Amount = ({ errors, touched, handleChange, values, handleBlur, sending, ...rest }) => {
   return (
      <div data-test='step-amount'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label data-test='step-amount-header'>
                        1.) Set a fair amount to offer
                     </Form.Label>
                     <Form.Control
                        data-test='step-amount-field'
                        className='rounded-sm w-100'
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.amount && !!errors.amount} // !! is two (not) operators and converts object to boolean then negates it
                        disabled={sending}
                        type='text'
                        name='amount'
                        placeholder='Ex. Utilities, Contractor Report, Repair List'
                     />
                     <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='Need help pricing an offer?'
               subHeaderText=' Body asdlfj'
               enabled={true}
            />
         </Row>
         <Footer {...rest} />
      </div>
   );
};

export default Amount;
