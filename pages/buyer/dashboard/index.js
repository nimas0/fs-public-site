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

// import firebaseInit from '../../../utils/firebaseInit';
// import firebase from 'firebase/app';
// import "firebase/firestore";
import Nav from '../../../components/Nav';

// // Initialize Firebase app
// firebaseInit();


const Dashboard = () => {

    // const { AuthUser = null } = AuthUserInfo;
    // const [value, loading, error] = useCollection(firebase.firestore().collection('interest').where('buyer.buyerUid', '==', AuthUser.id));
    // const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
    //     firebase
    //         .firestore()
    //         .collection('users')
    //         .doc(AuthUser.id)
    // );

    //TODO : clean up return. getting messy with error && error statments

    return (
        <>
            {/* <Nav solidBackground AuthUser={AuthUser} showLoginModal={showLoginModal} /> */}
            <Container>
                <Row>
                    <h2>sdfsdf</h2>
                </Row>
            </Container>
        </>
    )

};


// Dashboard.getInitialProps = async (ctx) => {

//     const userId = ctx.myCustomData.AuthUserInfo.AuthUser.id;

//     // Get profile data
//     const userProfileFetch = fetch(`${process.env.HOST}/api/user?id=${userId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     });


//     try {
//         const [userProfileResponse] = await Promise.all([userProfileFetch]);

//         if (userProfileResponse.ok) {
//             const { verification } = await userProfileResponse.json();
//             console.log(verification);
//             return {
//                 verification: verification
//             }
//         } else if ([404, 503].includes(userProfileResponse.status)) {
//             return { statusCode: userProfileResponse.status };
//         } else {
//             // https://github.com/developit/unfetch#caveats
//             let error = new Error(userProfileResponse.statusText);
//             error.response = userProfileResponse;
//             throw error;
//         }



//     } catch (err) {
//         console.log(err)
//         return {
//             statusCode: (err.response && err.response.status) || err.statusCode || 500,
//         };
//     }
// }

export default Dashboard;
