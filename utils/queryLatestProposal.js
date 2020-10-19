"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "./firebaseInit";

firebaseInit();

const db = firebase.firestore();

// Add user uploaded document to intersted collection in database
/// POST only
export default async (interestId) => {

    const interestRef = db.collection('interest').doc(interestId);
    const proposalRef = db.collection('proposal');

    try {

        // Check if the user is creating the initial proposal?
        const document = interestRef.get();
        const data = (await document).data();
        // if yes, return
        if (!data.proposal) return false;

        //--Otherwise, retrieve the latest proposal data

        // retrieve proposalDocId
        const proposalId = data.proposal.latestQuickFacts.docId;

        const proposalRef = db.collection('proposals').doc(proposalId);
        const proposalQuery = await proposalRef.get();
        const proposal = (await proposalQuery).data();
        return await proposal;
        // get proposalData
        // return proposalData

    } catch (err) {
        console.error(err);
        throw err;
    }
};
