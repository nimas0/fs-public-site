"use strict";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Form, Col, Button, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import fetch from "isomorphic-unfetch";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";

export default ({ shown, hide, AuthUser }) => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const router = useRouter();

  return (
    <Modal
      show={shown}
      onHide={closeModal}
      backdrop={sending ? "static" : true}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Ask a question</Modal.Title>
        {/* Using custom button so I can disable it */}
        <button
          type="button"
          className="close"
          onClick={closeModal}
          aria-label="Close"
          disabled={sending}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>

      <Formik
        initialValues={
          AuthUser
            ? { question: "" }
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                question: ""
              }
        }
        validationSchema={Yup.object(
          AuthUser
            ? { question: Yup.string().required() }
            : {
                firstName: Yup.string().required(
                  "First name is required if you aren't logged in."
                ),
                lastName: Yup.string().required(
                  "Last name is required if you aren't logged in."
                ),
                email: Yup.string()
                  .email("Not a valid email format.")
                  .required(
                    "Email address is required if you aren't logged in."
                  ),
                phone: Yup.string(),
                question: Yup.string().required()
              }
        )}
        onSubmit={submitQuestion}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              {!AuthUser && (
                <>
                  <Form.Row>
                    <Form.Group controlId="first-name" as={Col} sm={6}>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstName && !!errors.firstName}
                        disabled={sending}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="last-name" as={Col} sm={6}>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && !!errors.lastName}
                        disabled={sending}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group controlId="email" as={Col} sm={6}>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                        disabled={sending}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="phone" as={Col} sm={6}>
                      <Form.Label>Phone number</Form.Label>{" "}
                      <small
                        id="phone-optional"
                        className="text-muted font-italic"
                      >
                        (optional)
                      </small>
                      <Form.Control
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phone && !!errors.phone}
                        aria-describedby="phone-optional"
                        disabled={sending}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                </>
              )}

              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  name="question"
                  as="textarea"
                  rows="3"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.question && !!errors.question}
                  disabled={sending}
                />
              </Form.Group>

              <div
                id="disclaimer"
                className="text-dark"
                style={{ fontSize: "0.9em" }}
              >
                <p>
                  This is a no-commitment question. We do not share your email
                  address or phone number with the homeowner.
                </p>
                <p className="mb-2">
                  To communicate directly with the homeowner, please create a
                  free account and subscribe to this home's updates.
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal} disabled={sending}>
                Close
              </Button>

              <Button variant="primary" type="submit" disabled={sending}>
                {sending ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="position-relative mr-2"
                      style={{ bottom: 3 }}
                    />
                    Sending...
                  </>
                ) : (
                  "Send question"
                )}
              </Button>

              {success && (
                <div className="text-success w-100 text-right">
                  <FontAwesomeIcon icon={faCheck} /> Question sent!
                </div>
              )}

              {failure && (
                <div className="text-danger w-100 text-right">
                  <FontAwesomeIcon icon={faTimes} /> We're experiencing network
                  issues&mdash;please try again later.
                </div>
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );

  function closeModal() {
    hide();
    setTimeout(() => {
      setSuccess(false);
      setFailure(false);
    }, 1000);
  }

  async function submitQuestion(values, { resetForm, setFieldError }) {
    // Remove success/failure messages if there
    setSuccess(false);
    setFailure(false);

    // Validate phone number
    if (values.phone && !isValidPhoneNumber(values.phone)) {
      setFieldError("phone", "Not a valid phone number.");
    } else {
      // Disable form
      setSending(true);

      // Format data object (remove empty strings)
      let data = {};
      for (const name in values) {
        if (values[name] !== "") {
          data[name] = values[name];
        }
      }

      // Add userId if auth
      if (AuthUser) {
        data.userId = AuthUser.id;
      }

      try {
        // Send question through API
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId: router.query.listingId,
            data
          })
        });

        // Handle response from API
        if (response.ok) {
          setSuccess(true);
          resetForm();
        } else {
          // https://github.com/developit/unfetch#caveats
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      } catch (err) {
        console.error("Either a coding error or network issues", err);
        setFailure(true);
      }

      setSending(false);
    }
  }
};
