"use strict";

import firebase from "firebase/app";
import "firebase/storage";
import firebaseInit from "./firebaseInit";

firebaseInit();

export default async (file, userId) => {
  // Connect to user's storage ref
  const storageRef = firebase.storage().ref(`users/${userId}`);

  try {
    // Upload file with metadata
    const uploaded = await storageRef
      .child(file.name)
      .put(file, {
        contentType: file.type
      })
      .then();

    // Return download URL
    return await uploaded.ref.getDownloadURL();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
