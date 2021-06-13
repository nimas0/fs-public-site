

import firebase from "firebase/app";
import "firebase/firestore";
import uid from 'uid';
import { DateTime } from 'luxon'
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();
// Submit propsal for informal offer to subscriptioned collection in database
/// POST only
export default async (req, res) => {
    const { listingId, AuthUser, listing } = req.body;
    console.log('req', req)
    // destructure buyers data
    const { id,  emailVerified } = AuthUser;

    try {

        // if (!emailVerified) throw new Error('Email is not verified.');
        // console.log('emailVerified', emailVerified)
       
       
        const subscriptionId = `${listingId}_${id}`;

        const subscriptionRef = firebase
            .firestore()
            .collection('subscriptions');

        const data = {
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            listingId,
            listing,
            buyerUid: id
        }

        // Add offer field object to subscriptioned document
        const document = await subscriptionRef.doc(subscriptionId).set(data);
      

        // If no error yet, mission accomplished
        res.status(200).json({ message: 'user has now subscribed' });
    } catch (err) {
        console.log(err);
        const { response } = err;
        if (response) {
            res.status(response.status).json({ message: response.statusText });
        } else {
            // 503 Service Unavailable
            res.status(503).json({ message: err.message });
        }
    }
};