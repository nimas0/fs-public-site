import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../../../components/layout/MainLayout';
import { Row, Col, Button, Container, Collapse, ListGroup } from 'react-bootstrap';
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

import ViewProposal from '../../../../components/buyers/interest/ViewProposal';
import Nav from '../../../../components/Nav';


// Initialize Firebase app
firebaseInit();


const Interest = ({ AuthUserInfo, showLoginModalAuthUserInfo, showLoginModal }) => {
    const { AuthUser = null } = AuthUserInfo;
    const router = useRouter();
    const interestId = router.query.interestId;
    const [activeProposal, setActiveProposal] = React.useState(1);
    const [proposalData, setProposalData] = React.useState(null);

    const messagesEndRef = useRef(null);
    if (proposalData) {
        console.log('serializedData', Object.entries(proposalData)
            .map(
                ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
            .join("&"))



        console.log('proposalData', proposalData)
    }

    useEffect(() => {
        if (activeProposal !== 1) {
            let proposalsRef = firebase
                .firestore()
                .collection('proposals')
                .doc(activeProposal);
            const data = proposalsRef
                .get()
                .then((doc) => setProposalData(doc.data()));

        }
    }, [activeProposal]);

    const [toggle, setToggle] = React.useState(false);

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

    // if (!docLoading) {
    //     console.log(JSON.stringify(docs));
    // }


    const handleToggleSidebar = (proposalId) => {
        if (proposalId.toString() === activeProposal) {
            setToggle((prevState) => !prevState)
        }
        setActiveProposal(proposalId.toString())
    }

    // console.log('active Proposal', activeProposal)
    const data = value && value.data();

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Document: Loading...</span>}
            {value &&
                <>
                    <Nav AuthUser={AuthUser} showLoginModal={showLoginModal} />
                    <Row className=' d-flex'>
                        <Col noGutters>
                            <div className=' border'>
                                <div className='bg-white defaultCard border-left-0'>
                                    <div className='header d-flex align-items-center '>
                                        <Col xs={toggle ? 3 : 1} className='p-3 border-right justify-content-center d-flex headerBack'>
                                            <Link href="/buyer/dashboard">
                                                <a >Back </a>
                                            </Link>
                                        </Col>
                                        <Col xs={toggle ? 5 : 9}>
                                            <h5 className='ml-4 text-muted d-flex text-center pt-2'>{!toggle && data.address[0]}</h5>
                                        </Col>
                                        <Col xs={toggle ? 2 : 1} className='p-3 border-left justify-content-center d-flex headerBack'>
                                            <Link href={`/listing/${data.listingId}`}>
                                                <a>Visit Listing Site </a>
                                            </Link>
                                        </Col>
                                        <Col xs={toggle ? 2 : 1} className='p-3 border-left justify-content-center d-flex headerBack'>
                                            <Link href="/buyer/dashboard">
                                                <a>Unsubscribe </a>
                                            </Link>

                                        </Col>
                                    </div>
                                    <Row>
                                        <Col className='d-flex align-items-stretch border-right pr-0'>
                                            {uploadView ?
                                                <DocumentUpload interestId={interestId} setUploadView={setUploadView} /> :
                                                <Messenger messagesEndRef={messagesEndRef} setProposalData={setProposalData} activeProposal={activeProposal} proposalData={proposalData} handleToggleSidebar={handleToggleSidebar} AuthUserInfo={AuthUserInfo} />

                                            }

                                        </Col>
                                        <Col xs={4} className='pl-0'>
                                            <div className='mb-4'>
                                                <div className='fill mb-2'>
                                                    <img className='interestImage' src={data.listingMainPhotoUrl} />
                                                </div>
                                            </div>
                                            <QuickFacts quickFacts={data.quickFacts} />
                                            {

                                                !toggle && (
                                                    <div className='d-flex justify-content-center mt-4 px-3'>

                                                        <>
                                                            <Col xs={6}>
                                                                <Button className='rounded-sm' block>Request Showing</Button>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <Button className='rounded-sm' block>Submit Offer</Button>
                                                            </Col>
                                                        </>
                                                    </div>
                                                )





                                            }
                                            <Documents setUploadView={setUploadView} docs={docs} loading={docLoading} error={err} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Col>
                        <ViewProposal interestId={interestId} interestData={data} toggle={toggle} setToggle={setToggle} handleToggleSidebar={handleToggleSidebar} proposalData={proposalData} />
                    </Row>
                </>
            }
        </>


    )
};



export default withAuthUser(withAuthUserInfo(withLoginModal(Interest)));
