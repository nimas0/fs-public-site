import React from 'react';
import { ListGroup, Col, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Resources = () => {
   return (
      <Row>
         <Col>
            <Card className='defaultCard'>
               <Card.Header className='py-5' as='h4'>
                  Buyer's Resources
               </Card.Header>
               <ListGroup variant='flush'>
                  <ListGroup.Item className='p-4 text-muted'>
                     <i>
                        Discover how to take buying into your own hands. It is easier than you
                        think!
                     </i>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}>What to know when making an offer</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}>Securing a loan</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}>Steps when buying a home</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> Steps when buying a home Before sheduling an appointment</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> Look out for these 5 home issues</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> Find a loan officer</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> Is it a seller market?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> Is it a seller market?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
                     <Row>
                        <Col xs={11}> What are closing costs?</Col>
                        <Col xs={1}>
                           <FontAwesomeIcon icon={faChevronRight} />
                        </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-4'>
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
