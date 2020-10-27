"use strict";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faCalendarAlt,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import fetch from "isomorphic-unfetch";
import {
  Settings as LuxonSettings,
  DateTime,
  Interval,
  Duration,
  LocalZone
} from "luxon";
import clsx from "clsx";
import { words } from "lodash/string";
import { intersection } from "lodash/array";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import DatePicker from "../../../components/DatePicker";
import TimePicker from "../../../components/TimePicker";
import ChosenTime from "../../../components/ChosenTime";
import TourRequestConfirmation from "../../../components/TourRequestConfirmation";
import getSpecificAvailability from "../../../utils/getSpecificAvailability";
import useResizeObserver from "../../../utils/useResizeObserver";
import withAuthUser from "../../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../../utils/pageWrappers/withAuthUserInfo";
import withLoginModal from "../../../utils/pageWrappers/withLoginModal";

// URL to test: http://localhost:3000/listing/KDfFS1FtGblMYSrzLDCZ/tour

const Tour = ({
  listing,
  schedules: stringSchedules,
  AuthUserInfo,
  showLoginModal
}) => {
  const { AuthUser = null } = AuthUserInfo;
  const router = useRouter();
  const breakpoint = useMediaBreakpoints();

  // Convert schedules to Intervals
  const schedules = {
    listing: stringSchedules.listing.map(tour =>
      Interval.after(
        DateTime.fromISO(tour.start),
        Duration.fromObject({ minutes: tour.durationInMinutes })
      )
    ),
    ...(stringSchedules.user && {
      user: stringSchedules.user.map(tour =>
        Interval.after(
          DateTime.fromISO(tour.start),
          Duration.fromObject({ minutes: tour.durationInMinutes })
        )
      )
    })
  };

  // Configure time zones
  const { timeZone } = listing;
  LuxonSettings.defaultZoneName = timeZone;
  const [userTimeZoneDiffers, setUserTimeZoneDiffers] = useState(false);
  const [offsetName, setOffsetName] = useState(DateTime.local().offsetNameLong);
  useEffect(() => {
    setUserTimeZoneDiffers(timeZone !== LocalZone.instance.name);
    const offsetNameNow = DateTime.local().offsetNameLong;
    const offsetNameNextMonth = DateTime.local().plus({ months: 1 })
      .offsetNameLong;
    setOffsetName(
      offsetNameNow === offsetNameNextMonth
        ? offsetNameNow
        : wordsInCommon(offsetNameNow, offsetNameNextMonth)
    );
    function wordsInCommon(...phrases) {
      const splitPhrases = phrases.map(phrase => words(phrase));
      const intersectingWords = intersection(...splitPhrases);
      return intersectingWords.join(" ");
    }
  }, []);

  // Reroute visitors who aren't logged in
  useEffect(() => {
    if (!AuthUser) {
      router.push("/listing/[listingId]", `/listing/${router.query.listingId}`);
    }
  }, [AuthUser]);

  // Listing availability
  const { days: dayAvailability } = listing.generalAvailability;
  const {
    halfHourly: halfHourAvailability,
    hourly: hourAvailability,
    isHourly: hourly
  } = listing.generalAvailability;
  const generalTimeAvailability = hourly
    ? hourAvailability
    : halfHourAvailability;

  /// Set first available date
  // Default to today if no availability in next month
  let firstAvailableDate = DateTime.local().startOf("day");
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
        // If date passes all these, set as firstAvailableDate and exit loop
        firstAvailableDate = DateTime.local()
          .startOf("day")
          .plus({ days: d });
        break;
      }
    }
  }

  // Date picker stuff
  const daysDisplayed = breakpoint.xs
    ? 3
    : breakpoint.sm
    ? 4
    : breakpoint.md
    ? 3
    : breakpoint.lg
    ? 5
    : 6;
  const [firstDate, setFirstDate] = useState(firstAvailableDate);
  const [activeDate, setActiveDate] = useState(null);

  // Time picker stuff
  const firstAvailableHour =
    getSpecificAvailability(
      generalTimeAvailability,
      hourly ? 1 : 0.5,
      schedules
    )(activeDate)[0] || 7;
  const [firstHour, setFirstHour] = useState(firstAvailableHour);
  const [activeTime, setActiveTime] = useState(null);

  // Reset time picker when new date is chosen
  const chooseDate = date => {
    setActiveDate(date);
    setActiveTime(null);
    setFirstHour(
      getSpecificAvailability(
        generalTimeAvailability,
        hourly ? 1 : 0.5,
        schedules
      )(date, true)[0] || 7
    );
  };

  // Match photo height to date and time pickers
  const { ref: dateAndTime, height: dateAndTimeHeight = 0 } = useResizeObserver(
    {
      type: "offset"
    }
  );

  // Import selected date from URL query
  useEffect(() => {
    if (router.query.date) {
      const queryDate = DateTime.fromFormat(router.query.date, "LL-dd-yyyy");
      chooseDate(queryDate);
      // Make sure activeDate is visible
      setFirstDate(
        DateTime.max(
          firstAvailableDate,
          queryDate.minus({ days: daysDisplayed - 1 })
        )
      );
      // Remove from URL query
      router.replace(
        "/listing/[listingId]/tour",
        `/listing/${router.query.listingId}/tour`,
        { shallow: true }
      );
    }
  }, []);

  // Schedule submitting state
  const [submitting, setSubmitting] = useState(false);

  // Confirmation page state
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      <Head>
        <title>
          Schedule Tour – {listing.address[0]}, {listing.address[1]} – Finding
          Spaces
        </title>
      </Head>

      <Nav
        address={
          breakpoint.up.lg
            ? listing.address[0] + ", " + listing.address[1]
            : false
        }
        {...{ AuthUser, showLoginModal }}
      />

      {/* Switch bsPrefix="container-md" to fluid="md" when react-bootstrap releases fix */}
      <Container bsPrefix="container-md">
        {breakpoint.down.md && (
          <div className="h4 mx-auto mb-4" style={{ width: "max-content" }}>
            {listing.address[0]}
            {breakpoint.xs ? <br /> : ", "}
            {listing.address[1]}
          </div>
        )}

        <div className={clsx("mb-4", confirmed && breakpoint.sm && "ml-4")}>
          <Link
            
            href="/listing/[listingId]"
            as={`/listing/${router.query.listingId}`}
            passHref
          >
            <a target="_blank">
              <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-1" />
              Return to listing
            </a>
          </Link>
        </div>

        {confirmed ? (
          <TourRequestConfirmation tourTime={activeTime} />
        ) : (
          <main aria-labelledby="pick-a-time">
            <h1
              id="pick-a-time"
              className={clsx(breakpoint.xs ? "mb-4" : "mb-5")}
            >
              <FontAwesomeIcon icon={faCalendarAlt} /> Pick a Time
            </h1>

            <Row className={clsx(breakpoint.down.lg ? "mb-4" : "mb-5")}>
              <Col xs={12} md="auto">
                <div ref={dateAndTime}>
                  {userTimeZoneDiffers && (
                    <div className="text-info text-center mb-3">
                      <FontAwesomeIcon icon={faInfoCircle} /> All times are in{" "}
                      {offsetName}.
                    </div>
                  )}

                  <DatePicker
                    small={breakpoint.xs}
                    alignment={breakpoint.down.sm ? "center" : "left"}
                    setActiveDate={chooseDate}
                    dayAvailability={dayAvailability}
                    getTimeAvailability={getSpecificAvailability(
                      generalTimeAvailability,
                      hourly ? 1 : 0.5,
                      schedules
                    )}
                    disableAllDates={submitting}
                    className="mb-4"
                    {...{
                      daysDisplayed,
                      firstAvailableDate,
                      firstDate,
                      setFirstDate,
                      activeDate
                    }}
                  />

                  <TimePicker
                    small={breakpoint.xs}
                    alignment={breakpoint.down.sm ? "center" : "left"}
                    availability={getSpecificAvailability(
                      generalTimeAvailability,
                      hourly ? 1 : 0.5,
                      schedules
                    )(activeDate)}
                    hourIncrement={hourly ? 1 : 0.5}
                    hidden={!activeDate}
                    disableAllTimes={submitting}
                    {...{
                      daysDisplayed,
                      firstAvailableHour,
                      firstHour,
                      setFirstHour,
                      activeDate,
                      activeTime,
                      setActiveTime,
                      timeZone
                    }}
                  />
                </div>
              </Col>

              {breakpoint.up.md && (
                <Col md={true} style={{ height: dateAndTimeHeight }}>
                  <Image
                    src={listing.photos[0].src}
                    rounded
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover"
                    }}
                  />
                </Col>
              )}
            </Row>

            <ChosenTime
              hourIncrement={hourly ? 1 : 0.5}
              {...{
                activeDate,
                activeTime,
                timeZone,
                submitting,
                setSubmitting,
                setConfirmed
              }}
              user={AuthUser && AuthUser}
            />
          </main>
        )}
      </Container>

      <Footer />
    </>
  );
};

Tour.getInitialProps = async ctx => {
  // Get current listing data from database
  const listingFetch = fetch(
    `${process.env.HOST}/api/listing?id=${ctx.query.listingId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );

  // Get current tour schedules for listing and user
  const tourSchedulesFetch = fetch(
    `${process.env.HOST}/api/tour-schedules?listingId=${ctx.query.listingId}${
      ctx.myCustomData.AuthUserInfo.AuthUser
        ? `&userId=${ctx.myCustomData.AuthUserInfo.AuthUser.id}`
        : ""
    }`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );

  try {
    // Resolve both fetches
    const [listingResponse, tourSchedulesResponse] = await Promise.all([
      listingFetch,
      tourSchedulesFetch
    ]);

    // Handle response from API
    if (listingResponse.ok && tourSchedulesResponse.ok) {
      const {
        listingSchedule,
        userSchedule
      } = await tourSchedulesResponse.json();
      return {
        ...(await listingResponse.json()),
        schedules: {
          listing: listingSchedule,
          user: userSchedule
        }
      };
    } else if ([404, 503].includes(listingResponse.status)) {
      return { statusCode: listingResponse.status };
    } else if ([404, 503].includes(tourSchedulesResponse.status)) {
      return { statusCode: tourSchedulesResponse.status };
    } else {
      // https://github.com/developit/unfetch#caveats
      let error = new Error(listingResponse.statusText);
      error.response = listingResponse;
      throw error;
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: (err.response && err.response.status) || err.statusCode || 500
    };
  }
};

export default withAuthUser(withAuthUserInfo(withLoginModal(Tour)));
