import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseInit from '../../utils/firebaseInit';

firebaseInit();

// POST only
export default async (req, res) => {
  const { id, displayName, photoURL } = req.body;

  // Connect to user reference;
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(id);

  try {
    // Check if user exists
    const user = await userRef.get();
    if (user.exists) {
      // Make sure verification field exists
      if (user.get('verification.status') === undefined) {
        // Set verification
        // todo: change to false to reenable verification
        userRef.set({ verification: { status: 'approved' } }, { merge: true });
      }

      // Return existing user
      res.status(200).json({ created: false, ...user.data() });
    } else {
      // Create new user at id
      const newUserData = {
        displayName,
        photoURL,
        createdAt: new Date(),
        verification: {
          status: 'approved',
        },
      };
      await userRef.set(newUserData);

      // Return new user
      res.status(200).json({ created: true, ...newUserData });
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
