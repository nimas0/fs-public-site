import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
// import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const Contingency = ({
   errors,
   touched,
   handleChange,
   values,
   handleBlur,
   sending,
   dirty,
   ...rest
}) => {
   return (
      <div data-test='step-contingency'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='pb-2' data-test='step-contingency-header'>
                        <b>Do you need to sell your home first?</b>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control
                           name='contingency'
                           value={values.contingency}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className='rounded-sm w-100'
                           style={{ display: 'block' }}
                           as='select'
                           custom>
                           <option label='Choose an option' />
                           {Object.entries(rest.contingencyOptions).map((option) => (
                              <option value={option[1]} label={option[1]} />
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Group>
               </div>
            </Body>
            {/* <SideBar
               sidebarHeader='What is a Contingency?'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            /> */}
         </Row>
         <Footer
            disabledNext={
               !(values.contingency.length > 0) || (touched.contingency && !!errors.contingency)
            }
            {...rest}
         />
      </div>
   );
};

export default Contingency;
