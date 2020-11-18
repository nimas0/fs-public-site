import React from 'react';
import { Row, Form, FormControl, Button, FormLabel } from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/SideBar';
import Footer from '../../generic/Dialog/Footer';
import { Divider } from 'antd';
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
   queryObject,
   proposal,
   ...rest
}) => {
   const links = [
      {
         url:
            'https://www.rocketmortgage.com/learn/earnest-money#:~:text=It\'s%20typically%20around%201%25%20%2D%203,down%20payment%20or%20closing%20costs.',
         title: 'Learn more about deposits',
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


   console.log(queryObject)

   return (
      <div data-test='step-amount'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <div className='w-75'>
                  <Form.Group controlId='formGridAddress1'>
                     {/* { proposal && 
                     <>
                        <p data-test='step-deposit-header'>
                           Homeowner has offered ${proposal.offerDetails.deposit}
                        </p>
                          <Form.Label data-test='step-deposit-header'>
                              2.) How much can you deposit?
                          </Form.Label>
                     </>
                     }
                     {
                        !proposal && (
                           <h5 className='mb-3' data-test='step-deposit-header'>
                              2.) How much can you deposit?
                           </h5>
                        )
                     } */}

<h5 className='mb-3' data-test='step-deposit-header'>
                              2.) How much can you deposit?
                           </h5>
                        
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
                        value={values.deposit}
                        onBlur={handleBlur}
                        isValid={touched.deposit && !errors.deposit}
                     />

                     <Form.Control.Feedback type='invalid'>{errors.deposit}</Form.Control.Feedback>
                  </Form.Group>
                  <Divider className='my-4' />
                  <h6 className='pl-2 text-secondary'>
                     NOTICE: You may choose to opt out of the deposit, however, this is not a best practice and
                     could make your offer less attractive.
                  </h6>
                  <Button
                     onClick={() => setFieldValue('deposit', 0)}
                     variant='light'
                     className='mt-2 text-info'>
                     Opt Out the Deposit
                  </Button>
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

const subHeaderText = `Depositing earnest money is an essential part of the home-buying process.  It's typically around 1% - 3% of the sale price and is held in an escrow account until the deal is complete. This deposit lets the seller know you're in good faith as a buyer, and it helps fund your down payment. Sellers rarely accept offers without the buyers putting down earnest money to show that they are serious and making the offer.`;

export default Deposit;
