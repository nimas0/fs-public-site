"use strict";

import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faCheck } from "@fortawesome/free-solid-svg-icons";

export default ({ question, answer }) => (
  <li className="mb-3">
    <Row noGutters className="question font-weight-bold text-dark mb-n2">
      <Col xs="auto" className="mr-2">
        <FontAwesomeIcon icon={faLightbulb} fixedWidth />
      </Col>
      <Col as="p">{question}</Col>
    </Row>
    <Row noGutters className="answer">
      <Col xs="auto" className="mr-2">
        <FontAwesomeIcon icon={faCheck} fixedWidth />
      </Col>
      <Col as="p">{answer}</Col>
    </Row>
  </li>
);
