"use strict";

import React from "react";
import { Button } from "react-bootstrap";
import { Settings as LuxonSettings, DateTime } from "luxon";

export default ({
  hour,
  small,
  availability,
  hourIncrement,
  activeDate,
  activeTime,
  setActiveTime,
  timeZone,
  disabled
}) => {
  LuxonSettings.defaultZoneName = timeZone;
  const available = Array.isArray(availability) && availability.includes(hour);
  const time = activeDate
    ? activeDate.set({ hour: Math.floor(hour), minute: (hour % 1) * 60 })
    : DateTime.local()
        .startOf("day")
        .set({ hour: Math.floor(hour), minute: (hour % 1) * 60 });

  return (
    <Button
      variant="dark"
      className="mr-1 py-2"
      style={Object.assign(
        { width: small ? "4.7rem" : "7rem" },
        available ? {} : { cursor: "not-allowed" }
      )}
      active={+time === +activeTime}
      onClick={() => {
        if (+time === +activeTime) {
          setActiveTime(null);
        } else {
          setActiveTime(time);
        }
      }}
      disabled={disabled || !available}
    >
      <div
        className="text-center"
        style={{
          fontSize: small
            ? hourIncrement === 1
              ? "1.1rem"
              : "1.15rem"
            : "1.15rem"
        }}
      >
        {small ? (
          hourIncrement === 1 ? (
            time.toFormat("ha").toLowerCase()
          ) : (
            <>
              {time.toFormat("h:mm")}
              <br />
              <span style={{ fontSize: "0.85em" }}>{time.toFormat("a")}</span>
            </>
          )
        ) : (
          time
            .toLocaleString(DateTime.TIME_SIMPLE)
            .toLowerCase()
            .replace(" ", "")
        )}
      </div>
    </Button>
  );
};
