"use strict";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import Stat from "./Stat";
import { Row, Col } from "react-bootstrap";

export default ({ activity, price, beds, baths, sqFt, pricePerSqFt }) => {
  return (
    <Row noGutters className="justify-content-between align-items-center mb-2">
      {/* Activity */}
      <Col xs={12} sm="auto" className="h3 primary mb-sm-0">
        {/* <FontAwesomeIcon icon={faFire} style={{ color: "#fab92d" }} /> */}
        &nbsp;&nbsp;{activity}
      </Col>

      {/* Quick stats */}
      <Col xs={12} sm="auto" className="d-flex text-info d-md-inline-flex flex-wrap justify-content-around">
        <Stat label="Price" stat={price} unitPre="$" />
        <Stat label="Beds" stat={beds} />
        <Stat label="Baths" stat={baths} />
        <Stat label="Sq.Ft." stat={sqFt} />
        <Stat label="per Sq.Ft." stat={pricePerSqFt} unitPre="$" last />
      </Col>
    </Row>
  );
};
