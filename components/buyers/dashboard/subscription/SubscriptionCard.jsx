import React, { useState } from 'react';
import { Card, Row, Col, Tab, Tabs, Image, Button, Nav, Dropdown, Alert, ListGroup, Badge } from 'react-bootstrap';
import Action from './Action';
import Details from './Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import GenericModal from '../../../GenericModal';

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
   const [modalShow, setModalShow] = React.useState(false);


   const instructions = () => (
      <ListGroup>
     <p className='mb-5'>Congratulations! You and the seller have agreed on the essential terms of the offer. Below are the steps needed to complete the remainder of the process and get the keys to your new home!</p>
     <Button className='bg-primary' onClick={() => setModalShow(true)}>See Next Steps</Button>
   </ListGroup>
   )
   
   const ModalBody = () => (
      <>
       <ListGroup>
     <h6 className='mb-5 mt-2 p-2'><b>      Congratulations!</b> You and the seller have agreed on the essential terms of the offer. Below are the steps needed to complete the remainder of the process and get the keys to your new home!</h6>
     <ListGroup.Item>
        <h5>
       <b> 1. Acquire a purchase agreement</b>
         </h5> 
         Now, since you and the seller have agreed to the essential terms, it's time to make it official. A purchase agreement is a document (required by law) that states all terms and timelines of a real estate transaction. Download our free purchase agreement contract. It has been drafted by and reviewed by attorneys in Arizona and meets all the binding contract requirements.
      <Button variant='outlined' size='lg' className='text-primary'><h6 className='pt-3 text-primary'><b>Download Purchase Agreement</b></h6></Button>
   </ListGroup.Item>
     <ListGroup.Item><h5><b>2. Fill out purchase agreement</b></h5> Fill out the purchase agreement according to the terms and conditions you and the seller agreed on. The contract will have more information to fill out; make sure to read thoroughly and contact a lawyer if you run into any complications. 
   </ListGroup.Item>
     <ListGroup.Item><h5><b>3. Send to Seller</b></h5> After completion of the purchase agreement, the seller will need to review and sign. We recommend that you upload your document directly to the seller through the Finding Spaces dashboard; This will allow you and the seller to communicate and hash out terms quickly.</ListGroup.Item>
     <ListGroup.Item><h5><b>4. Notify Title Company</b></h5> Next, deliver the completed and signed contract with the agreed amount of earnest deposit to the title company stated in the agreement. You and the seller can negotiate who hires a title company and pays associated fees. The title company will order the title, property tax information, loan balances, and other necessary paperwork. You can typically use your title company as an escrow agent at no extra charge. The escrow agent will also serve as a third party who holds money in a trust until a property sale closes.</ListGroup.Item>
     <ListGroup.Item><h5><b>5. Contengencies</b></h5> It's your responsibility to remove all contingencies in the proper timelines stated in the contract. The Finding Spaces dashboard will remain available for you to chat, schedule appointments, and exchange documents with the seller. </ListGroup.Item>
     <ListGroup.Item><h5><b>6. Home Sold</b></h5> Once all contingencies have been uplifted, it will be time to close the deal. The title company will provide you with the documents you need for the closing process. After the documents are signed and recorded and the funds transferred to the seller, you will receive the keys to your new home!</ListGroup.Item>

   </ListGroup>
      </>
   );


   
   console.log('subscriptionData', interestId);
   return (
      <>
      <Row>
         <Col>
            <Card  className='buttonShadow border-0 bg-white mb-4'>
               <Tab.Container id='left-tabs-example' activeKey={key} onSelect={(k) => setKey(k)}>
                  <Card.Header  className='pt-4 mt-1  bg-white text-muted  mb-0' as='h5'>
                     <Row className=''>
                        <Col xs={11} className=' pb-4'>
                           {
                              subscriptionData.buyerMessageCounter > 0 ? (
                                 <Badge variant="success" className='px-3 py-1 mr-3 text-white'>{subscriptionData.buyerMessageCounter} New Messages</Badge>
                              )
                              : 
                              (
                                 null
                              )
                           }
                        
                           {subscriptionData.address[0]}
                        </Col>
                        <Col xs={1} className=''>
                           <Dropdown >
                              <Dropdown.Toggle className='schedulingShadow p-3 text-dark' as={CustomToggle} id='dropdown-custom-components' />
                              <Dropdown.Menu className='schedulingShadow p-3 text-dark'>
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

                     {/* <Nav
                        fill
                        variant='tabs'
                        className='border-0   border-bottom-0 nav justify-content-center '>
                        <Nav.Item className=' border-bottom-0'>
                           {key === 'action' ? (
                              <Nav.Link
                                 key={key}
                                 className='text-primary border-top-0 border-bottom-0 border-left-0 border-right-0 small bg-transparent'
                                 eventKey='action'>
                                 <b>Action</b>
                              </Nav.Link>
                           ) : (
                              <Nav.Link
                                 key={key}
                                 className='text-dark border-0 small bg-transparent'
                                 eventKey='action'>
                                 <b>Action</b>
                              </Nav.Link>
                           )}
                        </Nav.Item>
                        <Nav.Item>
                           {key === 'details' ? (
                              <Nav.Link
                                 key={key}
                                 className='text-primary border-top-0 border-left-0 border-right-0 small bg-transparent'
                                 eventKey='action'>
                                 <b>Details</b>
                              </Nav.Link>
                           ) : (
                              <Nav.Link
                                 key={key
                                 className='text-dark border-0 small bg-transparent'
                                 eventKey='details'>
                                 Details
                              </Nav.Link>
                           )}
                        </Nav.Item>
                     </Nav> */}
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
                  <Card.Body>
                     {
                       subscriptionData &&  subscriptionData.hasOwnProperty('proposal') && subscriptionData.proposal.state ==='accepted' ?
                        <>
                           <Alert  variant='primary'>
                              Your last offer was Accepted
                           </Alert>
                           {instructions()}
                        </>
                        :

                        subscriptionData &&  subscriptionData.hasOwnProperty('proposal') && subscriptionData.proposal.state ==='rejected' ?
                        <>
                           <Alert  variant='danger'>
                              Your Offer Was Rejected
                           </Alert>
                           <ListGroup>
                        {/* <h6>You can submit another proposal at anytime.</h6> */}
                        </ListGroup>
                        </>
                        :
                        null
                     }
                  

                  </Card.Body>
                  
               </Tab.Container>
            </Card>
         </Col>
      </Row>
              <GenericModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              header='Informal Offer Accepted'
              body={<ModalBody />}
           />
           </>
   );
};



export default SubscriptionCard;
