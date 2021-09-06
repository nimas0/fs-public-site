/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../firebaseInit';

// Initialize Firebase app
firebaseInit();

export const useLead = (leadId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const [leadData, setLeadData] = useState({});

  useEffect(() => {});

  return { isInitialized, leadData, loading, error };
};
