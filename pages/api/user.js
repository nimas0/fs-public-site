"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// GET only
export default async (req, res) => {
  const { id } = req.query;

  // Set up database connection
  const db = firebase.firestore();

  // Get current user data
  try {
    const user = await db
      .collection("users")
      .doc(id)
      .get();
    if (user.exists) {
      // 200 OK
      res.status(200).json({ id, ...user.data() });
    } else {
      // 404 Not Found
      res.status(404).json({ message: "No user found" });
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
