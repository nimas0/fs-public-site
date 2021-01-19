import React, { useState, useRef } from "react";
import { Col, Button, Form, Container, Row, Spinner } from "react-bootstrap";
// import InfoGeneralComp from "../../InfoGeneralComp";
// import uploadUserDocument from "../../../utils/uploadUserDocument";
import { Formik } from "formik";
import moment from "moment";

import * as yup from "yup";

import uploadUserDocument from "../utils/uploadUserDocument";
import countryList from "../utils/data/countries";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullName: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email()
    .required("Your email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
  file: yup.mixed().required("Please upload your resume"),
  terms: yup.mixed().required(),
});

const Resume = () => {
  const fileInput = useRef(0);
  const [uploading, setUploading] = useState(false);
  // const [uploadFailure, setUploadFailure] = useState(false);
  // const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitResume(values) {
    setUploading(true);
    try {
      // Upload file to Cloud Storage
      const documentURL = await uploadUserDocument(values.file, `resumes`);
      // console.log("file", values.file);
      // Send file info through API
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentURL,
          ...values,
          createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
        }),
      });

      if (response.ok) {
        // Move on
        setUploading(false);
        console.log("upload successful");
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      // setSending(false);
      setSuccess(true);

      // resetForm();
      // redirectToDashboard();
    } catch (err) {
      setUploading(false);
      // Add upload failure message
      console.error("Either a coding error or network issues", err);
      // let error = new Error(response.statusText);
      // setSending(false);
      // setUploadFailure(true);
      // setUploading(false);
    }
  }

  if (success === true) {
    return (
      <>
        <Container bsPrefix="container-md" className="my-auto p-5">
          <h6 className="text-center">
            You have successfully submitted your resume.
          </h6>
          <p className="text-center">We will reach out to you shortly.</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
            console.log(values);
            submitResume(values);
            setSubmitting(false);
          }, 500);
        }}
        initialValues={{
          file: null,
          fullName: "",
          email: "",
          phone: "",
          currentCompany: "",
          linkedIn: "",
          repository: "",
          portfolio: "",
          additionalInformation: "",
          survey: "",
          terms: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          setFieldValue,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="my-5">
              <h5>
                <b>SUBMIT YOUR APPLICATION</b>
              </h5>
            </Row>
            <Form.Group as={Row} sm="12" className="my-5">
              <Form.Control
                ref={fileInput}
                type="file"
                name="file"
                label="Attach Resume / CV"
                onBlur={handleBlur}
                aria-label="Resume document"
                onChange={(e) => setFieldValue("file", e.target.files[0])}
                disabled={uploading}
                isInvalid={touched.file && !!errors.file}
              />
              <Form.Control.Feedback type="invalid">
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Row}
              className="my-4"
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Full Name
              </Form.Label>

              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  isInvalid={touched.fullName && !!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Phone
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={touched.phone && !!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Current Company
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="currentCompany"
                  value={values.currentCompany}
                  onChange={handleChange}
                  isValid={touched.currentCompany && !errors.currentCompany}
                />
                <Form.Control.Feedback tooltip>
                  {errors.currentCompany}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Row className="my-5 pt-3 pl-2">
              <h5>
                <b>LINKS</b>
              </h5>
            </Row>

            <Form.Group
              as={Row}
              className="my-4"
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                LinkedIn URL
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="linkedIn"
                  value={values.linkedIn}
                  onChange={handleChange}
                  isValid={touched.linkedIn && !errors.linkedIn}
                />
                <Form.Control.Feedback tooltip>
                  {errors.linkedIn}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Github / GitLab URL
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="repository"
                  value={values.repository}
                  onChange={handleChange}
                  isValid={touched.repository && !errors.repository}
                />
                <Form.Control.Feedback tooltip>
                  {errors.repository}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Portfolio Website
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="portfolio"
                  value={values.portfolio}
                  onChange={handleChange}
                  isValid={touched.portfolio && !errors.portfolio}
                />
                <Form.Control.Feedback tooltip>
                  {errors.portfolio}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              className="my-4"
              as={Row}
              controlId="validationFormik101"
            >
              <Form.Label column sm={3}>
                Other Website
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="otherWebsite"
                  value={values.otherWebsite}
                  onChange={handleChange}
                  isValid={touched.otherWebsite && !errors.otherWebsite}
                />
                <Form.Control.Feedback tooltip>
                  {errors.otherWebsite}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Row className="my-5 pt-3 pl-2 ">
              <h5>
                <b>ADDITIONAL INFORMATION</b>
              </h5>
            </Row>

            <Form.Group
              as={Row}
              className="my-4"
              controlId="validationFormik101"
            >
              <Col sm={12}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    rows={7}
                    as="textarea"
                    name="additionalInformation"
                    value={values.additionalInformation}
                    onChange={handleChange}
                    isValid={
                      touched.additionalInformation &&
                      !errors.additionalInformation
                    }
                  />
                </Form.Group>

                <Form.Control.Feedback tooltip>
                  {errors.additionalInformation}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className="border-bottom text-white mb-5" />

            <Row className="my-5 pt-3 pl-2 ">
              <h5>
                <b>DEMOGRAPHIC SURVEY</b>
              </h5>
            </Row>

            <Form.Group as={Row} controlId="exampleForm.SelectCustomSizeSm">
              <Form.Label column sm={3}>
                What is your location?
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="survey"
                  value={values.survey}
                  isInvalid={touched.survey && !!errors.survey}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  as="select"
                  size="md"
                  custom
                >
                  <option value="" label="Choose Location" />
                  {countryList.map((option) => (
                    <option value={option} label={option} />
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.survey}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="border-bottom text-white mb-5" />

            <Form.Group>
              <Form.Check
                name="terms"
                label="Yes, Finding Spaces can contact me about future job opportunities for up to 2 years"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                id="validationFormik106"
                feedbackTooltip
              />
            </Form.Group>
            <Form.Row className="my-5 text-right">
              {uploading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <Button
                  disabled={uploading}
                  className="mb-5"
                  type="submit text-right"
                >
                  SUBMIT APPLICATION
                </Button>
              )}
            </Form.Row>
            <div className="my-5" />
            <div className="my-5" />
            <div className="my-5" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Resume;
