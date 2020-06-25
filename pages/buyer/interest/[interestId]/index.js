import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../../../components/layout/MainLayout';
import { Row, Col, Button } from 'react-bootstrap';
import withAuthUser from '../../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../../utils/pageWrappers/withLoginModal';
import { objectToStringHomeAddress } from '../../../../utils/helpers';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import firebaseInit from '../../../../utils/firebaseInit';
import { useDocument, useCollectionData } from 'react-firebase-hooks/firestore';

import './engage.module.css';
import Messenger from '../../../../components/buyers/chat/Messenger';
import QuickFacts from '../../../../components/buyers/QuickFacts';
import Documents from '../../../../components/buyers/Documents';
import DocumentUpload from '../../../../components/buyers/interest/DocumentUpload';


// Initialize Firebase app
firebaseInit();


const Interest = ({ AuthUserInfo, showLoginModalAuthUserInfo, showLoginModal }) => {
    const { AuthUser = null } = AuthUserInfo;
    const router = useRouter();
    const interestId = router.query.interestId;

    //state controlling upload view or chat view
    const [uploadView, setUploadView] = useState(false);

    // react hook for firebase firestore listener
    const [value, loading, error] = useDocument(
        firebase.firestore().doc(`interest/${interestId}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    // get all docs from sub collection of interest document
    const [docs, docLoading, err] = useCollectionData(
        firebase.firestore().collection(`interest/${interestId}/documents`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    if (!docLoading) {
        console.log(JSON.stringify(docs));
    }



    const data = value && value.data();

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Document: Loading...</span>}
            {value &&
                <MainLayout AuthUser={AuthUser} showLoginModal={showLoginModal}>
                    <div className='mx-3 border'>
                        <div className='bg-white defaultCard border-left-0'>
                            <div className='header d-flex align-items-center '>
                                <Col xs={1} className='p-3 border-right justify-content-center d-flex headerBack'>
                                    <Link href="/buyer/dashboard">
                                        <a>Back </a>
                                    </Link>
                                </Col>
                                <Col xs={9}>
                                    <h5 className='ml-4 text-muted d-flex text-center pt-2'>{objectToStringHomeAddress(data.listingSnapshot)} &nbsp;&nbsp;//&nbsp;&nbsp;<b>Appointment Scheduled: 9:00 8/19/2020</b></h5>
                                </Col>
                                <Col xs={1} className='p-3 border-left justify-content-center d-flex headerBack'>
                                    <Link href={`/listing/${data.listingId}`}>
                                        <a target="_blank">Visit Listing Site </a>
                                    </Link>
                                </Col>
                                <Col xs={1} className='p-3 border-left justify-content-center d-flex headerBack'>
                                    <Link href="/buyer/dashboard">
                                        <a>Unsubscribe </a>
                                    </Link>

                                </Col>
                            </div>
                            <Row>
                                <Col className='d-flex align-items-stretch border-right pr-0'>
                                    {uploadView ?
                                        <DocumentUpload interestId={interestId} setUploadView={setUploadView} /> :
                                        <Messenger AuthUserInfo={AuthUserInfo} />

                                    }

                                </Col>
                                <Col xs={4} className='pl-0'>
                                    <div className='mb-4'>
                                        <div className='fill mb-2'>
                                            <img className='interestImage' src={data.listingMainPhotoUrl} />
                                        </div>
                                    </div>
                                    <QuickFacts quickFacts={data.listingSnapshot.quickFacts} />
                                    <div className='d-flex justify-content-center mt-4 px-3'>
                                        <Col xs={6}>
                                            <Button className='rounded-sm' block>Request Showing</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button className='rounded-sm' block>Submit Offer</Button>
                                        </Col>
                                    </div>
                                    <Documents setUploadView={setUploadView} docs={docs} loading={docLoading} error={err} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </MainLayout>
            }
        </>


    )
};



export default withAuthUser(withAuthUserInfo(withLoginModal(Interest)));
