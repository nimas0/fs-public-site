"use strict";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ icon, text, href }) => {
  return (
    <div className="text-center position-relative border border-secondary h-100 d-flex">
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="text-secondary stretched-link m-auto"
      >
        <span className="d4-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <br />
        {text}
      </a>
    </div>
  );
};
