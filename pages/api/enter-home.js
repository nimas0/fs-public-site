"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

// POST only
export default async (req, res) => {
    const { values } = req.body;
    console.log(values)
    try {

        // Format update object
        const code = Object.values(values)
            .toString()
            .replace(/,/g, '')
            .toUpperCase();

        console.log('code', code)
        // Connect to current listing's questions
        const db = firebase.firestore();
        const lookupRef = db
            .collection("listings");
        let listingArray = [];
        let query = await lookupRef.where('signCode.id', '==', code).get();

        console.log('listing', query.exists)

        // If no error, mission accomplished
        if (!query.empty) {
            query.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id);
                listingArray.push(doc.id)

            });
            res.status(200).json({ listingId: listingArray[0] });
        } else {
            console.log(
                "Listing exists, but owner does not. Database references need fixing."
            );
            res.status(404).json({ message: "No listing found, please try again." });
        }
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