import React, { useState } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import Nav from "../../../components/Nav";
import Resume from "../../../components/ResumeForm";
import JobDescription from "../../../JobDescription";

const Apply = () => {
  const [showResume, setShowResume] = useState(false);
  return (
    <>
      <Nav showLogo solidBackground />
      <Container bsPrefix="container-md" className="px-5">
        <Row xs={12} className="mt-5">
          <h2>Internship / Co-op - Full Stack Developer</h2>
          <div className="ml-auto p-2">
            <Button
              variant="secondary"
              style={{ borderRadius: 2 }}
              className="text-white"
              onClick={() => setShowResume((prev) => !prev)}
            >
              {!showResume ? "APPLY NOW" : "JOB DESCRIPTION"}
            </Button>
          </div>
        </Row>
        <Row>
          <div className="d-flex flex-row  font-weight-bold">
            <div className="pr-2 text-muted">REMOTE OR IN-PERSON</div>
            <div className="pr-2 text-muted"> / </div>
            <div className="pr-2 text-muted">PHOENIX, AZ</div>
            <div className="pr-2 text-muted"> / </div>
            <div className="pr-2 text-muted">UNPAID</div>
          </div>
        </Row>
        {!showResume ? <JobDescription /> : <Resume />}
      </Container>
    </>
  );
};

export default Apply;
