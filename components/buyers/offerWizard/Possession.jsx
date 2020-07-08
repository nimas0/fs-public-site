import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

const Possession = ({
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
      <div data-test='step-possession'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='pb-2' data-test='step-possession-header'>
                        <b>
                           The homeowner has indicated they prefer 2 weeks from the time of the sale
                           to move out but is willing to negotiate if neccessary.
                        </b>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control
                           name='possession'
                           value={values.possession}
                           onChange={handleChange}
                           className='rounded-sm w-100'
                           style={{ display: 'block' }}
                           as='select'
                           custom>
                           <option label='Choose an option' />
                           {Object.entries(rest.possessionOptions).map((option) => (
                              <option value={option[1]} label={option[1]} />
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='What is a possession?'
               subHeaderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '
               enabled={true}
            />
         </Row>
         <Footer
            disabledNext={
               !(values.possession.length > 0) || (touched.possession && !!errors.possession)
            }
            {...rest}
         />
      </div>
   );
};

export default Possession;
