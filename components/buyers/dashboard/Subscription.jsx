import React from 'react';
import { Card, Row, Col, Nav, Image, Button } from 'react-bootstrap';

const Subscription = () => {
   return (
      <Row>
         <Col>
            <Card className='shadow'>
               <Card.Header className='pt-4 text-muted mb-0' as='h5'>
                  <div className='pb-4'>1234 Main Street Owensboro Ky</div>

                  <Nav className='border-0 lead' justify variant='tabs' defaultActiveKey='#link'>
                     <Nav.Item>
                        <Nav.Link
                           className='border-bottom border-primary border-0  small bg-transparent'
                           href='#first'>
                           Action
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link
                           className='border-0 border-bottom small bg-transparent'
                           href='#link'>
                           Details
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Card.Header>
               <Card.Body className='text-center pb-5'>
                  <Row className='pb-3 px-3' >
                     <p>
                        <small>
                           <i>*upload pre-approval to unlock chat with seller</i>
                        </small>
                     </p>
                  </Row>
                  <Row>
                     <Col>
                        <Image
                           height='150'
                           src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/listings%2FKDfFS1FtGblMYSrzLDCZ%2Fphotos%2FMedium-4120180125.jpg?alt=media&token=c5550394-5707-4849-8faa-df0165e78faf'
                           rounded
                        />
                     </Col>
                     <Col>
                        <Button size="sm" variant='primary' className='mb-1' block>
                           Chat with Seller
                        </Button>
                        <Button size="sm"  variant='primary' className='mb-1 ' block>
                           View Docs
                        </Button>
                        <Button size="sm"  variant='primary' className='mb-1' block>
                           Submit Offer
                        </Button>
                        <Button size="sm"  variant='primary' className='mb-1 ' block>
                           Request Showing
                        </Button>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};

export default Subscription;
