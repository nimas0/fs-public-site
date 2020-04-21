"use strict";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ label, icon, href, title }) => (
  <a className="text-info" href={href} title={title}>
    <div className="h1-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    {label && <div style={{ fontSize: "80%" }}>{label}</div>}
  </a>
);
