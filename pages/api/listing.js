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

  // Get current listing data
  const listingRef = db.collection("listings").doc(id);

  try {
    const listingSnapshot = await listingRef.get();
    if (listingSnapshot.exists) {
      let listing = listingSnapshot.data();

      // Extract address
      listing.address = [
        `${findAndRemove(listing.homeDetails, "streetNumber")} ${findAndRemove(
          listing.homeDetails,
          "streetName"
        )}`,
        `${findAndRemove(listing.homeDetails, "city")}, ${findAndRemove(
          listing.homeDetails,
          "state"
        )} ${findAndRemove(listing.homeDetails, "zipCode")}`
      ];

      // Extract at-a-glance data
      listing.originalPrice = findAndRemove(
        listing.homeDetails,
        "originalPrice"
      );
      
      listing.currentPrice = findAndRemove(listing.homeDetails, "currentPrice");
      listing.bedrooms = findAndRemove(listing.homeDetails, "bedrooms");
      listing.fullBaths = findAndRemove(listing.homeDetails, "fullBaths");
      listing.halfBaths = findAndRemove(listing.homeDetails, "halfBaths");
      listing.totalFinishedSqFt = findAndRemove(
        listing.homeDetails,
        "totalFinishedSqFt"
      );

      // Remove falsy values and "Please Select" from homeDetails
      removeFalsy(listing.homeDetails);

      // Extract feature lists
      for (const property in listing.homeFeatures) {
        listing.homeFeatures[property] = extractList(
          listing.homeFeatures[property]
        );
      }

      // Get questions
      const publicQuestions = await listingRef
        .collection("questions")
        .where("public", "==", true)
        .where("deleted", "==", false)
        .get();
      let questions = [];
      publicQuestions.forEach(question => {
        questions.push(question.data());
      });

      // Get documents
      const documentsQuery = await listingRef.collection("documents").get();
      let documents = [];
      documentsQuery.forEach(document => {
        documents.push(document.data());
      });

      // Get owner data
      const ownerId = listingSnapshot.data().primaryOwnerId;
      const ownerRef = db.collection("users").doc(ownerId);
      const owner = await ownerRef.get();
      if (owner.exists) {
        // 200 OK
        res.status(200).json({
          listing,
          questions,
          documents,
          owner: owner.data()
        });
      } else {
        console.log(
          "Listing exists, but owner does not. Database references need fixing."
        );
        // 404 Not Found
        res.status(404).json({ message: "No owner found" });
      }
    } else {
      // 404 Not Found
      res.status(404).json({ message: "No listing found" });
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

function findAndRemove(array, name) {
  // Finds an array element by property `name`, then removes element and
  // returns its `value`
  const matchesName = element => element.name === name;
  const index = array.findIndex(matchesName);
  if (index === -1) {
    return undefined;
  } else {
    const deleted = array.splice(index, 1);
    return deleted[0].value;
  }
}

function removeFalsy(array) {
  // Also removes "Please Select"
  let i = 0;
  while (i < array.length) {
    if (!array[i].value || array[i].value === "Please Select") {
      array.splice(i, 1);
    } else {
      i++;
    }
  }
}

function extractList(array) {
  const result = array.reduce((list, element) => {
    if (element.value) {
      return list + (list ? ", " : "") + element.label;
    } else {
      return list;
    }
  }, "");
  return result;
}
