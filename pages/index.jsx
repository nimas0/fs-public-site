/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useState } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Media,
  Image,
  Badge,
  Navbar,
} from "react-bootstrap";
import { Settings as LuxonSettings } from "luxon";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useRouter } from "next/router";
import { Divider } from "antd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCommentDots,
  faCommentsDollar,
  faHeart,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";


import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import withLoginModal from "../utils/pageWrappers/withLoginModal";
import GenericModal from "../components/GenericModal";

import "firebase/firestore";
import "./homepage.module.css";

import WidgetAction from "../components/WidgetAction";
import DatePicker from "../components/DatePicker";
import clsx from "clsx";
import HomeSearch from "../components/HomeSearch.";
import DividerWithText from "../components/DividerWithText";

const Listing = ({
  AuthUserInfo,

  showLoginModal,
}) => {
  console.log("env", process.env.NODE_ENV);
  const [modalShow, setModalShow] = useState(true);
  const { AuthUser = null } = AuthUserInfo;
  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);
  const breakpoint = useMediaBreakpoints();
  const miniWidget = useRef(0);
  console.log('AuthUserInfo', AuthUserInfo);
  const ModalBody = () => (
    <>
      <Nav showLogo {...{ AuthUser, showLoginModal }} />
      <Container className='bg-info justify-content-center  p-5'>
        <Row className='justify-content-center mx-5' xs={12}>
          <Col className='d-inline' xs='auto'>
            <h5 className=' text-dark'>
              <b>Enter Home Code</b>{" "}
            </h5>
          </Col>

          <p className=' text-light mx-3'>
            View Details, Schedule an Appointment, Chat, or Make an Offer
          </p>
        </Row>
       
        <Row className='justify-content-center pt-3 pb-0 mx-5 mt-2  mb-2' xs={12}>
          <HomeSearch AuthUser={AuthUser} setModalShow={setModalShow} />
        </Row>
        <Row className='justify-content-center  mx-1 my-2 ml-1'>
          <Col xs={5}> <Divider className='bg-light' orientation="left" /></Col>
          <Col className='mt-2 text-light' xs={1}>or</Col>
          <Col xs={5}> <Divider className='bg-light' orientation="right" /></Col>
        </Row>
       
 
        <Row />
        {/* <Row className='justify-content-center' xs={12}>
          {" "}
          <h3 className='text-white my-5 py-2'>or</h3>
        </Row> */}
        {/* <Row className='justify-content-right mt-4 ml-3' xs={12}>
          <h5 className='text-primary ml-5'>
            <strong>Sell your Home. Save Money.</strong>
          </h5>
        </Row> */}
        <Row className='justify-content-right mt-2 ml-5' xs={12}>
          <Col xs={7}>
            <h5 className='text-white mb-4 text-center'>
              <strong>Sell your Home. Save Money.</strong>
            </h5>
            <p className='text-light text-center'>
              Finding Space's one-stop online dashboard makes selling without a real estate agent completely
              effortless by providing: Scheduling, Website, Tips, etc
            </p>
            <Button
              as='a'
              variant='outlined'
              target='_blank'
              href='https://seller.findingspaces.com'
              className='border border-primary'
              block
            >
              <strong>Sign up or Login</strong>
            </Button>
          </Col>
          <Col xs={5}>
            <img src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/AdobeStock_3558899111111111169.png?alt=media&token=3c165f22-8853-4b43-8b45-bb5ab0a5bed6' />
          </Col>
        </Row>
      </Container>
    </>
  );
  const ModalBodyMobile = () => (
    <>
      <Row style={{height: '100%'}} className='justify-content-center mx-3' xs={12}>
        <Col className='d-inline' xs='12'>
          <h5 className='text-dark text-center'>
            <b>Enter Home Code</b>{" "}
          </h5>
        </Col>

        <p className=' text-dark text-center'>
          View Details, Schedule an Appointment, Chat, or Make an Offer
        </p>
      </Row>
       
      <Row className='justify-content-center pt-3 pb-0 mt-2  mb-2' xs={12}>
        <HomeSearch AuthUser={AuthUser} setModalShow={setModalShow} />
      </Row>
      <Row className='justify-content-center  mx-1 my-2 ml-1'>
        <Col xs={5}> <Divider className='bg-secondary' orientation="left" /></Col>
        <Col className='mt-2 text-secondary' xs={1}>or</Col>
        <Col xs={5}> <Divider className='bg-secondary' orientation="right" /></Col>
      </Row>
       
 
      <Row />
      {/* <Row className='justify-content-center' xs={12}>
          {" "}
          <h3 className='text-white my-5 py-2'>or</h3>
        </Row> */}
      {/* <Row className='justify-content-right mt-4 ml-3' xs={12}>
          <h5 className='text-primary ml-5'>
            <strong>Sell your Home. Save Money.</strong>
          </h5>
        </Row> */}
      <Row className='justify-content-center mt-2 mx-2' xs={12}>
        <Col xs={12}>
          <h5 className='text-dark mb-4 text-center'>
            <strong>Sell your Home. Save Money.</strong>
          </h5>
          <p className='text-dark text-center'>
            Finding Space's one-stop online dashboard makes selling without a real estate agent completely
            effortless by providing: Scheduling, Website, Tips, etc
          </p>
          <Button
            as='a'
            variant='contained'
            target='_blank'
            href='https://seller.findingspaces.com'
            className='border bg-primary border-primary'
            block
          >
            <strong>Sign up or Login</strong>
          </Button>
        </Col>
       
      </Row>
    </>
  );

  return (
    <>
      <Head>
        <title>Finding Spaces – Search for Home</title>
      </Head>
      {breakpoint.up.lg ? 
      (      
        <>
          <SkeletonTheme color='#d6d6d6' highlightColor='#ffffff'>
            {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
            <Container style={{ borderRadius: "30px" }} bsPrefix='container-md'>

              <Row as='main'>
                <Col lg={6}>
                  <Skeleton
                    style={{ marginBottom: "1rem" }}
                    delay={modalShow ? 1000 : 0}
                    height={50}
                    count={1}
                  />
                  <Skeleton delay={modalShow ? 1000 : 0} height={220} count={1} />

                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />
                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />
                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />
                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />
                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />
                  <Skeleton
                    className='mr-4 my-2'
                    delay={modalShow ? 1000 : 0}
                    height={30}
                    width={60}
                    count={1}
                  />

                  <Row xs={12}>
                    <Col className='mr-n2' xs={8}>
                      <Skeleton
                        delay={modalShow ? 1000 : 0}
                        height={260}
                        count={1}
                      />
                    </Col>
                    <Col xs={4}>
                      <Skeleton
                        className='mb-3'
                        delay={modalShow ? 1000 : 0}
                        height={120}
                        count={1}
                      />
                      <Skeleton
                        delay={modalShow ? 1000 : 0}
                        height={120}
                        count={1}
                      />
                    </Col>
                  </Row>
                  <Media style={{ clear: "left", marginTop: 40 }}>
                    <Image
                      width={95}
                      height={95}
                      className='mr-3'
                      src='https://jmcp.edu.pk/wp-content/uploads/2020/10/blank-profile-picture-973460_1280-300x300-1.jpg'
                      alt='Homeowner'
                      rounded
                    />
                    <Media.Body>
                      <h5 className='text-muted'>Homeowner</h5>
                      <Skeleton
                        className='mb-3'
                        delay={modalShow ? 1000 : 0}
                        height={50}
                        count={1}
                      />
                    </Media.Body>
                  </Media>
                  <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                    Questions and Answers
                  </h3>
                  <Skeleton delay={modalShow ? 1000 : 0} height={120} count={1} />

                  <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                    Documents
                  </h3>
                  <Skeleton delay={modalShow ? 1000 : 0} height={120} count={1} />

                  <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                    Home Details
                  </h3>
                  <Skeleton delay={modalShow ? 1000 : 0} height={120} count={1} />
                </Col>

                {breakpoint.up.lg && (
                <>
                  <Col lg={5}>
                    <>
                      <Skeleton
                        delay={modalShow ? 1000 : 0}
                        height={50}
                        count={1}
                        className={` mb-2 w-100  border-0 rounded-0  text-dark py-3 px-4 mx-n5 mx-md-n3 mx-lg-0 pb-2 mb-5 my-n2 ${
                breakpoint.up.lg ? " position-sticky" : ""
              }`}
                        style={
                breakpoint.up.lg
                  ? { top: "6rem", zIndex: 1040 }
                  : { zIndex: 1040 }
              }
                      />

                      <Card
                        as='section'
                        id='tour-this-home'
                        aria-labelledby='tour-this-home-heading2'
                        className={`rounded-0 px-4 bg-transparent border-0 mx-md-n3 mx-lg-0 mt-2 mb-4 my-n2${
                breakpoint.up.lg ? " position-sticky" : ""
              }`}
                        style={
                breakpoint.up.lg
                  ? { top: "8rem", zIndex: 1020 }
                  : { zIndex: 1021 }
              }
                      >
                        
                        <div
                          className='pt-4 mt-1  bg-transparent text-muted text-center  mb-0'
                          as='h5'
                        >
                          <Row
                            className=''
                          >
                            {/* { Generate SideBar} */}
                            <h2
                              className={clsx(
                      "text-center bg-transparent w-100 border-0 text-secondary mt-4 pb-2 pl-1",
                      "h3"
                    )}
                            >
                              {" "}
                            </h2>
                          </Row>
                        </div>
                        <Row className='pb-1 mb-2 mx-2'>
                          {/* <InformationBar
                  buyerUid={buyerId}
                  listingId={listingId}
                /> */}
                        </Row>

                        <Skeleton
                          className='mb-2'
                          delay={1000}
                          height={100}
                          count={1}
                        />

                        <>
                          <Skeleton
                            className='mb-2'
                            delay={1000}
                            height={35}
                            count={1}
                          />
                          <Skeleton
                            className='mb-2'
                            delay={1000}
                            height={35}
                            count={1}
                          />
                          <Skeleton
                            className='mb-2'
                            delay={1000}
                            height={35}
                            count={1}
                          />
                        </>

                        <div
                          className='text-muted mx-auto mb-3'
                          style={
                  breakpoint.up.lg
                    ? { width: dateButtonsWidth - 4, fontSize: "80%" }
                    : { fontSize: "80%" }
                }
                        />
                        <Row
                          noGutters
                          className='text-center mx-auto'
                          style={{ width: breakpoint.lg ? "16rem" : "100%" }}
                        >
                          <Col xs={7} sm={3} lg={7} xl={6} className='mb-3'>
                            <div className='h1-icon'>
                              <FontAwesomeIcon
                                size='xs'
                                color='grey'
                                icon={faHeart}
                              />
                            </div>
                          </Col>
                          <Col xs={5} sm={3} lg={5} xl={6} className='mb-3'>
                            <div className='h1-icon'>
                              <FontAwesomeIcon
                                size='xs'
                                color='grey'
                                icon={faShareAlt}
                              />
                            </div>
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
                  marginTop:
                    -miniWidget.current.clientHeight - 2 - 3 * 16 || 0,
                  top: 0,
                  zIndex: 1020,
                }}
                      >
                        <div className='d-flex justify-content-around align-items-center mb-3'>
                          {/* Schedule Tour */}
                          <>
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
                          </>

                          <WidgetAction
                            title='Subscribe to Updates'
                            icon={faHeart}
                          />
                          <WidgetAction title='Share' icon={faShareAlt} />
                          <WidgetAction
                            title='Start a Conversation'
                            icon={faCommentDots}
                          />
                          <WidgetAction
                            title='Make an Offer'
                            icon={faCommentsDollar}
                          />
                        </div>
                      </Card>
            )}
                    </>
                  </Col>
                </>
    )}
              </Row>
            </Container>
          </SkeletonTheme>
          <GenericModal
            backdrop={false}
            showFooter={false}
            showHeader={false}
            show={modalShow}
            onHide={() => setModalShow(false)}
            body={<ModalBody setModalShow={setModalShow} />}
          />
          {/* <Footer /> */}
        </>
      )
            : 
      (
        <>
          <MobileNav {...{ AuthUser, showLoginModal }} />
          <Container style={{marginLeft: 'auto', marginTop: '2rem',}}>
            {/* <img style={{   maxHeight: '42vh', overflow:'hidden', objectFit: "cover" }} alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/websiteimages%2FFamily%20moving%20boxes%20no%20sidewalk.png?alt=media&token=5c7b62a3-c9d8-4806-9d5e-9d5eba60b3b9" /> */}
          </Container>
          <Container style={{  height:'100%', marginTop: 'auto', paddingTop:'3rem', paddingBottom: '11rem'}}>
            <ModalBodyMobile setModalShow={setModalShow} />
          </Container>
        </>
      )}
     
     
      <style jsx global>
        {`
          body {
            background-color: #ededed;
          }
          h1 {
            font-weight: 700;
          }
          p {
            margin-bottom: 10px;
          }
        `}
      </style>
    </>
  );
};

// `withAuthUser` gets the authed user server-side, which disables static
// rendering. `withAuthUserInfo` includes the authed user as a prop to the
// component.
export default withAuthUser(withAuthUserInfo(withLoginModal(Listing)));
