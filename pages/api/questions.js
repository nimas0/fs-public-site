"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

// POST only
export default async (req, res) => {
  const { listingId, data } = req.body;

  // Format update object
  const questionData = Object.assign(
    {
      created: new Date(),
      public: false,
      deleted: false
    },
    data
  );

  // Connect to current listing's questions
  const db = firebase.firestore();
  const questions = db
    .collection("listings")
    .doc(listingId)
    .collection("questions");

    // add new message to the counter for Tabs on navigation
  const ref = db
    .collection("message_counter").doc(listingId);
  ref.set({ questionCount: firebase.firestore.FieldValue.increment(1) }, { merge: true })

  // Add new question
  try {
    await questions.add(questionData);

    // If no error, mission accomplished
    res.status(200).json({ message: "Question sent!" });
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
