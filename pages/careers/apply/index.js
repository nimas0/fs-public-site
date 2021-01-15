import React, { useState, useRef } from "react";
import {
  Col,
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Dropdown,
} from "react-bootstrap";
// import InfoGeneralComp from "../../InfoGeneralComp";
// import uploadUserDocument from "../../../utils/uploadUserDocument";
import { Formik } from "formik";

import * as yup from "yup";

import Nav from "../../../components/Nav";
import uploadUserDocument from "../../../utils/uploadUserDocument";

// const schema = yup.object({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   username: yup.string().required(),
//   city: yup.string().required(),
//   state: yup.string().required(),
//   zip: yup.string().required(),
//   file: yup.string().required(),
//   // terms: yup.bool().required(),
// });

const Resume = () => {
  const fileInput = useRef(0);
  const [uploading, setUploading] = useState(false);
  // const [uploadFailure, setUploadFailure] = useState(false);
  // const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (success === true) {
    return (
      <>
        <Nav showLogo solidBackground />
        <Container bsPrefix="container-md" className="my-auto px-5">
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
      <Nav showLogo solidBackground />

      <Container bsPrefix="container-md" className="my-auto px-5">
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              submitResume(values);
            }, 500);
          }}
          initialValues={{
            file: null,
            fullName: "",
            email: "",
            phone: "",
            currentCompany: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            setFieldValue,
            submitting,
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
                {/* <Form.File
                  className="position-relative"
                  name="file"
                  label="Attach Resume / CV"
                  onChange={handleChange}
                  disabled={uploading}
                  isInvalid={touched.file && !!errors.file}
                  feedback={errors.file}
                  id="custom-file"
                  feedbackTooltip
                /> */}
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
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback tooltip>
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
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback tooltip>
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
                    isValid={touched.phone && !errors.phone}
                  />
                  <Form.Control.Feedback tooltip>
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
                  Verification Type
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

              {/* <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Yes, Finding Spaces can contact me about future job opportunities for up to 3 years"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  id="validationFormik106"
                  feedbackTooltip
                />
              </Form.Group> */}
              <Form.Row className="my-5 text-right">
                <Button
                  disabled={submitting}
                  className="mb-5"
                  type="submit text-right"
                >
                  SUBMIT APPLICATION
                </Button>
              </Form.Row>
              <div className="my-5" />
              <div className="my-5" />
              <div className="my-5" />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );

  async function submitResume(values) {
    try {
      // Upload file to Cloud Storage
      const documentURL = await uploadUserDocument(values.file, `resumes`);
      // console.log("file", values.file);
      // Send file info through API
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentURL, ...values }),
      });

      if (response.ok) {
        // Move on
        console.log("upload successful");
      } else {
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      // setSending(false);
      setSuccess(true);
      // resetForm();
      // redirectToDashboard();
    } catch (err) {
      // Add upload failure message
      console.error("Either a coding error or network issues", err);
      // let error = new Error(response.statusText);
      // setSending(false);
      // setUploadFailure(true);
      // setUploading(false);
    }
  }
};

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

export default Resume;
