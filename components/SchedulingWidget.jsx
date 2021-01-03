'use strict';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {
   faHeart,
   faShareAlt,
   faCommentDots,
   faCommentsDollar,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import useMediaBreakpoints from '@tywmick/use-media-breakpoints';
import DatePicker from './DatePicker';
import WidgetAction from './WidgetAction';
import { useDocument, useCollectionData } from 'react-firebase-hooks/firestore';

import firebaseInit from '../utils/firebaseInit';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect } from 'react';
import GenericModal from './GenericModal';

// Initialize Firebase app
firebaseInit();

const SchedulingWidget = ({
   listing,
   firstAvailableDate,
   firstDate,
   setFirstDate,
   activeDate,
   setActiveDate,
   dayAvailability,
   getTimeAvailability,
   timeZone,
   AuthUser,
   showLoginModal,
   setSubscribed,
}) => {
   const breakpoint = useMediaBreakpoints();

   const [dateButtonsWidth, setDateButtonsWidth] = useState(0);

   const miniWidget = useRef(0);
   const [modalShow, setModalShow] = React.useState(false);
   const router = useRouter();
   const dateQuery = activeDate ? `?date=${activeDate.toFormat('LL-dd-yyyy')}` : '';
   const tourLinkHref = `/listing/[listingId]/tour${dateQuery}`;
   const tourLinkAs = `/listing/${router.query.listingId}/tour${dateQuery}`;

   const [success, setSuccess] = React.useState(false);
   const [failure, setFailure] = React.useState(false);
   const [sending, setSending] = React.useState(false);

   const buyerId = AuthUser && AuthUser.id;
   const listingId = router.query.listingId;
   const interestId = `${listingId}_${buyerId}`;
   console.log('AuthUser', AuthUser);

   // react hook for firebase firestore listener
   const [value, loading, error] = useDocument(firebase.firestore().doc(`interest/${interestId}`), {
      snapshotListenOptions: { includeMetadataChanges: true },
   });

   const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
      firebase
          .firestore()
          .collection('users')
          .doc(AuthUser && AuthUser.id || "asdf")
  );

   if (!loading) {
      console.log('listingId', value.data());
   }

   useEffect(() => {
      if (!loading && !error && value.data()) {
         return setSubscribed(true);
      }
      if (!loading && !error) {
         return setSubscribed(false);
      }

   }, [value]);

   const handleSubscribe = async () => {
      setSuccess(false);
      setFailure(false);
      setSending(true);
      console.log('test');
      try {
         const { authId } = AuthUser;

         if (!!value.data()) {
            // Send offer info through API
            let interestId = `${router.query.listingId}_${AuthUser.id}`;
            const response = await fetch('/api/unsubscribe-listing', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ interestId }),
            });
            console.log('nope');
         } else {
            // Send offer info through API
            const response = await fetch('/api/subscribe-listing', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ listingId: router.query.listingId, AuthUser, listing }),
            });
         }

         // // Send offer info through API
         // const response = await fetch('/api/subscribe-listing', {
         //    method: 'POST',
         //    headers: { 'Content-Type': 'application/json' },
         //    body: JSON.stringify({ listingId: router.query.listingId, AuthUser, listing }),
         // });

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
            console.log('upload successful');
         } else {
            // https://github.com/developit/unfetch#caveats
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
         }
      } catch (err) {
         // Add upload failure message
         setSuccess(false);
         console.log(err);
         console.error('Either a coding error or network issues', err.response);
         // addToast(
         //    `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
         //    {
         //       appearance: 'error',
         //    }
         // );

         setSending(false);
      }
   };

   return (
      <>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
         {value && (
            <>
               <Card
                  as='section'
                  id='tour-this-home'
                  aria-labelledby='tour-this-home-heading'
                  className={` defaultCard py-5 px-4 mx-n2 mx-md-n3 mx-lg-0 mb-5 my-n2${
                     breakpoint.up.lg ? ' position-sticky' : ''
                  }`}
                  style={
                     breakpoint.up.lg
                        ? { top: '8rem', zIndex: 1020, boxShadow: 'inset 4px 4px 30px #bdbdbd' }
                        : { zIndex: 1021 }
                  }>
                  <h2
                     id='tour-this-home-heading'
                     className={clsx('text-center text-info mb-5', breakpoint.lg && 'h3')}>
                     Tour This Home.
                  </h2>

                  <DatePicker
                     daysDisplayed={breakpoint.sm ? 4 : breakpoint.md ? 5 : 3}
                     small={breakpoint.xs || breakpoint.lg}
                     dayAvailability={dayAvailability}
                     getTimeAvailability={getTimeAvailability}
                     {...{
                        firstAvailableDate,
                        firstDate,
                        setFirstDate,
                        activeDate,
                        setActiveDate,
                        setDateButtonsWidth,
                        timeZone,
                     }}
                  />

                  <div className='text-center mb-1 mt-2'>
                     {/* Schedule Tour */}
                    
                        
                    {
                     !loadingUserDoc && !errorUserDoc && userDoc.data() && userDoc.data().hasOwnProperty('verification') && (userDoc.data().verification.status === false) ? (
                        <Button
                           variant='primary'
                           onClick={
                                  (e) => {
                                      e.preventDefault();
                                      setModalShow(true);
                                   }
                           }
                           className={clsx(breakpoint.down.md && 'px-5', 'buttonShadow')}
                           style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}>
                           Schedule Tour
                        </Button>
                     ) : 
                     (
                        <>
                        <Link target="_blank" href={tourLinkHref} as={tourLinkAs} passHref>
                        <Button
                        variant='primary'
                        onClick={
                           AuthUser
                              ? false
                              : (e) => {
                                   e.preventDefault();
                                   showLoginModal();
                                }
                        }
                        className={clsx(breakpoint.down.md && 'px-5', 'buttonShadow')}
                        style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}>
                        Schedule Tour.
                     </Button>
                     </Link>
                     </>
                     )
                     
                     }
                      
                    
                  </div>
                  <div
                     className='text-muted mx-auto mb-3'
                     style={
                        breakpoint.up.lg
                           ? { width: dateButtonsWidth - 4, fontSize: '80%' }
                           : { fontSize: '80%' }
                     }>
                     *Pre-approval/proof of funds required
                     {breakpoint.xs ? <br /> : ' '}to book an appointment
                  </div>

                  <Row
                     noGutters
                     className='text-center mx-auto mb-n3'
                     style={{ width: breakpoint.lg ? '16rem' : '100%' }}>
                     <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
                        <WidgetAction
                           handleClick={handleSubscribe}
                           label='Subscribe to Updates'
                           icon={faHeart}
                           href='#'
                           isSubscribed={!!value.data()}
                        />
                     </Col>
                     <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
                        <WidgetAction
                           handleClick={handleSubscribe}
                           label='Share'
                           icon={faShareAlt}
                           href='#'
                        />
                     </Col>
                     {/* <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
                        <WidgetAction
                           handleClick={handleSubscribe}
                           label='Start a Conversation'
                           icon={faCommentDots}
                           href='#'
                        />
                     </Col>
                     <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
                        <WidgetAction
                           handleClick={handleSubscribe}
                           label='Make an Offer'
                           icon={faCommentsDollar}
                           href='#'
                        />
                     </Col> */}
                  </Row>
               </Card>

               {/* Sticky mini-widget for smaller screen sizes */}
               {breakpoint.down.md && (
                  <Card
                     ref={miniWidget}
                     id='tour-this-home-mini'
                     className='position-sticky py-2 px-2 mx-n2 mx-md-n3 mb-5'
                     style={{
                        marginTop: -miniWidget.current.clientHeight - 2 - 3 * 16 || 0,
                        top: 0,
                        zIndex: 1020,
                     }}>
                     <div className='d-flex justify-content-around align-items-center'>
                        {/* Schedule Tour */}
                        <Link href={tourLinkHref} as={tourLinkAs}  passHref>
                           <Button
                              variant='info'
                              onClick={
                                 AuthUser
                                    ? false
                                    : (e) => {
                                         e.preventDefault();
                                         showLoginModal();
                                      }
                              }
                              className='px-sm-5'>
                              Schedule Tour
                           </Button>
                        </Link>

                        <WidgetAction title='Subscribe to Updates' icon={faHeart} />
                        <WidgetAction title='Share' icon={faShareAlt} />
                        <WidgetAction title='Start a Conversation' icon={faCommentDots} />
                        <WidgetAction title='Make an Offer' icon={faCommentsDollar} />
                     </div>
                  </Card>
               )}
            </>
         )}
          <GenericModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            header='Pre-Approval or Pre-Qualification Required.'
            body={<ModalBody />}
         />
      </>
   );
};

const ModalBody = () => (
   <>
      <p>
      A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
      </p>
   </>
);

export default SchedulingWidget;
