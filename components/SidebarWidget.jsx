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
  setSubscribed,
  verification,
  subscriptionData,
  firebase,
  interestId,
  value,
  loading,
  error,
}) => {
  const breakpoint = useMediaBreakpoints();
  // console.log("verif", verification);
  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);
  const [modalShown, setModalShown] = useState(false);
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
  // const interestId = `${listingId}_${buyerId}`;

  // react hook for firebase firestore listener
  // const [value, loading, error] = useDocument(
  //   firebase.firestore().doc(`interest/${interestId}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  console.log("router", subscriptionData);

  // if (!loading) {
  //   console.log("listingId", value.data());
  // }

  const ModalBody = () => (
    <>
      {/* <p>
         A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
       </p> */}
      <Upload userId={buyerId} />
    </>
  );

  useEffect(() => {
    if (!loading && !error && subscriptionData) {
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
    console.log("test");
    try {
      const { authId } = AuthUser;

      if (subscriptionData) {
        // Send offer info through API
        // const interestId = `${router.query.listingId}_${AuthUser.id}`;
        const response = await fetch("/api/unsubscribe-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interestId }),
        });
        console.log("nope");
      } else {
        // Send offer info through API
        const response = await fetch("/api/subscribe-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId: router.query.listingId,
            AuthUser,
            listing,
          }),
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
  console.log("proposal", !!subscriptionData);
  // if (!subscriptionData) return "loading";
  return (
    <>
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && ( */}
      <>
        <Button
          id='tour-this-home2'
          aria-labelledby='tour-this-home-heading'
          className={` w-100  border-0 rounded-0 bg-primary text-white py-3 px-4 mx-n5 mx-md-n3 mx-lg-0 pb-2 mb-5 my-n2 ${
            breakpoint.up.lg ? " position-sticky" : ""
          }`}
          style={
            breakpoint.up.lg ? { top: "6rem", zIndex: 1030 } : { zIndex: 1030 }
          }
        >
          <Row>
            <Col xs='10'>Sign up and Sell your home</Col>
            <Col xs='auto'>
              <FontAwesomeIcon icon={faArrowRight} />
            </Col>
          </Row>
        </Button>
        <Card
          as='section'
          id='tour-this-home'
          aria-labelledby='tour-this-home-heading2'
          className={`rounded-0 px-4  mx-md-n3 mx-lg-0 mt-2 mb-4 my-n2${
            breakpoint.up.lg ? " position-sticky" : ""
          }`}
          style={
            breakpoint.up.lg ? { top: "8rem", zIndex: 1020 } : { zIndex: 1021 }
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
            className='pt-4 mt-1  bg-white text-muted text-center  mb-0'
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
                (!!subscriptionData &&
                  subscriptionData.proposal &&
                  subscriptionData.proposal.state) ||
                  "default"
              )}
            </Row>
          </div>
          <Row className='pb-1 mb-3 mx-2'>
            <InformationBar buyerUid={buyerId} listingId={listingId} />
          </Row>
          {!!subscriptionData && !subscriptionData.proposal && (
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
          {!subscriptionData && (
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
            </>
          ) : (
            <>
              <RenderButtons
                router={router}
                subscriptionData={subscriptionData}
                type='scheduling'
                label='Schedule Appointment'
                tourLinkAs={tourLinkAs}
                handleSubscribe={handleSubscribe}
              />
              <RenderButtons
                subscriptionData={subscriptionData}
                type='chat'
                label='Chat with Seller'
                router={router}
                handleSubscribe={handleSubscribe}
                listingId={listingId}
                buyerId={buyerId}
              />
              <RenderButtons
                subscriptionData={subscriptionData}
                type='proposal'
                label='Make an Offer'
                buyerId={buyerId}
                router={router}
                listingId={listingId}
                handleSubscribe={handleSubscribe}
              />
            </>
          )}

          <div
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
          </div>
          <Row
            noGutters
            className='text-center mx-auto'
            style={{ width: breakpoint.lg ? "16rem" : "100%" }}
          >
            <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
              <WidgetAction
                // handleClick={handleSubscribe}
                label='Subscribe to Updates'
                icon={faHeart}
                href='#'
                isSubscribed={!!subscriptionData}
              />
            </Col>
            <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
              <WidgetAction
                // handleClick={handleSubscribe}
                label='Share'
                icon={faShareAlt}
                href='#'
              />
            </Col>
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
            }}
          >
            <div className='d-flex justify-content-around align-items-center mb-3'>
              {/* Schedule Tour */}
              <Link href={tourLinkHref} as={tourLinkAs} passHref>
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
                  className='px-sm-5'
                >
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

      <GenericModal
        showFooter={false}
        show={modalShow}
        onHide={() => setModalShow(false)}
        header='Pre-Approval or Pre-Qualification Required.'
        body={<ModalBody />}
      />
    </>
  );
};

export default SidebarWidget;
