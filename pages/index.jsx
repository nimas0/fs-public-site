import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HomeLayout from '../components/layout/HomeLayout';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../utils/pageWrappers/withLoginModal';
import { Card, Container, Row, Col, FormControl, Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import FadeIn from 'react-fade-in';
import { useRouter } from 'next/router';
import './homepage.module.css';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Nav from '../components/Nav';

const Home = ({ AuthUserInfo, showLoginModal }) => {
   const { AuthUser = null } = AuthUserInfo;
   const router = useRouter();
   // const buttonRef = React.createRef();
   let submitting;

   // form submit function
   const submitSearch = async (elemRefs, setFieldValue, submitForm) => {
      try {
         elemRefs.forEach((element, i) => setFieldValue(`input${i + 1}`, element.current.value));
         submitting = true;
         submitForm();
      } catch (error) {
         console.log(error);
      }
   };

   //validation
   // const listingSchema = Yup.object().shape({
   //    input1: Yup.string().required('Must be a number'),
   //    input2: Yup.string().required('Must be a number'),
   //    input3: Yup.number().required('Must be a number'),
   //    input4: Yup.number().required('Must be a number'),
   //    input5: Yup.number().required('Must be a number'),
   // });

   let elemRefs = [];
   let completedCount = 0;
   console.log('1', elemRefs);
   // auto tab after input entry
   const autoTab = (e) => {
      // console.log(e.target.name);
      const BACKSPACE_KEY = 8;
      const DELETE_KEY = 46;
      const SHIFT = 16;
      const TAB = 9;

      // console.log(e.target);

      const inputName = e.target.name;
      let inputNumber = inputName[inputName.length - 1] || 0;
      let tabindex = Number(inputNumber);
      // console.log(inputNumber);

      let elem = elemRefs[0];

      //  START [control non number || letter inputs]
      if (e.keyCode === BACKSPACE_KEY) {
         elem = tabindex > 0 && elemRefs[tabindex - 1];
         completedCount = completedCount > 0 && completedCount - 1;
      } else if (e.shiftKey && e.keyCode == TAB) {
         elem = tabindex > 0 && elemRefs[tabindex];
         completedCount = completedCount > 0 && completedCount;
      } else if (e.keyCode === TAB) {
         elem = tabindex > 0 && elemRefs[tabindex];
         completedCount = completedCount > 0 && completedCount;
      } else if (e.keyCode === SHIFT) {
         elem = tabindex > 0 && elemRefs[tabindex];
         completedCount = completedCount > 0 && completedCount;
      } else if (e.keyCode !== DELETE_KEY) {
         elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];

         completedCount = completedCount + 1;
      }

      // elemRefs[tabindex].current.value.replace(/[^0-9\\.]/g, '');
      if (elem) {
         elem.current.focus();
      }
      //  END [control non number || letter inputs]

      // PUSH focus to Submit if all inputs have been filled out
      // commented this out because it was causes post submittion errors
      // no quick solution obvious
      // let isValid = [];
      // for (let i = 0; i < 5; i++) {
      //    if (elemRefs[i] && elemRefs[i].current.value) {
      //       isValid.push(true);
      //    }
      // }
      // if (isValid.length === 5) {
      //    buttonRef.current.focus();
      // }
   };

   // const delayCount = (index) => {
   //    const num = Math.pow(10 + index, 2) * 4;
   //    console.log(num);
   //    return num;
   // };

   const Input = (props) => {
      const ref = React.createRef();
      elemRefs.push(ref);
      console.log('4', elemRefs);
      return (
         <>
            {/* <FadeIn delay={delayCount(props.index)}> */}
            <FormControl
               key={props.index}
               // cant use validation because it causes issues with autoTab() funcitons after submittion
               // isInvalid={props.errors && Boolean(props.errors[`input${props.index}`])}
               name={`input${props.index}`}
               className={`rounded form-control1  defaultCard m-3 ${
                  submitting ? 'afterSubmitStyle' : 'beforeSubmitStyle'
               }`}
               style={{
                  width: '10rem',
                  height: '14rem',
               }}
               data-index={props.index}
               ref={ref}
               maxLength={1}
               onKeyUp={(e) => {
                  props.autoTab(e);
               }}
               placeholder={props.placeholder}
            />

            {/* </FadeIn> */}
         </>
      );
   };

   const blocks = (errors) =>
      Array.from({ length: 5 }, (element, index) => {
         if (index === 2) {
            return (
               <>
                  <FadeIn delay={1000}>
                     <span key={index + 345} className='px-3 '>
                        <h2 className='text-muted'>-</h2>
                     </span>
                  </FadeIn>
                  <Input key={index} index={index} autoTab={autoTab} error={errors} />
               </>
            );
         } else {
            return <Input key={index} index={index} autoTab={autoTab} errors={errors} />;
         }
      });

   return (
      <>
         <Head>
            <title>Finding Spaces</title>
         </Head>

         <Nav homepage={true} AuthUser={AuthUser} showLoginModal={showLoginModal} />
         <Formik
            initialValues={{
               input1: '',
               input2: '',
               input3: '',
               input4: '',
               input5: '',
               submittionError: '',
            }}
            // validationSchema={listingSchema}
            onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
               console.log('2', elemRefs);
               fetchListing(values)
                  .then((result) => {
                     console.log('result', result);
                     if (result.statusCode === 404) {
                        console.log('result', result);
                        submitting = false;
                        setErrors({ submittionError: result.message });
                     } else {
                        router.push(`/listing/${result}`);
                     }
                  })
                  .catch((error) => console.log('error', error));

               resetForm();
               elemRefs = [];
            }}>
            {({
               handleSubmit,
               values,
               handleChange,
               handleBlur,
               isSubmitting,
               touched,
               errors,
               setFieldValue,
               ...rest
            }) => (
               <Form noValidate onSubmit={handleSubmit}>
                  <div style={{ height: '75vh' }} className='d-flex align-items-center'>
                     <Container className='align-items-center'>
                        <Row className='justify-content-center align-items-center m-3 pl-3'>
                           <img src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336' />
                        </Row>
                        <Row className='justify-content-center align-items-center'>
                           {blocks(errors)}
                        </Row>
                        <Row className='justify-content-center align-items-center'>
                           {/* <ErrorMessage name='submittionError' /> */}
                        </Row>

                        <Row className='justify-content-center align-items-center'>
                           <Button
                              disabled={submitting}
                              // ref={buttonRef}
                              onClick={() => submitSearch(elemRefs, setFieldValue, rest.submitForm)}
                              className='m-4'>
                              Enter Home
                           </Button>

                           <p className='text-warning'>{errors.submittionError}</p>
                        </Row>
                     </Container>
                  </div>
               </Form>
            )}
         </Formik>
         {console.log('rendered')}
         <div className='d-flex justify-content-center mt-auto pb-3'>
            <small className='text-muted'> FindingSpaces, LLC - Copyright © 2020</small>
         </div>
      </>
   );
};

async function fetchListing(values) {
   // Get or create user in Firestore
   console.log('sdlfjsldfj');
   try {
      const response = await fetch('/api/enter-home', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ values }),
      });

      if (response.ok) {
         // Return whether this user is new and user's verification status
         const { listingId } = await response.json();
         return listingId;
      } else if ([404, 503].includes(response.status)) {
         return { statusCode: response.status, ...(await response.json()) };
      } else {
         // https://github.com/developit/unfetch#caveats
         let error = new Error(response.statusText);
         error.response = response;
         throw error;
      }
   } catch (err) {
      console.log(err);
      return { statusCode: response.status || err.statusCode || 500 };
   }
}

export default withAuthUser(withAuthUserInfo(withLoginModal(Home)));
