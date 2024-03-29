/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Nav,
} from 'react-bootstrap';
import StepWizard from 'react-step-wizard';
import fetch from 'isomorphic-unfetch';

// firebase initialization imports
import firebase from 'firebase/app';
import 'firebase/database';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import firebaseInit from '../../../../utils/firebaseInit';

// Step Components for Wizard
import Disclaimer from '../../../../components/buyers/offerWizard/Disclaimer';
import Amount from '../../../../components/buyers/offerWizard/Amount';
import Deposit from '../../../../components/buyers/offerWizard/Deposit';
import Contingency from '../../../../components/buyers/offerWizard/Contingency';
import Possession from '../../../../components/buyers/offerWizard/Possession';
import NavOffer from '../../../../components/buyers/offerWizard/Nav';
import Summary from '../../../../components/buyers/offerWizard/Summary';

import MainNav from '../../../../components/Nav';

// Form Control

// Generic Header
import Header from '../../../../components/generic/Dialog/Header';

// Auth, Layout Controls
import withAuthUser from '../../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../../utils/pageWrappers/withLoginModal';
import FinalComment from '../../../../components/buyers/offerWizard/FinalComment';

import queryLatestProposal from '../../../../utils/queryLatestProposal';

// Initialize Firebase app
firebaseInit();

const contingencyOptions = {
  financingOptions: {
    1: 'Conventional',
    2: 'FHA',
    3: 'VA',
    4: 'USDA Assumption',
    5: 'Seller Carryback',
  },
  homeSale: {
    1: 'Yes, I have my home listed online.',
    2: 'Yes, I need to list my home.',
    3: 'No, I am able to purchase home right away.',
    4: 'Other, I will provide the reason in the additional comment section of this offer.',
  },
  other: {
    4: 'Other, I will provide the reason in the additional comment section at the end of this offer.',
  },
};

const stepTitles = {
  1: 'Propose an Offer',
  2: 'Offer Price',
  3: 'Deposit',
  4: 'Contingencies',
  5: 'Timelines',
  6: 'Final Comment',
  7: 'Summary',
};

const possessionOptions = {
  1: 'I accept possession terms as is.',
  2: 'I accept, but would like a sooner date if possible',
  3: 'I need to negotiate another possession time frame',
  4: 'Other, I will provide the reason in the additional comment section of this offer',
};

// custom transitions for react-wizard
const custom = {
  enterRight: 'animate__animated',
  enterLeft: 'animate__animated',
  exitRight: 'animate__animated',
  exitLeft: 'animate__animated',
};

// validation
const offerSchema = Yup.object().shape({
  deposit: Yup.number().required(
    'Please enter an amount or select opt out (not recommended)'
  ),
  amount: Yup.number()
    .required('Must enter a purchase offer amount to continue.')
    .positive('Must be a positive number.'),
  // contingency: Yup.string()
  //    .min(1)
  //    .required(),
  possession: Yup.string()
    .min(1)
    .required(),
  comment: Yup.string(),
});

const OfferPage = ({
  AuthUserInfo,
  showLoginModalAuthUserInfo,
  showLoginModal,
}) => {
  const { AuthUser = null } = AuthUserInfo;
  const [proposal, setProposal] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();
  const interestId = router.query.Offer;
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const onClick = () => {
    addToast('test error', { appearance: 'error' });
  };

  const cancelAction = () => {
    router.push(`/listing/${interestId.split('_')[0]}`);
  };

  // Grab listing address and display on header
  const [value, loading, error] = useDocument(
    firebase
      .firestore()
      .collection('interest')
      .doc(interestId)
  );

  useEffect(() => {
    const unsubscribe = async () => {
      setProposal(await queryLatestProposal(interestId));
      console.log('proposal', proposal);
    };

    unsubscribe();
    return () => unsubscribe();
  }, [interestId]);

  if (!error || !loading) {
    console.log(value);
    // console.log('query', ((router.asPath).toString().split('?'))[1])
    // const query = ((router.asPath).toString().split('?'))[1];

    // console.log(JSON.parse('{"' + decodeURI(((router.asPath).toString().split('?'))[1].replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
    // )
  }

  console.log('');
  // const query = ((router.asPath).toString().split('?'))[1];
  // const queryObject = JSON.parse('{"' + decodeURI(((router.asPath).toString().split('?'))[1].replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')

  // console.log('offerDetails', queryObject)
  return (
    <>
      {/* <MainNav showLogo AuthUser={AuthUser} showLoginModal={showLoginModal} /> */}

      <div data-test='offer-wizard'>
        <Formik
          data-test='form'
          autocomplete='off'
          initialValues={{
            amount: '',
            deposit: '',
            financing: '',
            homeSale: '',
            other: '',
            possession: '',
            closingDate: new Date(),
            comment: '',
          }}
          validationSchema={offerSchema}
          onSubmit={(values) => submitProposal(values)}
        >
          {({ handleSubmit, ...props }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <StepWizard
                initialStep={1}
                transitions={custom}
                nav={
                  <Header
                    toolbar={
                      <Nav.Link
                        className='bg-dark mr-auto text-left text-white'
                        onClick={async (e) => {
                          e.preventDefault();
                          cancelAction();
                        }}
                      >
                        <FontAwesomeIcon
                          size='1x'
                          className='mr-2'
                          color='lightGreen'
                          icon={faArrowLeft}
                        />
                        Return to Listing Page
                      </Nav.Link>
                    }
                    headerText='Estimated Time [2 min]'
                    subHeaderText={
                      (error && <strong>Error Displaying Address</strong>) ||
                      (loading && <span>Loading...</span>) ||
                      (value && value.data().address[0])
                    }
                  >
                    <NavOffer titles={stepTitles} />
                  </Header>
                }
              >
                <Disclaimer {...props} cancelAction={cancelAction} />
                <Amount
                  proposal={proposal}
                  {...props}
                  cancelAction={cancelAction}
                />
                <Deposit
                  proposal={proposal}
                  {...props}
                  cancelAction={cancelAction}
                />
                <Contingency
                  proposal={proposal}
                  {...props}
                  contingencyOptions={contingencyOptions}
                  cancelAction={cancelAction}
                />
                <Possession
                  proposal={proposal}
                  {...props}
                  possessionOptions={possessionOptions}
                  cancelAction={cancelAction}
                />
                <FinalComment
                  proposal={proposal}
                  {...props}
                  cancelAction={cancelAction}
                />
                <Summary
                  {...props}
                  handleSubmit={handleSubmit}
                  possessionOptions={possessionOptions}
                  contingencyOptions={contingencyOptions}
                  cancelAction={cancelAction}
                  sending={sending}
                />
              </StepWizard>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );

  async function submitProposal(values) {
    setSuccess(false);
    setFailure(false);
    setSending(true);
    try {
      const { displayName, photoURL, id } = AuthUserInfo.AuthUser;

      // Send offer info through API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submit-proposal`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interestId,
            offerDetails: values,
            displayName,
          }),
        }
      );

      // Set up message object, create key, and post to firebase real time //
      const { amount, deposit } = values;
      const responseJson = await response.json();
      const { docId } = responseJson;

      // new message entry
      const newMessage = {
        displayName,
        photoURL,
        author: id,
        message: '',
        timestamp: Date.now(),
        proposalId: docId,
        proposalDeposit: deposit,
        proposalVerified: true,
        proposalAmount: amount,
      };

      // Get a key for a new Post.
      const newPostKey = await firebase
        .database()
        .ref()
        .child('posts')
        .push().key;
      const update = {};
      update[`/interest_chat/${interestId}/${newPostKey}`] = newMessage;
      console.log(newPostKey);

      // Post to firebase real time
      await firebase
        .database()
        .ref()
        .update(update, (error) => {
          if (error) {
            throw error;
          }
        });

      if (response.ok) {
        // Move on

        router.replace(`/listing/${interestId.split('_')[0]}`);
        addToast(
          `Offer has been successfully submitted! You will be notified within 48 hours or less with the sellers response`,
          { appearance: 'success' }
        );
        setSending(false);
        setSuccess(true);
        console.log('upload successful');
      } else {
        // https://github.com/developit/unfetch#caveats
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (err) {
      // Add upload failure message
      setSuccess(false);
      console.log(err);
      console.error('Either a coding error or network issues', err.response);
      addToast(
        `Sorry something went wrong. Please try again. If this error persists please contact customer support. ${err.response.status} ${err}`,
        {
          appearance: 'error',
        }
      );

      setSending(false);
    }
  }
};

export default withAuthUser(withAuthUserInfo(withLoginModal(OfferPage)));
