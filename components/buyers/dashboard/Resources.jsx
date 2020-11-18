import React from 'react';
import { ListGroup, Col, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Resources = () => {
   return (
      <Row className='bg-transparent'>
         <Col>
            <Card className='bg-transparent border-0'>
               {/* <Card.Header className='bg-transparent py-5' as='h4'>
                  Buyer's Resources
               </Card.Header> */}
               <ListGroup variant='flush bg-transparent'>
                  <ListGroup.Item className='p-4 text-muted bg-transparent'>
                     {/* <i>
                        Discover how to take buying into your own hands. It is easier than you
                        think!
                     </i> */}
                  </ListGroup.Item>
                  <ListGroup.Item as='button' href='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/documents%2FFinding%20Spaces%20-%20Form%20Residential%20PSA%20(Final).pdf?alt=media&token=9ffeb38d-e5f9-4985-a812-9736a601d5f8' className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}>Purchase Agreement Contract</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}>Securing a loan</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}>Steps when buying a home</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Steps when buying a home Before sheduling an appointment</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Look out for these 5 home issues</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Find a loan officer</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Is it a seller market?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Is it a seller market?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4 bg-transparent'>
                     <Row>
                        <Col xs={11}> Is it a seller market?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
   );
};

export default Resources;
