import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import MainLayout from '../../../components/layout/MainLayout';
import Heading from '../../../components/buyers/dashboard/Heading';
import Approval from '../../../components/buyers/dashboard/approval/Approval';
import SubscriptionCard from '../../../components/buyers/dashboard/subscription/SubscriptionCard';
import Resources from '../../../components/buyers/dashboard/Resources';
import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';

import SellerSignUp from '../../../components/buyers/dashboard/sellersignup/SellerSignUp'

import firebaseInit from '../../../utils/firebaseInit';
import "firebase/firestore";
import Nav from '../../../components/Nav';

// Initialize Firebase app
firebaseInit();


const Dashboard = ({ AuthUserInfo, showLoginModal, verification, subscriptionData }) => {
    const router = useRouter();
    const { AuthUser = null } = AuthUserInfo;
    const [value, loading, error] = useCollection(firebase.firestore().collection('interest').where('buyer.buyerUid', '==', AuthUser.id));
    const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
        firebase
            .firestore()
            .collection('users')
            .doc(AuthUser.id)
    );



    // TODO : clean up return. getting messy with error && error statments

    return (
      <>
        <Nav showLogo showQuickLinks={false} AuthUser={AuthUser} showLoginModal={showLoginModal} />
        <Container>
          <Row>
            <Col xs='6'>
              <Heading AuthUser={AuthUser} />
              <Row className='pb-1 mx-1'>
                {/* {/* <Card.Header className='bg-transparent  border-0 ' as='h4'>
                                Seller's Dashboard
                                       </Card.Header> */}
                {/* <Button href={!loadingUserDoc && userDoc.data().defaultListingId ? 'http://localhost:3001/showings' : '/learnmore'} className=' rounded-lg mx-3' variant="primary" size="md" block>
                                {!loadingUserDoc && userDoc.data().defaultListingId ? 'Go to Seller\'s Dashboard' : 'Learn More: Sell Your Home Free'}
                            </Button> */}

              </Row>
              {
                            errorUserDoc ? <strong>Error: {JSON.stringify(error)}</strong> :
                            <Approval key={userDoc} verification={loadingUserDoc ? verification : userDoc.data().verification} AuthUser={AuthUser} />
                        }



              {error && errorUserDoc && <strong>Error: {JSON.stringify(error)}</strong>}
              <Resources />

            </Col>
            <Col xs={{ span: 6 }}>

              <Row>
                <Col>
                  <Card className='border-0 mb-2 bg-transparent'>
                    {/* <Card.Header className='bg-transparent py-4  border-0 ' as='h4'>
                                       Search Using Home Code`
                                       </Card.Header>  */}
                    {/* <Card.Body className='text-center py-5'>

                                        <Card.Text>
                                            <small>
                                                <i>Search Bar for Home</i>
                                            </small>
                                        </Card.Text>
                                    </Card.Body> */}
                  </Card>

                </Col>
              </Row>
              <p className='text-muted'>Quick links</p>
              {/* <SellerSignUp key={userDoc} verification={loadingUserDoc ? verification : userDoc.data().verification} AuthUser={AuthUser} /> */}
              <Row className='mb-5'>

                <Col xs={12}>
                  <Button
                    href={userDoc && (userDoc.data()).hasOwnProperty('defaultListingId') ?  'https://seller.findingspaces.com/showings' :  'https://findingspaces.com/learnmore'}
                                    // onClick={userDoc && (userDoc.data()).hasOwnProperty('defaultListingId') && router.push('/')}
                    variant='primary'
                    style={{ borderStyle: 'solid', borderRadius: 10 }}
                    block
                    className=' p-3 text-white m-1 buttonShadow  d-flex justify-content-between border-rounded  '
                  >
                    {userDoc && (userDoc.data()).hasOwnProperty('defaultListingId') ? 'Go to Seller\'\s dashboard' : 'Sell Your Home Without An Agent'}
                    <b><FontAwesomeIcon icon={faChevronRight} color='white' /></b>
                  </Button>

                </Col>
                <Col>
                  <Button
                    onClick={() => router.push('/')}
                    style={{ borderStyle: 'solid', borderRadius: 10 }}
                    block
                    className=' p-3 text-white m-1 buttonShadow  d-flex justify-content-between border-rounded  '
                  >
                    Enter Home Code
                    <b><FontAwesomeIcon icon={faChevronRight} color='white' /></b>
                  </Button>
                </Col>
              </Row>
              <p className='text-muted'>Subscriptions</p>
              {loading && loadingUserDoc && <span>Loading...</span>}
              {(value && userDoc) && (
                <span>
                  {
                                    value.docs.length === 0 ?
                                        (
                                          <Card style={{ height: '20rem' }} className='border rounded'>
                                            <Card.Header>You are not currently subscribed to any property.</Card.Header>
                                            <Card.Body>
                                              <h6>Once subscribed you can: </h6>
                                              <ul>
                                                <li>Make offers</li>
                                                <li>Chat with Homeowner</li>
                                                <li>Schedule Showings</li>
                                                <li>Recieve updates</li>
                                              </ul>
                                            </Card.Body>
                                          </Card>
                                        )
                                        :
                                        (

                                            value.docs.map(doc => (
                                              <React.Fragment key={doc.id}>
                                                <SubscriptionCard interestId={doc.id} verification={loadingUserDoc ? verification : userDoc.data().verification} subscriptionData={doc.data()} />
                                              </React.Fragment>
                                            ))

                                        )
                                }

                </span>
                        )}
            </Col>

          </Row>

        </Container>
      </>
    )

};


Dashboard.getInitialProps = async (ctx) => {

    console.log('ctx--', ctx.myCustomData.AuthUserInfo.AuthUser)
    // if (ctx && !ctx.myCustomData.AuthUserInfo.AuthUser) {
    //     ctx.res.writeHead(301, {
    //       Location: '/'
    //     });
    //     ctx.res.end();
    //   }

    const userId = ctx.myCustomData.AuthUserInfo.AuthUser.id;
    console.log('uusseerr', userId)
    console.log('env', process.env.HOST)
    // Get profile data
    const userProfileFetch = fetch(`${process.env.HOST}/api/user?id=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });


    try {
        const [userProfileResponse] = await Promise.all([userProfileFetch]);

        if (userProfileResponse.ok) {
            const { verification } = await userProfileResponse.json();
            console.log(verification);
            return {
                verification
            }
        } if ([404, 503].includes(userProfileResponse.status)) {
            return { statusCode: userProfileResponse.status };
        } 
            // https://github.com/developit/unfetch#caveats
            const error = new Error(userProfileResponse.statusText);
            error.response = userProfileResponse;
            throw error;
        



    } catch (err) {
        console.log(err)
        return {
            statusCode: (err.response && err.response.status) || err.statusCode || 500,
        };
    }
}

export default withAuthUser(withAuthUserInfo(withLoginModal(Dashboard)));
