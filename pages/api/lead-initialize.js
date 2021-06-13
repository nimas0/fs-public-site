

import firebase from "firebase/app";
import "firebase/firestore";
import uid from 'uid';
import { DateTime } from 'luxon'
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();
// Submit propsal for informal offer to interested collection in database
/// POST only
export default async (req, res) => {
    const { listingId, AuthUser, listing } = req.body;
    console.log(req.body.listing.photos[0].src)

    // listing page subscriptions are considered a weak lead
    // stronger leads include skipping normal flow to make an offer
    // or viewing the property

    const LEAD_STRENGTH = 1;

    // destructure buyers data
    const { id, displayName, emailVerified, photoURL } = AuthUser;
    const { address, originalPrice, currentPrice, bedrooms, fullBaths, halfBaths, totalFinishedSqFt, photos } = listing;

    try {

        if (!emailVerified) throw new Error('Email is not verified.');
        console.log('emailVerified', emailVerified)
        // write subscription entry to 'interest collection in firestore' 
        // document id in collection is listing ID + buyers ID
        // this ties the two parties together and prevents duplicate subscriptions
        const interestId = `${listingId}_${id}`;

        const interestRef = firebase
            .firestore()
            .collection('interest');

        const buyerUser = await firebase.firestore().collection('users').doc(id).get();
        const { verification } = buyerUser.data();
        // minimal amount of data needed to start a subscription
        // google cloud functions will generate the rest

        const data = {
            buyer: {
                photoURL,
                displayName,
                buyerUid: id,
                verification
            },
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            listingId,
            address,
            quickFacts: {
                originalPrice,
                currentPrice,
                bedrooms,
                fullBaths,
                halfBaths,
                totalFinishedSqFt
            },
            leadStrength: LEAD_STRENGTH,
            listingMainPhotoUrl: photos[0].src

        }

        // Add offer field object to interested document
        const document = await interestRef.doc(interestId).set(data);
        console.log(document);

        // If no error yet, mission accomplished
        res.status(200).json({ message: address });
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