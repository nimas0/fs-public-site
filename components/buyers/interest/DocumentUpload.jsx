import React, { useState, useRef } from 'react';
import { Row, Col, Button, Form, Spinner, Dropdown, Container, Jumbotron } from 'react-bootstrap';
import { useRouter } from 'next/router';
import InfoGeneralComp from '../../InfoGeneralComp';
import uploadUserDocument from '../../../utils/uploadUserDocument';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider } from 'antd';

const DocumentUpload = ({ interestId, setUploadView }) => {
   const [success, setSuccess] = useState(false);
   const [failure, setFailure] = useState(false);
   const [sending, setSending] = useState(false);
   const fileInput = useRef(0);
   const [fileSelected, setFileSelected] = useState(false);
   const [uploading, setUploading] = useState(false);
   const [uploadFailure, setUploadFailure] = useState(false);

   return (
      <>
         <div className='bg-light w-100 h-100 p-5'>
            <Container className='px-5 pt-5 pb-2'>
               <h3>Upload a Document for the Homeowner</h3>
               <p>You may upload a PDF file or an image.</p>
            </Container>

            <Container className='px-5 pt-5'>
               <Formik
                  initialValues={{
                     name: '',
                     file: '',
                  }}
                  validationSchema={Yup.object({
                     name: Yup.string().required('File must have a name to be uploaded.'),
                  })}
                  onSubmit={submitDocument}>
                  {({
                     handleSubmit,
                     values,
                     handleChange,
                     handleBlur,
                     touched,
                     errors,
                     setFieldValue,
                  }) => (
                     <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId='formGridAddress1'>
                           <Form.Label>Name your document</Form.Label>
                           <Form.Control
                              className='rounded-sm'
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.name && !!errors.name} // !! is two (not) operators and converts object to boolean then negates it
                              disabled={sending}
                              type='text'
                              name='name'
                              placeholder='Ex. Utilities, Contractor Report, Repair List'
                           />
                           <Form.Control.Feedback type='invalid'>
                              {errors.name}
                           </Form.Control.Feedback>
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
                                       aria-label='document'
                                       onChange={(e) => setFieldValue('file', e.target.files[0])}
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
                        {uploadFailure && (
                           <Form.Control.Feedback type='invalid'>
                              We're experiencing network errors&mdash;please try again later.
                           </Form.Control.Feedback>
                        )}
                        <div className='d-flex justify-content-start py-5'>
                           <Button
                              onClick={() => setUploadView((prevState) => !prevState)}
                              className='rounded-lg'
                              variant='light'>
                              CANCEL
                           </Button>
                           <Button className='rounded-sm' type='submit' disabled={sending}>
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
                                 'Submit'
                              )}
                           </Button>
                        </div>
                     </Form>
                  )}
               </Formik>
            </Container>
         </div>
      </>
   );

   async function submitDocument(values, { resetForm, setFieldError }) {
      // Remove success/failure messages if there
      setSuccess(false);
      setFailure(false);
      console.log('test');
      console.log(values);
      let type;
      let name = values.name;
      if (values.file === '') {
         setFieldError('file', 'Please select a file to upload');
         return;
      } else {
         setSending(true);
         type = values.file.type;
      }

      try {
         // Upload file to Cloud Storage
         const documentURL = await uploadUserDocument(values.file, `interest/${interestId}`);

         // Send file info through API
         const response = await fetch('/api/add-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ documentURL, interestId, name, type }),
         });

         if (response.ok) {
            // Move on
            console.log('upload successful');
         } else {
            // https://github.com/developit/unfetch#caveats
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
         }
         setSending(false);
         resetForm();
         setUploadView(false);
      } catch (err) {
         // Add upload failure message
         console.error('Either a coding error or network issues', err);
         let error = new Error(response.statusText);
         setSending(false);
         setUploadFailure(true);
         setUploading(false);
      }
   }
};

export default DocumentUpload;
