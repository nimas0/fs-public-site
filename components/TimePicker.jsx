"use strict";

import React from "react";
import clsx from "clsx";
import ExpandButton from "./ExpandButton";
import TimeButton from "./TimeButton";

export default ({
  daysDisplayed,
  small,
  alignment = "center",
  availability,
  hourIncrement,
  firstAvailableHour,
  firstHour,
  setFirstHour,
  activeDate,
  activeTime,
  setActiveTime,
  timeZone,
  hidden,
  disableAllTimes,
  className
}) => {
  const daysArray = [...Array(daysDisplayed).keys()];

  return (
    <div
      className={clsx(
        "d-flex align-items-center",
        alignment === "left"
          ? "justify-content-start"
          : alignment === "right"
          ? "justify-content-end"
          : "justify-content-center",
        hidden && "invisible",
        className
      )}
    >
      <ExpandButton
        direction="left"
        overlap="right"
        small={small}
        onClick={() => {
          setFirstHour(
            Math.max(
              firstAvailableHour,
              firstHour - daysDisplayed * hourIncrement
            )
          );
        }}
        hidden={firstHour === firstAvailableHour}
      />

      <div className="mr-n1">
        {daysArray.map(index => (
          <TimeButton
            key={index}
            hour={firstHour + index * hourIncrement}
            disabled={disableAllTimes}
            {...{
              small,
              availability,
              hourIncrement,
              activeDate,
              activeTime,
              setActiveTime,
              timeZone
            }}
          />
        ))}
      </div>

      <ExpandButton
        direction="right"
        overlap="left"
        small={small}
        onClick={() => {
          setFirstHour(
            Math.min(
              Math.max(
                (availability[availability.length - 1] || 19 - hourIncrement) -
                  (daysDisplayed - 1) * hourIncrement,
                firstAvailableHour
              ),
              firstHour + daysDisplayed * hourIncrement
            )
          );
        }}
        hidden={
          firstHour ===
          Math.max(
            (availability[availability.length - 1] || 19 - hourIncrement) -
              (daysDisplayed - 1) * hourIncrement,
            firstAvailableHour
          )
        }
      />
    </div>
  );
};
