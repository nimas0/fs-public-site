import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import {
  faHeart,
  faShareAlt,
  faCommentDots,
  faCommentsDollar,
  faExpand,
  faExpandArrowsAlt,
  faLongArrowAltRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Share from "./Share"
import DatePicker from "./DatePicker";
import WidgetAction from "./WidgetAction";

import firebaseInit from "../utils/firebaseInit";

import "firebase/firestore";

import GenericModal from "./GenericModal";
import ExpandButton from "./ExpandButton";
import LoginModal from "./LoginModal";
import Upload from "./buyers/approval/UploadForm";
import InformationBar from "./buyers/dashboard/subscription/InformationBar";
import RenderView from "./buyers/sidebar/RenderView";
import RenderButtons from "./buyers/sidebar/RenderButtons";


// Initialize Firebase app
firebaseInit();

const SidebarWidget = ({
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
  verification,
  leadData,
  isSubscribed,
  firebase,
  interestId,
  value,
  loading,
  error,
}) => {
  const breakpoint = useMediaBreakpoints();
  // console.log("verif", verification);
  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);
  const [share, setShareShow] = useState(true);
  const miniWidget = useRef(0);
  const [modalShow, setModalShow] = React.useState(false);
  const router = useRouter();
  const dateQuery = activeDate
    ? `?date=${activeDate.toFormat("LL-dd-yyyy")}`
    : "";
  const tourLinkHref = `/listing/[listingId]/tour${dateQuery}`;
  const tourLinkAs = `/listing/${router.query.listingId}/tour${dateQuery}`;

  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const buyerId = AuthUser && AuthUser.id;
  const { listingId } = router.query;

  const ModalBody = () => (
    <>
      {/* <p>
         A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
       </p> */}
      <Upload userId={buyerId} />
    </>
  );


  


  const handleLeadInitialization = async () => {
    setSuccess(false);
    setFailure(false);
    setSending(true);
    console.log("test");
    try {
      const { authId } = AuthUser;


      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead-initialize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId: router.query.listingId,
            AuthUser,
            listing,
          }),
        }
      );



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
        console.log("upload successful");
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (err) {
      // Add upload failure message
      setSuccess(false);
      console.error("Either a coding error or network issues", err.response);
      console.log(err);

      // addToast(
      //    `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
      //    {
      //       appearance: 'error',
      //    }
      // );

      setSending(false);
    }
  };


  const handleSubscription = async () => {
    setSuccess(false);
    setFailure(false);
    setSending(true);
    console.log("test");
    try {
     

      if(!AuthUser) {
        showLoginModal()
      }

      const { authId } = AuthUser;
if(isSubscribed) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listing-unsubscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listingId: router.query.listingId,
        AuthUser,
        listing,
      }),
    }
  );
} else {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listing-subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listingId: router.query.listingId,
        AuthUser,
        listing,
      }),
    }
  );

 
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
        console.log("upload successful");
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (err) {
      // Add upload failure message
      setSuccess(false);
      console.error("Either a coding error or network issues", err.response);
      console.log(err);

      // addToast(
      //    `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
      //    {
      //       appearance: 'error',
      //    }
      // );

      setSending(false);
    }
  };




  




  console.log("subnotiffff", isSubscribed);
  // if (!leadData) return "loading";
  return (
    <>
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && ( */}
      <>
        <Card
          as='section'
          id='tour-this-home'
          aria-labelledby='tour-this-home-heading2'
          className={` px-4  mx-md-n3 mx-lg-0 mt-2 mb-4 my-n2${
            breakpoint.up.lg ? " position-sticky" : ""
          }`}
          // style={
          //   breakpoint.up.lg ? { top: "8rem", zIndex: 1020 } : { zIndex: 1021 }
          // }
          style={
            breakpoint.up.lg
              ? {
                  top: "8rem",
                  zIndex: 1020,
                  boxShadow: "inset 4px 4px 30px #bdbdbd",
                }
              : { zIndex: 1021 }
          }
        >
          {/* <h2
              id='tour-this-home-heading'
              className={clsx(
                "text-center text-info mt-5 mb-5",
                breakpoint.lg && "h3"
              )}
            >
              Tour This Home.
            </h2> */}
          <div
            className='pt-4 mt-1  bg-tranparent text-muted text-center  mb-0'
            as='h5'
          >
            <Row
              // style={
              //   breakpoint.up.lg
              //     ? { top: "8rem", zIndex: 1030 }
              //     : { zIndex: 1030 }
              // }
              className=''
            >
              {/* { Generate SideBar} */}
              {RenderView(
                (!!leadData &&
                  leadData.proposal &&
                  leadData.proposal.state) ||
                  "default"
              )}
            </Row>
          </div>
          <Row className='pb-1 mb-3 mx-2'>
            <InformationBar buyerUid={buyerId} listingId={listingId} />
          </Row>
          {!!leadData && !leadData.proposal && (
            <DatePicker
              // eslint-disable-next-line no-nested-ternary
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
          )}
          {!leadData && (
            <DatePicker
              // eslint-disable-next-line no-nested-ternary
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
          )}
          {!verification ||
          (verification.status !== "accepted" &&
            verification.status !== "pending") ? (
              <>
                <div className='mx-4'>
                  <RenderButtons
                    setModalShow={AuthUser ? setModalShow : showLoginModal}
                    type='unverified'
                    label='Schedule an Appointment'
                  />
                  <RenderButtons
                    setModalShow={AuthUser ? setModalShow : showLoginModal}
                    type='unverified'
                    label='Make an Offer'
                  />
                  <RenderButtons
                    setModalShow={AuthUser ? setModalShow : showLoginModal}
                    type='unverified'
                    label='Chat with Seller'
                  />
                  <Button
                    target='_blank'
                    href='https://seller.findingspaces.com'
                    id='tour-this-home2'
                    aria-labelledby='tour-this-home-heading'
                    className={` w-100  border-0 bg-transparent py-3 mt-3 text-primary px-n3    mx-lg-0 pb-2 1  ${
                  breakpoint.up.lg ? " position-sticky" : ""
                }`}
                  >
                    <Row>
                      <Col xs='12'>
                        Sign up to sell your home
                        {" "}
                        <FontAwesomeIcon className='ml-2' icon={faArrowRight} />
                      </Col>
                    </Row>
                  </Button>
                </div>
              </>
          ) : (
            <>
              <div className='mx-4'>
                <RenderButtons
                  router={router}
                  leadData={leadData}
                  type='scheduling'
                  label='Schedule Appointment'
                  tourLinkAs={tourLinkAs}
                  handleLeadInitialization={handleLeadInitialization}
                />
                <RenderButtons
                  leadData={leadData}
                  type='chat'
                  label='Chat with Seller'
                  router={router}
                  handleLeadInitialization={handleLeadInitialization}
                  listingId={listingId}
                  buyerId={buyerId}
                />
                <RenderButtons
                  leadData={leadData}
                  type='proposal'
                  label='Make an Offer'
                  buyerId={buyerId}
                  router={router}
                  listingId={listingId}
                  handleLeadInitialization={handleLeadInitialization}
                />
                <Button
                  target='_blank'
                  href='https://seller.findingspaces.com'
                  id='tour-this-home2'
                  aria-labelledby='tour-this-home-heading'
                  className={` w-100  border-0 bg-transparent py-3 mt-3 text-primary px-n3    mx-lg-0 pb-2 mb-3  ${
                  breakpoint.up.lg ? " position-sticky" : ""
                }`}
                >
                  <Row>
                    <Col xs='12'>
                      Sign up to sell your home
                      {" "}
                      <FontAwesomeIcon className='ml-2' icon={faArrowRight} />
                    </Col>
                  </Row>
                </Button>
              </div>
            </>
          )}
          {/* <div
            className='text-muted mx-auto mb-3'
            style={
              breakpoint.up.lg
                ? { width: dateButtonsWidth - 4, fontSize: "80%" }
                : { fontSize: "80%" }
            }
          >
            *Pre-approval/proof of funds required
            {breakpoint.xs ? <br /> : " "}
            to book an appointment
          </div> */}
          {/* Disabled temporarily until we write a new subscription solution */}
          <Row
            noGutters
            className='text-center mx-auto'
            style={{ width: breakpoint.lg ? "16rem" : "100%" }}
          >
            <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
              <WidgetAction
                handleClick={handleSubscription}
                label={isSubscribed ? 'You are recieving updates' : 'Subscribe to Updates'}
                icon={faHeart}
                href='#'
                isSubscribed={!!isSubscribed}
              />
            </Col>
            <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
              <WidgetAction
                handleClick={() => setShareShow(true)}
                label='Share'
                icon={faShareAlt}
                href='#'
              />
            </Col>
          </Row>
        </Card>

        {/* Sticky mini-widget for smaller screen sizes */}

      </>

      <GenericModal
        showFooter={false}
        show={modalShow}
        handleClose={() => setModalShow(false)}
        onHide={() => setModalShow(false)}
        header='Pre-Approval or Pre-Qualification Required.'
        body={<ModalBody />}
      />
      <GenericModal
        showFooter={false}
        show={share}
        handleClose={() => setShareShow(false)}
        onHide={() => setShareShow(false)}
        header='Share the listing with friends'
        body={<Row className='m-5'><Share address={listing.fullAddress} listingId={listingId} /></Row>}
      />
    </>
  );
};

export default SidebarWidget;
