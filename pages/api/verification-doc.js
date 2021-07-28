import firebase from "firebase/app";
import "firebase/firestore";
import fetch from "isomorphic-unfetch";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// POST only
export default async (req, res) => {
  const { documentURL, userId, verifType, lender, loanType, amount } = req.body;
  console.log(req.body);
  // Connect to user's database reference
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(userId);

  try {
    // notify admin about new task
    const submitAdminTask = await fetch(
      "https://us-central1-finding-spaces-73b23.cloudfunctions.net/admin/verification",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          document_url: documentURL,
          lender,
          loan_type: loanType,
          status: "pending",
          user_id: userId,
          verification_type: verifType,
        }), // body data type must match "Content-Type" header
      }
    );

    // Set new verification values on user profile
    await userRef.set(
      {
        verification: {
          status: "pending",
          documentURL,
          verifType,
          lender,
          loanType,
          amount,
        },
      },
      { merge: true }
    );

    // If no error yet, mission accomplished
    res.status(200).json({ message: "Upload complete!", submitAdminTask });
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
