import React from 'react';
import { Row, Form, FormControl } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';

import NumberFormat from 'react-number-format';

const Deposit = ({
   errors,
   touched,
   handleChange,
   values,
   handleBlur,
   sending,
   dirty,
   setFieldValue,
   ...rest
}) => {
   const links = [
      {
         url:
            'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
         title: 'Learn more about Deposits',
      },
      {
         url:
            'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
         title: 'Does the deposit count towards the purchase?',
      },
      {
         url:
            'https://www.realtor.com/advice/finance/understanding-the-earnest-money-deposit-2/#:~:text=Depositing%20earnest%20money%20is%20an,helps%20fund%20your%20down%20payment.&text=Sellers%20rarely%20accept%20offers%20without,the%20offer%20in%20good%20faith.',
         title: 'Where does my deposit go?',
      },
   ];

   return (
      <div data-test='step-amount'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     <Form.Label data-test='step-deposit-header'>
                        2.) How much can you deposit?
                     </Form.Label>
                     <NumberFormat
                        allowLeadingZeros={false}
                        data-test='step-amount-field'
                        decimalScale={2}
                        fixedDecimalScale={true}
                        className='rounded-sm w-100'
                        thousandSeparator
                        customInput={FormControl}
                        name='deposit'
                        placeholder='Common deposits:  $500, $1000, $5000'
                        allowNegative={false}
                        isInvalid={touched.deposit && !!errors.deposit}
                        onValueChange={({ floatValue }) => {
                           setFieldValue('deposit', floatValue);
                           touched.deposit = true;
                        }}
                        prefix={'$'}
                        value={values.floatValue}
                        onBlur={handleBlur}
                        isValid={touched.deposit && !errors.deposit}
                     />

                     <Form.Control.Feedback type='invalid'>{errors.deposit}</Form.Control.Feedback>
                  </Form.Group>
                  <a className='text-warning'>Opt out of deposit</a>
               </div>
            </Body>
            <SideBar
               sidebarHeader='Is a deposit neccessary?'
               subHeaderText={subHeaderText}
               enabled={true}
               links={links}
            />
         </Row>
         <Footer
            disabledNext={!touched.deposit || (touched.deposit && !!errors.deposit)}
            {...rest}
         />
      </div>
   );
};

const subHeaderText = `Depositing earnest money is an important part of the home-buying process. It tells the real estate seller you're in earnest as a buyer, and it helps fund your down payment. 
Sellers rarely accept offers without the buyers putting down earnest money to show that they are serious and are making the offer in good faith.`;

export default Deposit;
