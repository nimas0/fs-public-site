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

import { Formik } from 'formik';
import * as Yup from 'yup';

const Home = ({ AuthUserInfo, showLoginModal }) => {
   const { AuthUser = null } = AuthUserInfo;
   const router = useRouter();
   const buttonRef = React.createRef();
   let submitting;

   // form submit function
   const submitSearch = async (elemRefs, setFieldValue, submitForm) => {
      try {
         elemRefs.forEach((element, i) => setFieldValue(`input${i + 1}`, element.current.value));

         submitForm();
      } catch (error) {
         console.log(error);
      }
   };

   //validation
   const listingSchema = Yup.object().shape({
      input1: Yup.number().required('Must be a number'),
      input2: Yup.number().required('Must be a number'),
      input3: Yup.number().required('Must be a number'),
      input4: Yup.number().required('Must be a number'),
      input5: Yup.number().required('Must be a number'),
   });

   const elemRefs = [];
   let completedCount = 0;

   // auto tab after input entry
   const autoTab = (e) => {
      const BACKSPACE_KEY = 8;
      const DELETE_KEY = 46;

      let tabindex = $(e.target).attr('data-index') || 0;
      tabindex = Number(tabindex);

      //elemRefs[tabindex].current.value.replace(/[^0-9\\.]/g, '');
      let elem = null;
      if (e.keyCode === BACKSPACE_KEY) {
         elem = tabindex > 0 && elemRefs[tabindex - 1];
         completedCount = completedCount > 0 && completedCount - 1;
      } else if (e.keyCode !== DELETE_KEY) {
         elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];

         completedCount = completedCount + 1;
      }
      if (elem) {
         elem.current.focus();
      }

      let isValid = [];
      for (let i = 0; i < 5; i++) {
         if (elemRefs[i] && elemRefs[i].current.value) {
            isValid.push(true);
         }
      }
      if (isValid.length === 5) {
         buttonRef.current.focus();
      }
   };

   // const delayCount = (index) => {
   //    const num = Math.pow(10 + index, 2) * 4;
   //    console.log(num);
   //    return num;
   // };

   const Input = (props) => {
      const ref = React.createRef();
      elemRefs.push(ref);
      return (
         <>
            {/* <FadeIn delay={delayCount(props.index)}> */}
            <FormControl
               key={props.index}
               // isInvalid={!!props.errors[`input${props.index}`]}
               name={`input${props.index}`}
               className={`rounded  defaultCard m-3 ${
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

         <HomeLayout AuthUser={AuthUser} showLoginModal={showLoginModal} />
         <Formik
            initialValues={{ input1: '', input2: '', input3: '', input4: '', input5: null }}
            //validationSchema={listingSchema}
            onSubmit={(values) => router.push('/listing/KDfFS1FtGblMYSrzLDCZ')}>
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
                        <Form.Control.Feedback type='invalid'>
                           {errors.input1}
                        </Form.Control.Feedback>
                        <Row className='justify-content-center align-items-center'>
                           <Button
                              ref={buttonRef}
                              onClick={() => submitSearch(elemRefs, setFieldValue, rest.submitForm)}
                              className='m-4'>
                              Enter Home
                           </Button>
                        </Row>
                     </Container>
                  </div>
               </Form>
            )}
         </Formik>
         <div className='d-flex justify-content-center mt-auto pb-3'>
            <small className='text-muted'> FindingSpaces, LLC - Copyright © 2020</small>
         </div>
         <style jsx global>{`
            body {
               background: #f5f5f5;
            }
            input {
               border-top-style: hidden;
               border-right-style: hidden;
               border-left-style: hidden;
               border-bottom-style: groove;
            }
            .form-control {
               font-size: 5rem;
               text-align: center;
            }
            .form-control:focus {
               color: transparent;
               text-shadow: 0 1px 1px #589938;
               outline: none;
               -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
               box-shadow: 5 5px 5px rgba(0, 0, 0, 0.2);
            }
            beforeSubmitStyle {
               backgroundcolor: #fff;
               -webkit-transition: all 0.3s ease-in-out 0s;
               transition: all 0.3s ease-in-out 0s;
            }
            afterSubmitStyle {
               backgroundcolor: #f5f5f5;
               -webkit-transition: all 0.3s ease-in-out 0s;
               transition: all 0.3s ease-in-out 0s;
            }
         `}</style>
         {/* <Link href='/listing/[listingId]' as='/listing/KDfFS1FtGblMYSrzLDCZ'>
         <a>Test listing</a>
      </Link> */}
      </>
   );
};

export default withAuthUser(withAuthUserInfo(withLoginModal(Home)));
