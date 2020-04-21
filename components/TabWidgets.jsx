"use strict";

import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [expanded, setExpanded] = useState(null);
  const toggle = eventKey => {
    if (expanded === eventKey) {
      setExpanded(null);
    } else {
      setExpanded(eventKey);
    }
  };

  return (
    <Accordion className="mb-5">
      {/* Monthly Payment Calculator */}
      <Card as="section">
        <Card.Header className="d-flex align-items-center position-relative">
          <h2 className="h3 flex-grow-1 mb-0">Monthly Payment Calculator</h2>
          <Accordion.Toggle
            eventKey={0}
            as={Button}
            variant="outline-secondary"
            className="expand-button stretched-link"
            style={{ borderRadius: "50%" }}
            onClick={() => {
              toggle(0);
            }}
            aria-label={(expanded === 0 ? "Hide" : "Show") + " monthly payment calculator"}
          >
            <FontAwesomeIcon
              icon={expanded === 0 ? faChevronUp : faChevronDown}
            />
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey={0}>
          <Card.Body>Insert React component here</Card.Body>
        </Accordion.Collapse>
      </Card>

      {/* Today's Mortgage Rates */}
      <Card as="section">
        <Card.Header className="d-flex align-items-center position-relative">
          <h2 className="h3 flex-grow-1 mb-0">Today's Mortgage Rates</h2>
          <Accordion.Toggle
            eventKey={1}
            as={Button}
            variant="outline-secondary"
            className="expand-button stretched-link"
            style={{ borderRadius: "50%" }}
            onClick={() => {
              toggle(1);
            }}
            aria-label={(expanded === 1 ? "Hide" : "Show") + " today's mortgage rates"}
          >
            <FontAwesomeIcon
              icon={expanded === 1 ? faChevronUp : faChevronDown}
            />
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey={1}>
          <Card.Body>Insert React component here</Card.Body>
        </Accordion.Collapse>
      </Card>

      {/* Nearby Schools */}
      <Card as="section">
        <Card.Header className="d-flex align-items-center position-relative">
          <h2 className="h3 flex-grow-1 mb-0">Nearby Schools</h2>
          <Accordion.Toggle
            eventKey={2}
            as={Button}
            variant="outline-secondary"
            className="expand-button stretched-link"
            style={{ borderRadius: "50%" }}
            onClick={() => {
              toggle(2);
            }}
            aria-label={(expanded === 2 ? "Hide" : "Show") + " nearby schools"}
          >
            <FontAwesomeIcon
              icon={expanded === 2 ? faChevronUp : faChevronDown}
            />
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey={2}>
          <Card.Body>Insert React component here</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
