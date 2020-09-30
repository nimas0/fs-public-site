import React, { useState } from 'react';
import { Card, Row, Col, Tab, Tabs, Image, Button, Nav, Dropdown } from 'react-bootstrap';
import Action from './Action';
import Details from './Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
   <a
      href=''
      ref={ref}
      onClick={(e) => {
         e.preventDefault();
         onClick(e);
      }}>
      <FontAwesomeIcon icon={faEllipsisV} />
      {children}
   </a>
));

const handleUnsubscribe = async (interestId) => {
   // setSuccess(false);
   // setFailure(false);
   // setSending(true);
   console.log('test');
   try {
      // Send offer info through API
      const response = await fetch('/api/unsubscribe-listing', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ interestId }),
      });

      // Set up message object, create key, and post to firebase real time //
      // const { amount, deposit } = values;
      // const responseJson = await response.json()
      // const docId = responseJson.docId;

      if (response.ok) {
         // Move on

         // await router.push('/buyer/dashboard')
         // addToast(`Offer has been successfully submitted! You will be notified within 48 hours or less with the sellers response`, { appearance: 'success' })
         // setSending(false);
         // setSuccess(true);
         console.log(await response.json());
         console.log('unsubscribe successful');
      } else {
         // https://github.com/developit/unfetch#caveats
         let error = new Error(response.statusText);
         error.response = response;
         throw error;
      }
   } catch (err) {
      // Add upload failure message
      // setSuccess(false);
      console.log(err);
      console.error('Either a coding error or network issues', err.response);
      // addToast(
      //    `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
      //    {
      //       appearance: 'error',
      //    }
      // );

      // setSending(false);
   }
};

const SubscriptionCard = ({ subscriptionData, verification, interestId }) => {
   const [key, setKey] = useState('action');
   const router = useRouter();
   console.log('subscriptionData', interestId);
   return (
      <Row>
         <Col>
            <Card className='defaultCard'>
               <Tab.Container id='left-tabs-example' activeKey={key} onSelect={(k) => setKey(k)}>
                  <Card.Header className='pt-4 text-muted mb-0' as='h5'>
                     <Row className=''>
                        <Col xs={11} className=' pb-4'>
                           {subscriptionData.address[0]}
                        </Col>
                        <Col xs={1} className=''>
                           <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
                              <Dropdown.Menu>
                                 <Dropdown.Item
                                    onClick={() =>
                                       router.push(`/listing/${subscriptionData.listingId}`)
                                    }>
                                    Visit Property Page
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleUnsubscribe(interestId)}>
                                    Unsubscribe
                                 </Dropdown.Item>
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
                           <Details quickFacts={subscriptionData.quickFacts} />
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
