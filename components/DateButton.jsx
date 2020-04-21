"use strict";

import React from "react";
import { Button } from "react-bootstrap";

export default ({
  date,
  small,
  activeDate,
  setActiveDate,
  dayAvailability,
  getTimeAvailability,
  disabled
}) => {
  const available =
    dayAvailability[date.weekdayLong.toLowerCase()] &&
    (getTimeAvailability ? getTimeAvailability(date).length > 0 : true);

  return (
    <Button
      variant="outline-dark"
      className="mr-1"
      style={Object.assign(
        { width: small ? "4.7rem" : "7rem" },
        available ? {} : { cursor: "not-allowed" }
      )}
      active={activeDate && date.hasSame(activeDate, "day")}
      onClick={() => {
        if (activeDate && date.hasSame(activeDate, "day")) {
          setActiveDate(null);
        } else {
          setActiveDate(date);
        }
      }}
      disabled={disabled || !available}
    >
      <div>{small ? date.monthShort : date.monthLong}</div>
      <div className={`display-${small ? 5 : 4}`}>{date.day}</div>
      <div>
        <small>{small ? date.weekdayShort : date.weekdayLong}</small>
      </div>
    </Button>
  );
};
