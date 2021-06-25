

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";

firebaseInit();

export default async (req, res) => {
  /// Check current listing and/or user schedules
  console.log('res', req.query.showingId)
  const { showingId = null } = req.query;
  const { reason = null } = req.body;
  const showings = firebase.firestore().collection("showings");
//   console.log('showingId', res)

   try {
    // need to grab this information regardless of request method
    const docRef = (await showings.doc(showingId));
    const doc = await docRef.get();
    // bail out if doc is invalid
    if (!doc.exists) throw new Error('Doc doesnt exist');

    if (req.method === "GET") {
            // console.log('doc', doc.data())
            return res.status(200).json({ message: 'Here is some data', doc: doc.data(), scheduled: doc.data().scheduled.toDate() });

        } if (req.method === 'POST' && req.body.type === 'cancel') {
            if(doc.data().cancelled === true) throw new Error('Appointment has already been cancelled')

            await docRef.update({
                cancelled: true,
                status: 'cancelled',
                reason
            })

            // If no error, mission accomplished
            return res.status(200).json({ message: 'Showing has been cancelled' });
    } if (req.method === 'POST' && req.body.type ==='reschedule') {
        console.log('reschedule', req.body)
        await docRef.update({
            cancelled: false,
            status: 'rescheduled',
            duration: req.body.durationInMinutes,
            scheduled: firebase.firestore.Timestamp.fromDate(new Date(req.body.startTime))

        })
        // Mark existing appointment as rescheduled
        // Generate New appointment



        res.status(200).json({message: 'You got this far'})
    }
        
    } catch (error) {
            console.log(error.message);
            // if (response) {
                res.status(400).json({ message: error.message });
            // } else {
            //     // 503 Service Unavailable
            //     res.status(503).json({ message: err.message });
            // }

        
   }
  }
