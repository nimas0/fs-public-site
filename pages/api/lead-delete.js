

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();
// Submit propsal for informal offer to interested collection in database
/// POST only
export default async (req, res) => {
    const { interestId } = req.body;
    console.log(req.body)

    try {

        // if (!emailVerified) throw new Error('Email is not verified.');
        // console.log('emailVerified', emailVerified)
        // write subscription entry to 'interest collection in firestore' 
        // document id in collection is listing ID + buyers ID
        // this ties the two parties together and prevents duplicate subscriptions

        const interestRef = firebase
            .firestore()
            .collection('interest')

        // minimal amount of data needed to start a subscription
        // google cloud functions will generate the rest

        // Add offer field object to interested document
        const document = await interestRef.doc(interestId).delete();
        console.log(document);

        // If no error yet, mission accomplished
        // TODO: 
        res.status(200).json({ message: document });
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