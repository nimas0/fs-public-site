import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar'
// import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';


import NumberFormat from 'react-number-format';

const Amount = ({
   errors,
   touched,
   handleChange,
   values,
   handleBlur,
   setFieldValue,
   sending,
   dirty,
   queryObject,
   proposal,
   ...rest
}) => {

   const links = [
      {
         url:
            'https://www.bankrate.com/calculators/mortgages/new-house-calculator.aspx#:~:text=To%20determine%20how%20much%20house,expenses%20and%20credit%20card%20payments',
         title: 'Calculate Morgage',
      },
      // {
      //    url:
      //       'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
      //    title: 'Low, High, List Price: How Much Should You Offer on a House?',
      // },
      // {
      //    url:
      //       'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
      //    title: '5 Risks of pricing home too low.',
      // },
   ];

   // const counterOffer = queryObject && (
   //    <>
   //    {queryObject.}
   //    </>
   // )


   console.log('amount', proposal)
   return (
      <div data-test='step-amount'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>

                     
                     {/*
                     // snippit shows the counter offer if proposal is true
                     { proposal && (
                     <>
                        <h6 data-test='step-amount-header'>
                           Homeowner has offered you: ${proposal && proposal.offerDetails.amount}
                        </h6>
                        <Form.Label data-test='step-amount-header'>
                           How much can you offer?
                        </Form.Label>
                     </>
                     )} */}

                     
                       
                           <>
                              <h4 data-test='step-amount-header'>
                                 1.) How much can you offer?
                              </h4>
                           </>
                       
                     

                     <NumberFormat
                        allowLeadingZeros={false}
                        data-test='step-amount-field'
                        decimalScale={2}
                        fixedDecimalScale={true}
                        className='rounded-sm w-100'
                        thousandSeparator
                        customInput={FormControl}
                        name='amount'
                        placeholder='Ex. 89,900'
                        allowNegative={false}
                        isInvalid={dirty && !!errors.amount}
                        onValueChange={({ floatValue }) => {
                           setFieldValue('amount', floatValue) || '';
                           touched.amount = true
                        }}
                        prefix={'$'}
                        value={values.floatValue}
                        onBlur={handleBlur}
                        isValid={dirty && !errors.amount}
                     />
                     <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                  </Form.Group>
               </div>
            </Body>
            <SideBar
               sidebarHeader='Need help pricing an offer?'
               subHeaderText={subHeaderText}
               enabled={true}
               links={links}
            />
         </Row>
         <Footer disabledBack={true} disabledNext={!touched.amount || !!errors.amount} {...rest} />
      </div>
   );
};

const subHeaderText = 'Well, part of the answer to that question is entirely up to you: How badly do you want this specific property? The other part of it is about knowing the market and how to play the game. We’ve put together some resources to help you decide when to come in low.'
export default Amount;
