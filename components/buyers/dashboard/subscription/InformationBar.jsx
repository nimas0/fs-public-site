import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";

import firebase from "firebase/app";
import firebaseInit from "../../../../utils/firebaseInit";

import "firebase/firestore";
import GenericModal from "../../../GenericModal";

// Initialize Firebase app
firebaseInit();

const NoticationBar = ({ buyerUid, listingId }) => {
  const [showings, setShowings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      const data = [];
      try {
        const response = await firebase
          .firestore()
          .collection("showings")
          .where("buyerUserId", "==", buyerUid)
          .where("listingId", "==", listingId)
          .get();

        if (response.empty) return;

        const dataArray = response.docs.forEach((doc) => {
          console.log("doc", doc.id, doc.data());
          data.push({ doc: doc.id, ...doc.data() });
        });

        setShowings(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("showings", showings);

  return showings.map((showing) => (
    <>
      <Button
        onClick={() => setModalShow(true)}
        className='m-1 rounded-sm bg-light border-bottom border-top-0 border-right-0 border-left-0 w-100 d-flex justify-content-between align-items-center'
      >
        <h6 className=' m-0'>Scheduled</h6>
        <p className='px-1 m-0 text-dark'>
          <strong>
            {new Date(showing.scheduled.seconds * 1000).toLocaleString()}
          </strong>
        </p>
        <p className='text-primary p-0 m-0'>{showing.status.toUpperCase()}</p>
      </Button>
      <GenericModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header='Cancel Appointment'
        body={<p>Email support@findingspaces.com to cancel</p>}
      />
    </>
  ));
};

export default NoticationBar;
