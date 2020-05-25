import React, { useState } from 'react';
import { Card, Row, Col, Tab, Tabs, Image, Button, Nav, Dropdown } from 'react-bootstrap';
import Action from './Action';
import Details from './Details';
import { objectToStringHomeAddress } from '../../../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
   <a
      href=''
      ref={ref}
      onClick={(e) => {
         e.preventDefault();
         onClick(e);
      }}>
      <FontAwesomeIcon icon={faEllipsisV} className='text-muted' />
      {children}
   </a>
));

const SubscriptionCard = ({ subscriptionData, verification }) => {
   const [key, setKey] = useState('action');
   return (
      <Row>
         <Col>
            <Card className='defaultCard'>
               <Tab.Container id='left-tabs-example' activeKey={key} onSelect={(k) => setKey(k)}>
                  <Card.Header className='pt-4 text-muted mb-0' as='h5'>
                     <Row className=''>
                        <Col xs={11} className=' pb-4'>
                           {objectToStringHomeAddress(subscriptionData.listingSnapshot)}
                        </Col>
                        <Col xs={1} className=''>
                           <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
                              <Dropdown.Menu>
                                 <Dropdown.Item href='#/action-1'>Unsubscribe</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </Col>
                     </Row>

                     <Nav fill variant='tabs' className='nav justify-content-center '>
                        <Nav.Item>
                           {key === 'action' ? (
                              <Nav.Link
                                 key={key}
                                 className='text-primary border-bottom border-primary border-top-0 border-left-0 border-right-0 small bg-transparent'
                                 eventKey='action'>
                                 Action
                              </Nav.Link>
                           ) : (
                              <Nav.Link
                                 key={key}
                                 className='text-dark border-bottom border-primary border-0 small bg-transparent'
                                 eventKey='action'>
                                 Action
                              </Nav.Link>
                           )}
                        </Nav.Item>
                        <Nav.Item>
                           {key === 'details' ? (
                              <Nav.Link
                                 key={key}
                                 className='text-primary border-bottom border-primary border-top-0 border-left-0 border-right-0 small bg-transparent'
                                 eventKey='action'>
                                 Details
                              </Nav.Link>
                           ) : (
                              <Nav.Link
                                 key={key}
                                 className='text-dark border-bottom border-primary border-0 small bg-transparent'
                                 eventKey='details'>
                                 Details
                              </Nav.Link>
                           )}
                        </Nav.Item>
                     </Nav>
                  </Card.Header>
                  <Card.Body className='text-center pb-5'>
                     <Tab.Content>
                        <Tab.Pane eventKey='action'>
                           <Action
                              verification={verification}
                              subscriptionData={subscriptionData}
                           />
                        </Tab.Pane>
                        <Tab.Pane eventKey='details'>
                           <Details quickFacts={subscriptionData.listingSnapshot.quickFacts} />
                        </Tab.Pane>
                     </Tab.Content>
                  </Card.Body>
               </Tab.Container>
            </Card>
         </Col>
      </Row>
   );
};

export default SubscriptionCard;
