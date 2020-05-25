"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// POST only
export default async (req, res) => {
  const { documentURL, userId, verifType, lender, loanType, amount } = req.body;
  console.log(req.body)
  //Connect to user's database reference
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(userId);

  console.log(userRef)

  const adminRef = firebase
    .firestore()
    .collection('adminTasks');

  try {
    // Set new verification values
    await userRef.set(
      { verification: { status: "pending", documentURL, verifType, lender, loanType, amount } },
      { merge: true }
    );

    await firebase.firestore().collection('adminTasks').add({
      priority: 'urgent',
      type: 'verification',
      data: { verification: { status: "pending", documentURL, verifType, lender, loanType, amount } }
    })

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
