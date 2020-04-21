"use strict";

import React from "react";

export default ({ label, stat, unitPre, last }) => {
  // Format stat
  let value;
  if (stat) {
    let number;
    if (typeof stat === "string") {
      number = Number(stat.replace(/[^\d.]/g, ""));
    } else {
      number = stat;
    }
    
    if (number) {
      value = (unitPre ? unitPre : "") + number.toLocaleString();
    } else {
      value = "--";
    }
  } else {
    value = "--";
  }

  return (
    <div
      className={
        "text-center mx-2 mb-2 mx-sm-0 mb-sm-0" +
        (last ? "" : " mr-sm-4 mr-md-5 mr-lg-4 mr-xl-5")
      }
    >
      <div
        className="h5 mb-0 font-weight-bold"
        aria-labelledby={
          label
            .replace(/./g, "")
            .replace(/ /g, "-")
            .toLowerCase() + "-label"
        }
      >
        {value}
      </div>
      <div
        id={
          label
            .replace(/./g, "")
            .replace(/ /g, "-")
            .toLowerCase() + "-label"
        }
        className="font-weight-light font-italic"
        style={{ fontSize: ".85em" }}
      >
        {label}
      </div>
    </div>
  );
};
