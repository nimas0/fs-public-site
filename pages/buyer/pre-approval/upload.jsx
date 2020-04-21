import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import './pre-approval.module.css';

const upload = () => {
   return (
      <MainLayout>
         <Container fluid='md' className='p-5'>
            <Card className='shadow'>
               <Card.Header className='p-4'>
                  <Row className='pl-4 py-2'>
                     <h5 className='pr-3'>
                        <b>Verify Your Funds: </b>{' '}
                     </h5>
                     <h5>Upload Pre-Qualification, Pre-Approval, or Proof of Funds</h5>
                  </Row>
               </Card.Header>
               <Card.Body className='p-0'>
                  <Row>
                     <Col xs='8' className='border-right'>
                        <div className='p-4'>
                           <Form>
                              <Form.Row>
                                 <Form.Group as={Col} controlId='formGridEmail'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' placeholder='Enter email' />
                                 </Form.Group>

                                 <Form.Group as={Col} controlId='formGridPassword'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='Password' />
                                 </Form.Group>
                              </Form.Row>

                              <Form.Group controlId='formGridAddress1'>
                                 <Form.Label>Address</Form.Label>
                                 <Form.Control placeholder='1234 Main St' />
                              </Form.Group>

                              <Form.Group>
                                 <div className='upload-box'>
                                    <Row xs='12' className='align-items-center'>
                                       <Col xs='12' className='align-middle'>
                                          <h6 className='text-center align-middle'>Upload</h6>
                                       </Col>
                                    </Row>
                                 </div>
                              </Form.Group>
                           </Form>
                        </div>
                     </Col>
                     <Col xs='4'>
                        <div className='p-4'>
                           <Row className='pb-3'>
                              <h6>
                                 <b>Why do I need to provide verification of financing?</b>
                              </h6>
                           </Row>
                           <Row>
                              <p>
                                 <small>
                                    In an effort to limit wasting either parties time it is
                                    important for you to view qualified to view the home. Finding
                                    Spaces will independently rreview and confirm your information
                                    within 3 hours. You can still schedule an appointment while your
                                    ssubmittion pends approval.
                                 </small>
                              </p>
                           </Row>
                        </div>
                     </Col>
                  </Row>
               </Card.Body>
               <Card.Footer>
                  <Row className='pl-4 py-2'>
                     <Col xs='1' className='pl-1'>
                        <Button variant='light'>CANCEL</Button>
                     </Col>
                     <Col xs='2'>
                        <Button>SUBMIT</Button>
                     </Col>
                  </Row>
               </Card.Footer>
            </Card>
         </Container>
      </MainLayout>
   );
};

export default upload;
