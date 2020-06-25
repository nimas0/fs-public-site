import React from 'react';
import { Field } from 'formik';
import {
   Row,
   Col,
   Button,
   Card,
   Form,
   Spinner,
   Dropdown,
   Container,
   Jumbotron,
   Table,
} from 'react-bootstrap';
import Body from '../../generic/Dialog/Body';
import SideBar from '../../generic/Dialog/Sidebar';
import Footer from '../../generic/Dialog/Footer';
import { useRouter } from 'next/router';

const Summary = ({
   errors,
   touched,
   handleChange,
   values,
   handleBlur,
   sending,
   previousStep,
   nextStep,
   goToStep,
   ...rest
}) => {
   const router = useRouter();

   return (
      <div data-test='step-summary'>
         <Row>
            <Body className='d-flex justify-content-center'>
               <Row>
                  <div className='w-75 m-3 d-block'>
                     <div className='py-4'>
                        <p>
                           After submitting, seller will be notified of offer. He will have 24 hours
                           to respond. Seller may accept, reject, or counter terms.
                        </p>
                     </div>

                     <b className='mb-5'>Please Review Offer before submitting:</b>
                     <br />
                     <Table striped bordered hover>
                        <tbody>
                           <tr>
                              <td>Amount</td>
                              <td>Deposit</td>
                              <td>Possession</td>
                           </tr>
                           <tr>
                              <td>$149,000</td>
                              <td>$500</td>
                              <td>30 days</td>
                           </tr>
                        </tbody>
                     </Table>
                     <Button
                        onClick={() => goToStep(2)}
                        className='rounded-lg mb-5 text-info'
                        variant='light'>
                        EDIT OFFER
                     </Button>
                  </div>
               </Row>
            </Body>
            <SideBar
               sidebarHeader='Contengencies'
               subHeaderText={
                  <div className='p-3 d-block'>
                     <h4>Sell my home first?</h4>
                     <h6>
                        <small>No, I do not need to sell my home to purchase this property</small>
                     </h6>
                  </div>
               }
               enabled={true}
            />
         </Row>
         <div>
            <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
               <Col className='d-flex justify-content-end mr-5'>
                  <Button
                     onClick={() => router.push('/buyer/dashboard')}
                     className=' w-100 rounded-lg ml-3'
                     variant='primary'
                     block>
                     SUBMIT
                  </Button>
               </Col>
            </Card.Footer>
         </div>
      </div>
   );
};

export default Summary;
