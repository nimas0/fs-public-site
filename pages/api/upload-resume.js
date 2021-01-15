import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

/// POST only
export default async (req, res) => {
  const { documentURL, fullName, email, phone, currentCompany } = req.body;
  console.log(req.body);

  try {
    // Set new verification values

    await firebase
      .firestore()
      .collection("adminTasks")
      .add({
        priority: "urgent",
        type: "resume",
        data: {
          fullName,
          email,
          phone,
          currentCompany,
          documentURL,
        },
      });

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
