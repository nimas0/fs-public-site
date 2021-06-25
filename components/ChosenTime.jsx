import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { Settings as LuxonSettings, DateTime } from "luxon";
import clsx from "clsx";
import fetch from "isomorphic-unfetch";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";

export default ({
  activeDate,
  activeTime,
  hourIncrement,
  timeZone,
  submitting,
  setSubmitting,
  setConfirmed,
  listing,
  user
}) => {
  LuxonSettings.defaultZoneName = timeZone;
  const breakpoint = useMediaBreakpoints();
  const router = useRouter();
  const [failureMessage, setFailureMessage] = useState(null);

  return (
    <Card className={clsx("p-3 mb-5", breakpoint.up.md && "mx-n3")}>
      <Row className='align-items-center'>
        <Col
          xs={12}
          sm={6}
          lg={5}
          xl={4}
          className={clsx(
            !activeDate && "text-secondary",
            breakpoint.down.md && "mb-3"
          )}
        >
          <div
            className={clsx(activeDate && "text-dark")}
            style={{ fontSize: "85%" }}
          >
            DATE
          </div>
          <div className='h4 mb-0'>
            {activeDate
              ? activeDate.toLocaleString({
                  weekday: breakpoint.down.sm ? "short" : "long",
                  month: "long",
                  day: "numeric",
                })
              : "----"}
          </div>
        </Col>

        <Col
          xs={6}
          sm={3}
          lg={2}
          className={clsx(
            !activeTime && "text-secondary",
            breakpoint.down.md && "mb-3"
          )}
        >
          <div style={{ fontSize: "85%" }}>START</div>
          <div className='h4 mb-0'>
            {activeTime
              ? activeTime
                  .toLocaleString({
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(" AM", "am")
                  .replace(" PM", "pm")
              : "----"}
          </div>
        </Col>

        <Col
          xs={6}
          sm={3}
          lg={2}
          className={clsx(
            !activeTime && "text-secondary",
            breakpoint.down.md && "mb-3"
          )}
        >
          <div style={{ fontSize: "85%" }}>END</div>
          <div className='h4 mb-0'>
            {activeTime
              ? activeTime
                  .plus({
                    hours: Math.floor(hourIncrement),
                    minutes: (hourIncrement % 1) * 60,
                  })
                  .toLocaleString({
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(" AM", "am")
                  .replace(" PM", "pm")
              : "----"}
          </div>
        </Col>

        <Col
          xs={12}
          lg={3}
          xl={4}
          className={clsx(breakpoint.down.md && "text-center")}
        >
          <Button
            variant='primary'
            size='lg'
            className={clsx(breakpoint.down.md ? "px-5" : "w-100")}
            disabled={!activeDate || !activeTime || submitting}
            onClick={() => scheduleTour(activeTime, hourIncrement)}
          >
            {submitting ? (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  role='status'
                  aria-hidden='true'
                  className='position-relative mr-2'
                  style={{ height: "1.5rem", width: "1.5rem" }}
                />
                Scheduling...
              </>
            ) : (
              "Schedule Tour"
            )}
          </Button>
        </Col>
      </Row>

      {failureMessage && (
        <div className='text-center text-danger mt-2'>{failureMessage}</div>
      )}
    </Card>
  );

  async function scheduleTour(startTime, durationInHours) {
    // Remove failure message if there
    setFailureMessage(null);

    // Disable all buttons
    setSubmitting(true);

    // Make sure start time is at least 12 hours in the future
    if (startTime < DateTime.local().plus({ hours: 12 })) {
      setFailureMessage(
        "Tours must be scheduled at least 12 hours in advance."
      );
      setSubmitting(false);

      // Refresh page to disable conflicting times
      router.replace(
        "/listing/[listingId]/tour",
        `/listing/${router.query.listingId}/tour`
      );
    }

    try {
      // Send start time and duration through API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tour-schedules`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startTime: startTime.toUTC().toJSON(),
            durationInMinutes: durationInHours * 60,
            listingId: router.query.listingId,
            photoURL: listing.photos[0].src,
            address: listing.fullAddress,
            userId: user.id,
            user: {
              displayName: user.displayName,
              email: user.email,
              id: user.id,
            },
          }),
        }
      );

      // Handle response from API
      if (response.ok) {
        // Go to confirmation page
        setConfirmed(true);
        if (typeof window !== "undefined") {
          window.scroll(0, 0);
        }
        setSubmitting(false);
      } else if (response.status === 409) {
        // Set schedule conflict message
        const { message } = await response.json();
        setFailureMessage(message);
        setSubmitting(false);

        // Refresh page to disable conflicting times
        router.replace(
          "/listing/[listingId]/tour",
          `/listing/${router.query.listingId}/tour`
        );
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (err) {
      console.error("Either a coding error or network issues", err);
      setFailureMessage(
        "We're experiencing network issues—please try again later."
      );
      setSubmitting(false);
    }
  }
};
