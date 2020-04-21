"use strict";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Button, Row, Col } from "react-bootstrap";
import {
  faHeart,
  faShareAlt,
  faCommentDots,
  faCommentsDollar
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import DatePicker from "./DatePicker";
import WidgetAction from "./WidgetAction";

export default ({
  firstAvailableDate,
  firstDate,
  setFirstDate,
  activeDate,
  setActiveDate,
  dayAvailability,
  getTimeAvailability,
  timeZone,
  AuthUser,
  showLoginModal
}) => {
  const breakpoint = useMediaBreakpoints();

  const [dateButtonsWidth, setDateButtonsWidth] = useState(0);

  const miniWidget = useRef(0);

  const router = useRouter();
  const dateQuery = activeDate
    ? `?date=${activeDate.toFormat("LL-dd-yyyy")}`
    : "";
  const tourLinkHref = `/listing/[listingId]/tour${dateQuery}`;
  const tourLinkAs = `/listing/${router.query.listingId}/tour${dateQuery}`;

  return (
    <>
      <Card
        as="section"
        id="tour-this-home"
        aria-labelledby="tour-this-home-heading"
        className={`py-3 px-2 mx-n2 mx-md-n3 mx-lg-0 mb-5${
          breakpoint.up.lg ? " position-sticky" : ""
        }`}
        style={
          breakpoint.up.lg ? { top: "3rem", zIndex: 1020 } : { zIndex: 1021 }
        }
      >
        <h2
          id="tour-this-home-heading"
          className={clsx("text-center mb-3", breakpoint.lg && "h3")}
        >
          Go Tour This Home
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
            timeZone
          }}
        />

        <div className="text-center mb-1">
          {/* Schedule Tour */}
          <Link href={tourLinkHref} as={tourLinkAs} passHref>
            <Button
              variant="info"
              onClick={
                AuthUser
                  ? false
                  : e => {
                      e.preventDefault();
                      showLoginModal();
                    }
              }
              className={clsx(breakpoint.down.md && "px-5")}
              style={breakpoint.up.lg ? { width: dateButtonsWidth - 4 } : {}}
            >
              Schedule Tour
            </Button>
          </Link>
        </div>
        <div
          className="text-muted mx-auto mb-3"
          style={
            breakpoint.up.lg
              ? { width: dateButtonsWidth - 4, fontSize: "80%" }
              : { fontSize: "80%" }
          }
        >
          *Pre-approval/proof of funds required
          {breakpoint.xs ? <br /> : " "}to book an appointment
        </div>

        <Row
          noGutters
          className="text-center mx-auto mb-n3"
          style={{ width: breakpoint.lg ? "16rem" : "100%" }}
        >
          <Col xs={7} sm={3} lg={7} xl={6} className="mb-3">
            <WidgetAction
              label="Subscribe to Updates"
              icon={faHeart}
              href="#"
            />
          </Col>
          <Col xs={5} sm={3} lg={5} xl={6} className="mb-3">
            <WidgetAction label="Share" icon={faShareAlt} href="#" />
          </Col>
          <Col xs={7} sm={3} lg={7} xl={6} className="mb-3">
            <WidgetAction
              label="Start a Conversation"
              icon={faCommentDots}
              href="#"
            />
          </Col>
          <Col xs={5} sm={3} lg={5} xl={6} className="mb-3">
            <WidgetAction
              label="Make an Offer"
              icon={faCommentsDollar}
              href="#"
            />
          </Col>
        </Row>
      </Card>

      {/* Sticky mini-widget for smaller screen sizes */}
      {breakpoint.down.md && (
        <Card
          ref={miniWidget}
          id="tour-this-home-mini"
          className="position-sticky py-2 px-2 mx-n2 mx-md-n3 mb-5"
          style={{
            marginTop: -miniWidget.current.clientHeight - 2 - 3 * 16 || 0,
            top: 0,
            zIndex: 1020
          }}
        >
          <div className="d-flex justify-content-around align-items-center">
            {/* Schedule Tour */}
            <Link href={tourLinkHref} as={tourLinkAs} passHref>
              <Button
                variant="info"
                onClick={
                  AuthUser
                    ? false
                    : e => {
                        e.preventDefault();
                        showLoginModal();
                      }
                }
                className="px-sm-5"
              >
                Schedule Tour
              </Button>
            </Link>

            <WidgetAction
              title="Subscribe to Updates"
              icon={faHeart}
              href="#"
            />
            <WidgetAction title="Share" icon={faShareAlt} href="#" />
            <WidgetAction
              title="Start a Conversation"
              icon={faCommentDots}
              href="#"
            />
            <WidgetAction
              title="Make an Offer"
              icon={faCommentsDollar}
              href="#"
            />
          </div>
        </Card>
      )}
    </>
  );
};
