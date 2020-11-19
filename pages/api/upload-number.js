"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// POST only
export default async (req, res) => {
    const { number, userId } = req.body;
    console.log(req.body)
    //Connect to user's database reference
    const userRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);

    console.log(userRef)


    try {
        // Set new verification values
        await userRef.update(
            {
                number: number
            }
        );

        // If no error yet, mission accomplished
        res.status(200).json({ message: "Number submitted!" });
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