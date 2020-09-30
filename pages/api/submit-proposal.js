"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";
import uid from 'uid';
import { DateTime } from 'luxon'

firebaseInit();
// Submit propsal for informal offer to interested collection in database
/// POST only
export default async (req, res) => {
    const { interestId, offerDetails, displayName } = req.body;
    console.log(req.body)


    // break apart the interest id into its individual components ie. listingId_buyerId
    // const { listingId, buyerId } = Object.fromEntries(interestId.split("_").map((a, index) => {
    //     if (index === 0) {
    //         return ['listingId', a]
    //     } else if (index === 1) {
    //         return ['buyerId', a]
    //     }
    // }));

    const splitId = interestId.split('_');
    console.log(splitId)
    const listingId = splitId[0]
    const buyerId = splitId[1]

    console.log('listingId', listingId)
    console.log('buyerId', buyerId)

    // stores the actual proposal denormalized or seperate from interested collection
    const proposalRef = firebase
        .firestore()
        .collection('proposals');


    //Connect to user's database reference
    const interestedRef = firebase
        .firestore()
        .collection("interest")
        .doc(interestId)
    // set expiration date 48 hours from proposal submittion
    const expirationDate = DateTime.fromJSDate(new Date()).plus({ days: 2 }).toJSDate();

    //create proposal id
    const docId = `${interestId}_${uid()}`;

    const { amount, deposit } = offerDetails;


    try {

        await proposalRef.doc(docId).set({
            state: 'active',
            offererId: buyerId,
            listingId: listingId,
            offerDetails: offerDetails,
            expires: firebase.firestore.Timestamp.fromDate(expirationDate),
            owner: {
                id: buyerId,
                displayName: displayName
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

        // Add offer field object to interested document
        await interestedRef.set({
            proposal: {
                state: 'active',
                offererId: buyerId,
                history: firebase.firestore.FieldValue.arrayUnion(docId),
                latestQuickFacts: {
                    docId: docId, amount, deposit, expires: firebase.firestore.Timestamp.fromDate(expirationDate),
                },

            },

        }, { merge: true }
        );

        // If no error yet, mission accomplished
        res.status(200).json({ message: "Upload complete!", docId: docId });
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