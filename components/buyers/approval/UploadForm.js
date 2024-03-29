import React, { useState, useRef } from "react";
import { Row, Col, Button, Form, Spinner, Dropdown } from "react-bootstrap";
import "../../../pages/buyer/pre-approval/pre-approval.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import InfoGeneralComp from "../../InfoGeneralComp";
import uploadUserDocument from "../../../utils/uploadUserDocument";

const Upload = ({ userId, setPage, newUser, setModalShow }) => {
  const SubmitButton = ({ handleSubmit }) => (
    <Button
      className='rounded-0'
      type='button'
      onClick={handleSubmit}
      disabled={sending}
    >
      {sending ? (
        <>
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          <span className='sr-only'>Loading...</span>
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );

  console.log(userId);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [sending, setSending] = useState(false);
  const fileInput = useRef(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          loanType: "",
          lender: "",
          amount: "",
          file: "",
          verifType: "",
        }}
        validationSchema={Yup.object({
          loanType: Yup.string().when("verifType", {
            is: (val) => val !== "proofOfFunds",
            then: Yup.string().required("Please provide the type of loan"),
          }),
          lender: Yup.string().when("verifType", {
            is: (val) => val !== "proofOfFunds",
            then: Yup.string().required("Please add lender name"),
          }),
          amount: Yup.string().required("Please enter an amount"),
          file: Yup.mixed(),
          verifType: Yup.string().required("Choose type of verification"),
        })}
        onSubmit={submitVerification}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          setFieldValue,
        }) => (
          // <InfoGeneralComp
          //   shadow
          //   submitButton={}
          //   onClick={newUser ? () => setPage("welcome") : close()}
          //   header="Verify Your Funds: "
          //   subHeader="Upload Pre-Qualification, Pre-Approval, or Proof of Funds"
          //   colHeader="Why do I need to provide verification of financing?"
          //   colSubHeader="In an effort to limit wasting either parties time it is
          //                               important for you to view qualified to view the home. Finding
          //                               Spaces will independently rreview and confirm your information
          //                               within 3 hours. You can still schedule an appointment while your
          //                               ssubmittion pends approval."
          // >
          <Form className='m-4' noValidate onSubmit={handleSubmit}>
            <div className='mb-1'>
              {/* <Row className="pl-4 py-1">
                <h5 className="pr-3">
                  <b>Verify Your Funds: </b>{" "}
                </h5>
                <h5>Upload Pre-Qualification, Pre-Approval, or Proof of Funds</h5>
              </Row> */}
              <Row>
                <Col xs='12'>
                  <div className='p-4'>
                    <Row className='pb-0'>
                      <h6>
                        <b>
                          Why do I need to provide verification of financing?
                        </b>
                      </h6>
                    </Row>
                    <Row>
                      <small>
                        In an effort to limit wasting either parties time it is
                        important for you to view qualified to view the home.
                        Finding Spaces will independently rreview and confirm
                        your information within 3 hours. You can still schedule
                        an appointment while your ssubmittion pends approval.
                      </small>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Form.Group controlId='exampleForm.SelectCustomSizeSm'>
                <Form.Label>Verification Type</Form.Label>
                <Form.Control
                  size='sm'
                  name='verifType'
                  value={values.verifType}
                  isInvalid={touched.loanType && !!errors.loanType}
                  disabled={sending}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  as='select'
                  size='md'
                  custom
                >
                  <option value='' label='Select a Type' />
                  <option value='preQualification' label='Pre-Qualification' />
                  <option value='preApproval' label='Pre-Approval' />
                  <option value='proofOfFunds' label='Proof of Funds' />
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  {errors.verifType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {values.verifType !== "proofOfFunds" ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Loan Type</Form.Label>
                  <Form.Control
                    size='sm'
                    name='loanType'
                    type='text'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.loanType && !!errors.loanType}
                    disabled={sending}
                    placeholder='Ex. 10 year fixed 30 year adjustable'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.loanType}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Lender / Bank</Form.Label>
                  <Form.Control
                    size='sm'
                    value={values.lender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lender && !!errors.lender}
                    disabled={sending}
                    placeholder='Ex. Great Morgage Company LLC'
                    type='text'
                    name='lender'
                  />

                  <Form.Control.Feedback type='invalid'>
                    {errors.lender}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            ) : null}
            <Form.Group controlId='formGridAddress1'>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                size='sm'
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.amount && !!errors.amount} // !! is two (not) operators and converts object to boolean then negates it
                disabled={sending}
                type='text'
                name='amount'
                placeholder='Ex. 159000'
              />
            </Form.Group>

            <Form.Group>
              <div className='d-flex upload-box justify-content-center'>
                <Row xs='12' className='align-items-center'>
                  <Col xs='12'>
                    <Form.Control
                      ref={fileInput}
                      type='file'
                      name='file'
                      onBlur={handleBlur}
                      aria-label='Verification document'
                      onChange={(e) => setFieldValue("file", e.target.files[0])}
                      disabled={uploading}
                      isInvalid={touched.file && !!errors.file}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.file}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <div className='d-flex justify-content-end'>
              {uploadFailure && (
                <Form.Control.Feedback type='invalid'>
                  We're experiencing network errors&mdash;please try again
                  later.
                </Form.Control.Feedback>
              )}
              <Button
                onClick={() => setModalShow(false)}
                className='mx-2 rounded-0 bg-secondary'
              >
                Close
              </Button>
              <SubmitButton handleSubmit={handleSubmit} />
            </div>
          </Form>
          // </InfoGeneralComp>
        )}
      </Formik>
    </>
  );

  async function submitVerification(values, { resetForm, setFieldError }) {
    // Remove success/failure messages if there
    // setSuccess(false);
    // setFailure(false);
    console.log("test");
    console.log(values);

    if (values.file === "") {
      setFieldError("file", "Please upload your pre-approval document");
      return;
    }
    setSending(true);

    try {
      // Upload file to Cloud Storage
      const documentURL = await uploadUserDocument(
        values.file,
        `users/${userId}`
      );
      console.log("file", values.file);
      // Send file info through API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verification-doc`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentURL, userId, ...values }),
        }
      );

      if (response.ok) {
        setModalShow(false);
        // Move on
        console.log("upload successful");
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      setSending(false);
      setPage("welcome");
      resetForm();
    } catch (err) {
      // Add upload failure message
      console.error("Either a coding error or network issues", err);
      const error = new Error(response.statusText);
      setSending(false);
      setUploadFailure(true);
      setUploading(false);
    }
  }
};

export default Upload;
