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
import { toTitleCase } from '../../../utils/helpers';

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
   handleSubmit,
   ...rest
}) => {
   const router = useRouter();
   // if (sending)
   //    return (
   //       <div data-test='step-summary'>
   //          <Row>
   //             <Body className='d-flex justify-content-center'>
   //                <div className='m-3 d-block'>
   //                   <div className='py-4'>
   //                      <Spinner animation='grow' />
   //                   </div>
   //                </div>
   //             </Body>
   //          </Row>
   //          <div>
   //             <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
   //                <Col xs='1' className='pl-1'>
   //                   <Button
   //                      onClick={rest.cancelAction}
   //                      as='a'
   //                      className='rounded-lg'
   //                      variant='light'>
   //                      CANCEL
   //                   </Button>
   //                </Col>
   //                <Col className='d-flex justify-content-end mr-5'>
   //                   <Button
   //                      size='lg'
   //                      type='submit'
   //                      className=' w-25 rounded-lg ml-3 my-1'
   //                      variant='primary'
   //                      block>
   //                      Send Offer
   //                   </Button>
   //                </Col>
   //             </Card.Footer>
   //          </div>
   //       </div>
   //    );
   return (
      <div data-test='step-summary'>
         <Row>
            <Body className='d-flex justify-content-center'>
               {sending ? (
                  <>
                     <Spinner variant="primary" animation='border' />
                  </>
               ) : (
                  <div className='w-75 m-3 d-block'>
                     <div className='py-4'>
                        <p>
                           After submitting, seller will be notified of offer. He will have 24 hours
                           to respond. Seller may accept, reject, or counter terms.
                        </p>
                     </div>

                     <b className='mb-5'>Please Review Offer before submitting:</b>
                     <br />
                     <Table className='mt-1' borderless hover variant='light' responsive>
                        <thead>
                           <tr>
                              {Object.keys(values).map((title) => (
                                 <td>{toTitleCase(title)}</td>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           <tr className='text-break'>
                              {Object.values(values).map((value) => (
                                 <td>{value}</td>
                              ))}
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
               )}
            </Body>
         </Row>
         <div>
            <Card.Footer className='p-4 d-flex justify-content-between align-items-center'>
               <Col xs='1' className='pl-1'>
                  <Button onClick={rest.cancelAction} as='a' className='rounded-lg' variant='light'>
                     CANCEL
                  </Button>
               </Col>
               <Col className='d-flex justify-content-end mr-5'>
                  <Button
                     size='lg'
                     type='submit'
                     className=' w-25 rounded-lg ml-3 my-1'
                     variant='primary'
                     block>
                     Send Offer
                  </Button>
               </Col>
            </Card.Footer>
         </div>
      </div>
   );
};

export default Summary;
