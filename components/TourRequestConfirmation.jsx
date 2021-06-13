

import React from "react";
import { Card, Button } from "react-bootstrap";
import { Steps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle as checkCircle,
  faCircle as closedCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as openCircle } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import Link from "next/link";

const { Step } = Steps;

export default ({ tourTime, listing }) => {
  const breakpoint = useMediaBreakpoints();
console.log('listing', listing)
  return (
    <main aria-labelledby="tour-requested">
      <h1 id="tour-requested" className="text-center mb-4">
        Tour Requested!
      </h1>

      <Card
        body
        className="text-center mx-auto mb-5"
        style={{ ...(breakpoint.up.sm && { width: "max-content" }) }}
      >
        {/* Time requested */}
        {tourTime && (
          <h2 className="h4 mb-4">
            {tourTime.toLocaleString({
              weekday: "long",
              month: "long",
              day: "numeric"
            })}
            {" "}
            at
            {" "}
            {tourTime.toLocaleString({
              hour: "numeric",
              hour12: true,
              minute: "2-digit",
              timeZoneName: "short"
            })}
          </h2>
        )}

        {/* Tour request steps */}
        <Steps
          current={1}
          direction={breakpoint.xs ? "vertical" : "horizontal"}
          labelPlacement={breakpoint.xs ? "horizontal" : "vertical"}
          size="small"
          className={clsx("text-left", breakpoint.xs ? "mx-auto mb-1" : "mb-4")}
          style={{ width: breakpoint.xs ? "max-content" : "25rem" }}
        >
          <Step
            title="Requested"
            icon={<FontAwesomeIcon icon={checkCircle} />}
          />
          <Step
            title="Confirmed"
            icon={<FontAwesomeIcon icon={openCircle} />}
          />
          <Step
            title="Completed"
            icon={<FontAwesomeIcon icon={closedCircle} />}
          />
        </Steps>

        <p className={clsx(breakpoint.xs && "text-justify")}>
          We're checking if the home can be seen at this time.
          {breakpoint.xs ? " " : <br />}
          We'll get back to you shortly by phone or email.
        </p>

        <Link
          variant="primary"
          className={clsx(breakpoint.xs ? "w-100" : "px-5")} 
          href='/listing/[listingId]'
          as={`/listing/${listing.id}`}
          passHref
        >
          <a>
            View Appointment
          </a>
        </Link>
      </Card>
    </main>
  );
};
