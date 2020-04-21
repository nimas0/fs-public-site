"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// POST only
export default async (req, res) => {
  const { documentURL, userId } = req.body;

  // Connect to user's database reference
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(userId);

  try {
    // Set new verification values
    await userRef.set(
      { verification: { status: "pending", documentURL } },
      { merge: true }
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
