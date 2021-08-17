/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import Head from "next/head";
import { Container, Row, Col, Alert, Card, Button } from "react-bootstrap";
import fetch from "isomorphic-unfetch";
import { Settings as LuxonSettings, DateTime, Interval } from "luxon";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useRouter } from "next/router";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import absoluteUrl from "next-absolute-url";
import Nav from "../../../components/Nav";
import MobileNav from "../../../components/MobileNav";
import AtAGlance from "../../../components/AtAGlance";
import QuestionsAndAnswers from "../../../components/QuestionsAndAnswers";
import Documents from "../../../components/Documents";
import HomeDetails from "../../../components/HomeDetails";
import TabWidgets from "../../../components/TabWidgets";
import getSpecificAvailability from "../../../utils/getSpecificAvailability";
import withAuthUser from "../../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../../utils/pageWrappers/withAuthUserInfo";
import withLoginModal from "../../../utils/pageWrappers/withLoginModal";
import GenericModal from "../../../components/GenericModal";
import Upload from "../../../components/buyers/approval/UploadForm";

import firebaseInit from "../../../utils/firebaseInit";
import "firebase/firestore";
import SidebarWidget from "../../../components/SidebarWidget";
import SubscriptionCard from "../../../components/buyers/dashboard/subscription/SubscriptionCard";
import SkeletonBuyerDashboard from "../../../components/SkeletonBuyerDashboard";

// Initialize Firebase ap
firebaseInit();
const Listing = ({
  AuthUserInfo,
  listing,
  questions,
  documents,
  owner,
  schedules: stringSchedules,
  showLoginModal,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { AuthUser = null } = AuthUserInfo;
  const [skeleton, setSkeleton] = useState(false);
  const breakpoint = useMediaBreakpoints();
  const { timeZone } = listing;
  LuxonSettings.defaultZoneName = timeZone;
  const router = useRouter();
  // Convert schedules to Intervals
  const schedules = {
    listing: stringSchedules.listing.map((tour) =>
      Interval.fromDateTimes(
        DateTime.fromISO(tour.start),
        DateTime.fromISO(tour.end)
      )
    ),
    ...(stringSchedules.user && {
      user: stringSchedules.user.map((tour) =>
        Interval.fromDateTimes(
          DateTime.fromISO(tour.start),
          DateTime.fromISO(tour.end)
        )
      ),
    }),
  };

  console.log("process", process.env.HOST);
  const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
    firebase
      .firestore()
      .collection("users")
      .doc((AuthUser && AuthUser.id) || "1")
  );


  const [subNotif, loadingSubNotif, errorSubNotif] = useDocument(
    firebase
      .firestore()
      .collection("subscriptions")
      .doc((AuthUser && `${listing.id}_${AuthUser.id}`) || "1")
  );

  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection("interest")
      .where("buyer.buyerUid", "==", (AuthUser && AuthUser.id) || "1")
      .where("listingId", "==", listing.id)
    // {
    //   snapshotListenOptions: { includeMetadataChanges: true },
    // }
  );


  const ModalBody = () => (
    <>
      {/* <p>
        A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
      </p> */}
      <Upload userId={AuthUser.id} setModalShow={setModalShow} />
    </>
  );

  // Listing tour availability
  const { days: dayAvailability } = listing.generalAvailability;
  const {
    halfHourly: halfHourAvailability,
    hourly: hourAvailability,
    isHourly: hourly,
  } = listing.generalAvailability;
  const generalTimeAvailability = hourly
    ? hourAvailability
    : halfHourAvailability;

  /// Set first available date
  // Default to today if no availability in next month
  let tourFirstAvailableDate = DateTime.local().startOf("day");
  // Find first availability in next month
  for (
    let d = 0;
    DateTime.local().plus({ days: d }) <= DateTime.local().plus({ months: 1 });
    d++
  ) {
    // Check day-level general listing availability
    if (
      dayAvailability[
        DateTime.local()
          .plus({ days: d })
          .weekdayLong.toLowerCase()
      ]
    ) {
      // Check time availability
      if (
        getSpecificAvailability(
          generalTimeAvailability,
          hourly ? 1 : 0.5,
          schedules
        )(DateTime.local().plus({ days: d })).length > 0
      ) {
        // If date passes all these, set as tourFirstAvailableDate and exit loop
        tourFirstAvailableDate = DateTime.local()
          .startOf("day")
          .plus({ days: d });
        break;
      }
    }
  }

  // console.log("env", process.env.NODE_ENV);
  // console.log("env3", process.env);

  // Other scheduling widget state
  const [tourFirstDate, setTourFirstDate] = useState(tourFirstAvailableDate);
  const [tourActiveDate, setTourActiveDate] = useState(null);

  if (errorUserDoc || error || errorSubNotif)
    return <strong>Error: {/* {JSON.stringify(error)} */}</strong>;
  if (loadingUserDoc || loading || loadingSubNotif)
    return (
      <SkeletonBuyerDashboard AuthUserInfo={AuthUserInfo} loading={loading} />
    );
  const { verification } = (userDoc && userDoc.data()) || false;
  const leadData = value.docs.length ? value.docs[0].data() : false;
  const subNotifData = (subNotif && subNotif.data()) || false;

  const renderSideBar = () => {
    const matchProposal = "";

    if (value.docs) {
      // return value.docs.map((doc) => (
      //   <>
      //     <div
      //       key={doc.id}
      //       className={`rounded-0 py-5 px-4 mx-n2 mx-md-n3 mx-lg-0 mt-2 mb-4 my-n2${
      //         breakpoint.up.lg ? " position-sticky" : ""
      //       }`}
      //       style={
      //         breakpoint.up.lg
      //           ? { top: "8rem", zIndex: 1020 }
      //           : { zIndex: 1021 }
      //       }
      //     >
      //       <SubscriptionCard
      //         firebase={firebase}
      //         interestId={doc.id}
      //         verification={
      //           loadingUserDoc ? verification : userDoc.data().verification
      //         }
      //         leadData={doc.data()}
      //       />
      //     </div>
      //   </>
      // ));

      return (
        <SidebarWidget
          loading={loading}
          error={error}
          firebase={firebase}
          leadData={leadData}
          interestId={leadData && leadData.id}
          verification={verification}
          key={userDoc}
          isSubscribed={subNotifData}
          subNotif={subNotif.length}
          listing={listing}
          firstAvailableDate={tourFirstAvailableDate}
          firstDate={tourFirstDate}
          setFirstDate={setTourFirstDate}
          activeDate={tourActiveDate}
          setActiveDate={setTourActiveDate}
          dayAvailability={dayAvailability}
          getTimeAvailability={getSpecificAvailability(
            generalTimeAvailability,
            hourly ? 1 : 0.5,
            schedules
          )}
          {...{ timeZone, AuthUser, showLoginModal }}
        />
      );
    }
  };

  // console.log("userDoc", verification);
  console.log("doc stuff", value.docs.length === 0);
  return (
    <>
      <Head>
        <title>
          Finding Spaces – {listing.address[0]}, {listing.address[1]}
        </title>
      </Head>
      {breakpoint.down.md ? 
      (
        <MobileNav
          showLogo
          address={
        breakpoint.up.lg
          ? `${listing.address[0]}, ${listing.address[1]}`
          : false
      }
          {...{ AuthUser, showLoginModal }}
        />
      )
      :
      (
        <Nav
          showLogo
          address={
          breakpoint.up.lg
            ? `${listing.address[0]}, ${listing.address[1]}`
            : false
        }
          {...{ AuthUser, showLoginModal }}
        />
)}
      
      {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
      <Container style={{}} bsPrefix='container-md mt-5'>
        

        <Row as='main'>
          <Col lg={6}>
            <AtAGlance
              listing={listing}
              verification={verification}
              AuthUserInfo={AuthUserInfo}
              setModalShow={setModalShow}
              skeleton={skeleton}
              activity={listing.activity}
              price={listing.currentPrice}
              beds={listing.bedrooms}
              baths={listing.fullBaths + 0.5 * listing.halfBaths}
              sqFt={listing.totalFinishedSqFt}
              pricePerSqFt={Math.round(
                listing.currentPrice / listing.totalFinishedSqFt
              )}
              photos={listing.photos}
              address={`${listing.address[0]}, ${listing.address[1]}`}
              ownerName={owner.displayName}
              ownerPhotoSrc={owner.photoURL}
              {...{ AuthUser, showLoginModal }}
            />

            {breakpoint.down.md && (
              <Col className='mb-4' md='auto'>
                <SidebarWidget
                  leadData={leadData}
                  verification={verification}
                  isSubscribed={!subNotifData}
                  subNotif={subNotif.length}
                  listing={listing}
                  firstAvailableDate={tourFirstAvailableDate}
                  firstDate={tourFirstDate}
                  setFirstDate={setTourFirstDate}
                  activeDate={tourActiveDate}
                  setActiveDate={setTourActiveDate}
                  dayAvailability={dayAvailability}
                  getTimeAvailability={getSpecificAvailability(
                    generalTimeAvailability,
                    hourly ? 1 : 0.5,
                    schedules
                  )}
                  {...{ timeZone, AuthUser, showLoginModal }}
                />
              </Col>
            )}

            <QuestionsAndAnswers
              as='section'
              questions={questions}
              limit={6}
              AuthUser={AuthUser}
            />

            <Documents documents={documents} />

            <HomeDetails
              details={listing.homeDetails}
              features={listing.homeFeatures}
            />

            <TabWidgets />
          </Col>

          {breakpoint.up.lg && (
            <>
              <Col lg={5}>{renderSideBar()}</Col>
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
            <h5 className='px-3 mt-2 text-dark'>
              <b>Action Required: </b>{" "}
            </h5>
            <h6 className='px-3 text-dark'>
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
    </>
  );
};

// sdfsldfjsdfsdf

Listing.getInitialProps = async (ctx, req) => {
  // Get current listing data from database
  const listingFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listing?id=${ctx.query.listingId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  // Get current tour schedules for listing and user
  const tourSchedulesFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tour-schedules?listingId=${
      ctx.query.listingId
    }${
      ctx.myCustomData.AuthUserInfo.AuthUser
        ? `&userId=${ctx.myCustomData.AuthUserInfo.AuthUser.id}`
        : ""
    }`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  try {
    // Resolve both fetches
    const [listingResponse, tourSchedulesResponse] = await Promise.all([
      listingFetch,
      tourSchedulesFetch,
    ]);

    // Handle response from API
    if (listingResponse.ok && tourSchedulesResponse.ok) {
      const {
        listingSchedule,
        userSchedule = null,
      } = await tourSchedulesResponse.json();
      return {
        ...(await listingResponse.json()),
        schedules: {
          listing: listingSchedule,
          ...(userSchedule && { user: userSchedule }),
        },
      };
    }
    if ([404, 503].includes(listingResponse.status)) {
      return { statusCode: listingResponse.status };
    }
    if ([404, 503].includes(tourSchedulesResponse.status)) {
      return { statusCode: tourSchedulesResponse.status };
    }
    // https://github.com/developit/unfetch#caveats
    const error = new Error(listingResponse.statusText);
    error.response = listingResponse;
    throw error;
  } catch (err) {
    console.log(err);
    return {
      statusCode:
        (err.response && err.response.status) || err.statusCode || 500,
    };
  }
};

// `withAuthUser` gets the authed user server-side, which disables static
// rendering. `withAuthUserInfo` includes the authed user as a prop to the
// component.
export default withAuthUser(withAuthUserInfo(withLoginModal(Listing)));
