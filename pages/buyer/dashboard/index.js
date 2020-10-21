import React from 'react';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../../../components/layout/MainLayout';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Heading from '../../../components/buyers/dashboard/Heading';
import Approval from '../../../components/buyers/dashboard/approval/Approval';
import SubscriptionCard from '../../../components/buyers/dashboard/subscription/SubscriptionCard';
import Resources from '../../../components/buyers/dashboard/Resources';
import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import SellerSignUp from '../../../components/buyers/dashboard/sellersignup/SellerSignUp'

import firebaseInit from '../../../utils/firebaseInit';
import firebase from 'firebase/app';
import "firebase/firestore";
import Nav from '../../../components/Nav';

// Initialize Firebase app
firebaseInit();


const Dashboard = ({ AuthUserInfo, showLoginModal, verification, subscriptionData }) => {

    const { AuthUser = null } = AuthUserInfo;
    const [value, loading, error] = useCollection(firebase.firestore().collection('interest').where('buyer.buyerUid', '==', AuthUser.id));
    const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
        firebase
            .firestore()
            .collection('users')
            .doc(AuthUser.id)
    );
    console.log('i made it!')
    //  console.log(process.env.HOST)

    //TODO : clean up return. getting messy with error && error statments

    return (
        <>
            <Nav solidBackground AuthUser={AuthUser} showLoginModal={showLoginModal} />
            <Container>
                <Row>
                    <Col xs='6'>

                        <Heading />
                        <Row className='pb-2 mx-1'>
                            {/* {/* <Card.Header className='bg-transparent  border-0 ' as='h4'>
                                Seller's Dashboard
                                       </Card.Header> */}
                            {/* <Button href={!loadingUserDoc && userDoc.data().defaultListingId ? 'http://localhost:3001/showings' : '/learnmore'} className=' rounded-lg mx-3' variant="primary" size="md" block>
                                {!loadingUserDoc && userDoc.data().defaultListingId ? 'Go to Seller\'s Dashboard' : 'Learn More: Sell Your Home Free'}
                            </Button> */}
                            <SellerSignUp key={userDoc} verification={loadingUserDoc ? verification : userDoc.data().verification} AuthUser={AuthUser} />
                        </Row>
                        {/* {
                            errorUserDoc ? <strong>Error: {JSON.stringify(error)}</strong> :
                                <Approval key={userDoc} verification={loadingUserDoc ? verification : userDoc.data().verification} AuthUser={AuthUser} />
                        } */}
                        {error && errorUserDoc && <strong>Error: {JSON.stringify(error)}</strong>}
                        {loading && loadingUserDoc && <span>Loading...</span>}
                        {(value && userDoc) && (
                            <span>
                                {value.docs.map(doc => (
                                    <React.Fragment key={doc.id}>
                                        <SubscriptionCard interestId={doc.id} verification={loadingUserDoc ? verification : userDoc.data().verification} subscriptionData={doc.data()} />
                                    </React.Fragment>
                                ))}
                            </span>
                        )}

                    </Col>
                    <Col xs={{ span: 6 }}>

                        <Row>
                            <Col>
                                <Card className='border-0 mb-2 bg-transparent'>
                                    {/* <Card.Header className='bg-transparent py-4  border-0 ' as='h4'>
                                       Search Using Home Code`
                                       </Card.Header>  */}
                                    <Card.Body className='text-center py-5'>

                                        <Card.Text>
                                            <small>
                                                <i>Search Bar for Home</i>
                                            </small>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Resources />
                    </Col>
                </Row>
            </Container>
        </>
    )

};


Dashboard.getInitialProps = async (ctx) => {

    const userId = ctx.myCustomData.AuthUserInfo.AuthUser.id;
    console.log('ctx', userId)
    console.log('process', process.env.HOST)
    // Get profile data


    const userProfileFetch = fetch(`${process.env.HOST}/api/user?id=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });



    // try {
    //     const [userProfileResponse] = await Promise.all([userProfileFetch]);

    // } catch (err) {
    //     console.log(err)
    //     return {
    //         statusCode: (err.response && err.response.status) || err.statusCode || 500,
    //     };
    // }
}

export default withAuthUser(withAuthUserInfo(withLoginModal(Dashboard)));
