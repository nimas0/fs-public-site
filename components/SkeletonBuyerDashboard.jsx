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
} from "react-bootstrap";
import fetch from "isomorphic-unfetch";
import { Settings as LuxonSettings } from "luxon";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useRouter } from "next/router";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCommentDots,
  faCommentsDollar,
  faHeart,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";

import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import withLoginModal from "../utils/pageWrappers/withLoginModal";
import GenericModal from "./GenericModal";

import "firebase/firestore";

import Approval from "./buyers/dashboard/approval/Approval";
import Stat from "./Stat";
import HomeownerInfo from "./HomeownerInfo";
import RenderView from "./buyers/sidebar/RenderView";
import RenderButtons from "./buyers/sidebar/RenderButtons";

import WidgetAction from "./WidgetAction";
import DatePicker from "./DatePicker";
import clsx from "clsx";

const SkeletonBuyerDashboard = ({ AuthUserInfo, showLoginModal }) => {
  const [modalShow, setModalShow] = useState(false);
  const { AuthUser = null } = AuthUserInfo;
  const [loading, setLoading] = useState(true);
  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);
  const breakpoint = useMediaBreakpoints();
  const miniWidget = useRef(0);
  const router = useRouter();

  const ModalBody = () => (
    <>
      {/* <p>
        A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
      </p> */}
      {/* <Upload userId={AuthUser.id} setModalShow={setModalShow} /> */}
    </>
  );

  return (
    <>
      <SkeletonTheme color='#e5e5e5' highlightColor='#ffffff'>
        <Head>
          <title>Finding Spaces – Search for Home</title>
        </Head>
        <Nav showLogo {...{ AuthUser, showLoginModal }} />

        {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
        <Container style={{}} bsPrefix='container-md'>
          {breakpoint.down.md && (
            <Row
              as='h1'
              className='h4 mx-auto mb-3'
              style={{ width: "max-content" }}
            />
          )}

          <Row as='main'>
            <Col lg={6}>
              {breakpoint.down.md && (
                <Col md='auto' />
              )}
              <Skeleton
                style={{ marginBottom: "1rem" }}
                delay={loading ? 3 : 1000}
                height={50}
                count={1}
              />
              <Skeleton delay={loading ? 3 : 1000} height={220} count={1} />

              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />
              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />
              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />
              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />
              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />
              <Skeleton
                className='mr-4 my-2'
                delay={loading ? 3 : 1000}
                height={30}
                width={60}
                count={1}
              />

              <Row xs={12}>
                <Col className='mr-n2' xs={8}>
                  <Skeleton delay={loading ? 3 : 1000} height={260} count={1} />
                </Col>
                <Col xs={4}>
                  <Skeleton
                    className='mb-3'
                    delay={loading ? 3 : 1000}
                    height={120}
                    count={1}
                  />
                  <Skeleton delay={loading ? 3 : 1000} height={120} count={1} />
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
                    delay={loading ? 3 : 1000}
                    height={50}
                    count={1}
                  />
                </Media.Body>
              </Media>
              <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                Questions and Answers
              </h3>
              <Skeleton delay={loading ? 3 : 1000} height={120} count={1} />

              <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                Documents
              </h3>
              <Skeleton delay={loading ? 3 : 1000} height={120} count={1} />

              <h3 style={{ color: "#AEB3B8" }} className='mt-4'>
                Home Details
              </h3>
              <Skeleton delay={loading ? 3 : 1000} height={120} count={1} />
            </Col>

            {breakpoint.up.lg && (
              <>
                <Col lg={5}>
                  <>
                    <Skeleton
                      delay={loading ? 3 : 1000}
                      height={50}
                      count={1}
                      className={`mb-2 w-100  border-0 rounded-0  text-white py-3 px-4 mx-n5 mx-md-n3 mx-lg-0 pb-2 mb-5 my-n2 ${
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
                        className='pt-4 mt-1  bg-transparent text-muted text-center  mb-0'
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
                        delay={loading ? 3 : 1000}
                        height={100}
                        count={1}
                      />

                      <>
                        <Skeleton
                          className='mb-2'
                          delay={loading ? 3 : 1000}
                          height={35}
                          count={1}
                        />
                        <Skeleton
                          className='mb-2'
                          delay={loading ? 3 : 1000}
                          height={35}
                          count={1}
                        />
                        <Skeleton
                          className='mb-2'
                          delay={loading ? 3 : 1000}
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
        <GenericModal
          showFooter={false}
          show={modalShow}
          onHide={() => setModalShow(false)}
          header={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              <h5 className='pr-3 text-white'>
                <b>Action Required: </b>{" "}
              </h5>
              <h6 className='text-white'>
                To unlock this feature please upload a Pre-Qualification,
                Pre-Approval, or Proof of Funds.
              </h6>
            </>
          }
          body={<ModalBody />}
        />
        {/* <Footer /> */}

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
      </SkeletonTheme>
    </>
  );
};

// `withAuthUser` gets the authed user server-side, which disables static
// rendering. `withAuthUserInfo` includes the authed user as a prop to the
// component.
export default SkeletonBuyerDashboard;
