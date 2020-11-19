import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/SideBar';
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


   const links = [
      {
         url:
            'https://www.rocketmortgage.com/learn/contingent-offers',
         title: 'Learn more about contingencies',
      },
      // {
      //    url:
      //       'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
      //    title: 'Does the deposit count towards the purchase?',
      // },
      // {
      //    url:
      //       'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
      //    title: 'Where does my deposit go?',
      // },
   ];


   return (
      <div data-test='step-contingency'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='' data-test='step-contingency-header'>
                        <h6>4. Type of financing</h6>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control
                           name='financing'
                           value={values.financing}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className='rounded-sm w-100'
                           style={{ display: 'block' }}
                           as='select'
                           custom>
                           <option label='Choose an option' />
                           {Object.entries(rest.contingencyOptions.financingOptions).map((option) => (
                              <option value={option[1]} label={option[1]} />
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Group>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='mt-3' data-test='step-contingency-header'>
                        <h6>5. Is the deal contingent on the sale of your home?</h6>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control
                           name='homeSale'
                           value={values.homeSale}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className='rounded-sm w-100'
                           style={{ display: 'block' }}
                           as='select'
                           custom>
                           <option label='Choose an option' />
                           {Object.entries(rest.contingencyOptions.homeSale).map((option) => (
                              <option value={option[1]} label={option[1]} />
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Group>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label className='mt-2' data-test='step-contingency-header'>
                        <h6>6. Any other contingencies?</h6>
                     </Form.Label>
                     <Form.Group controlId='exampleForm.SelectCustom'>
                        <Form.Control
                           name='other'
                           value={values.other}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className='rounded-sm w-100'
                           style={{ display: 'block' }}
                           as='select'
                           custom>
                           <option label='Choose an option' />
                           {Object.entries(rest.contingencyOptions.other).map((option) => (
                              <option value={option[1]} label={option[1]} />
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='What is a Contingency?'
               subHeaderText='Contingencies are "walk-away" clauses in a contract that allow buyers to back out of buying a property if certain conditions are not met. Typical contingencies that buyers should consider are appraisal, financing, and title. It is the buyers job to make sure each contingency is met before closing.'
               enabled={true}
               links={links}
            />
         </Row>
         <Footer
            // disabledNext={
            //    !(values.contingency.length > 0) || (touched.contingency && !!errors.contingency)
            // }
            {...rest}
         />
      </div>
   );
};

export default Contingency;
