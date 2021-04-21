import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const InfoGeneralComp = ({
  cancelRoute,
  submitButton,
  header,
  subHeader,
  children,
  colHeader,
  colSubHeader,
  onClick,
  shadow,
}) => (
  <Container fluid="sm" className={shadow ? "p-5" : ""}>
    <Card className={shadow ? "" : "shadow p-5"}>
      <Card.Header className="p-4">
        <Row className="pl-4 py-2">
          <h5 className="pr-3">
            <b>{header} </b>{" "}
          </h5>
          <h5>{subHeader}</h5>
        </Row>
      </Card.Header>
      <Card.Body className="p-0">
        <Row>
          <Col xs="8" className="border-right">
            <div className="p-4">{children}</div>
          </Col>
          <Col xs="4">
            <div className="p-4">
              <Row className="pb-3">
                <h6>
                  <b>{colHeader}</b>
                </h6>
              </Row>
              <Row>
                <p>
                  <small>{colSubHeader}</small>
                </p>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row className="pl-4 py-2">
          <Col xs="1" className="pl-1">
            {cancelRoute ? (
              <Link href={cancelRoute}>
                <Button
                  as="a"
                  className="rounded-lg"
                  variant={shadow ? "secondary" : "dark"}
                >
                  CANCEL
                </Button>
              </Link>
              ) : (
                <Button onClick={onClick} className="rounded-lg">
                  CANCEL
                </Button>
              )}
          </Col>
          <Col xs="2">{submitButton}</Col>
        </Row>
      </Card.Footer>
    </Card>
  </Container>
  );

export default InfoGeneralComp;
