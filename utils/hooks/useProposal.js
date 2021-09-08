/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebase from 'firebase/app';
import firebaseInit from '../firebaseInit';
// Initialize Firebase app
firebaseInit();

export const useProposal = (proposalId) => {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log('got called in useProposal', proposalId);
  useEffect(() => {
    if (!proposalId) return;
    console.log('got called in useProposal222', proposalId);
    const unsubscribe = async () => {
      const proposalsRef = firebase
        .firestore()
        .collection('proposals')
        .doc(proposalId);
      proposalsRef
        .get()
        .then((doc) => setProposal(doc.data()))
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    };
    setLoading(true);
    unsubscribe();
    setLoading(false);
    // eslint-disable-next-line consistent-return
    return () => unsubscribe();
  }, [proposalId]);

  return { proposal, loading, error };
};
