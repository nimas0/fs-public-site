"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();
// Add user uploaded document to intersted collection in database
/// POST only
export default async (req, res) => {
    const { documentURL, interestId, name, type } = req.body;
    console.log(req.body)
    //Connect to user's database reference
    const documentRef = firebase
        .firestore()
        .collection("interest")
        .doc(interestId)
        .collection("documents");

    console.log(documentRef)


    try {
        // Set new verification values
        await documentRef.add({
            name: name,
            url: documentURL,
            type: type
        }
        );

        // If no error yet, mission accomplished
        res.status(200).json({ message: "Upload complete!" });
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