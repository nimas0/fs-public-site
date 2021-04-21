

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button } from 'react-bootstrap';
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton';

import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";
import Stat from './Stat';
import Approval from './buyers/dashboard/approval/Approval';



import firebaseInit from "../utils/firebaseInit";
import "firebase/firestore";



// Initialize Firebase ap
firebaseInit();

const QuickStats =  ({ 
  address,
  activity, 
  price,
  beds,
  baths,
  sqFt,
  skeleton,
  setSkeleton,
  setModalShow,
  pricePerSqFt,
  AuthUser,
  verification
 }) => { 
 

const [userDoc, loadingUserDoc, errorUserDoc] = useDocument(
  firebase
    .firestore()
    .collection("users")
    .doc(AuthUser.id)
);
 
 return (
   <SkeletonTheme color="#e5e5e5" highlightColor="#ffffff">
     <Row noGutters className='justify-content-between align-items-center mb-2'>
       {/* Activity */}
       <Col xs={12} className='h3 primary mb-sm-0'>
         {/* <FontAwesomeIcon icon={faFire} style={{ color: "#fab92d" }} />  */}
       
         {     skeleton ? (
           <Skeleton 
             style={{marginBottom: '1rem'}} 
             delay={1000} 
             height={50} 
             count={1}
           />
                  ) : (
          address
        )}      
       </Col>
    
      
  
         
       <Approval
         setModalShow={setModalShow}
         key={userDoc}
         verification={
                  loadingUserDoc ? "" : userDoc.data().verification
                }
         AuthUser={AuthUser}
       />



       {/* Quick stats */}
       <Col
         xs={8}
         sm='auto'
         className='d-flex text-info d-md-inline-flex flex-wrap justify-content-around'
       >
         <Stat loading label='Price' stat={price} unitPre='$' />
         <Stat loading label='Beds' stat={beds} />
         <Stat loading label='Baths' stat={baths} />
         <Stat loading label='Sq.Ft.' stat={sqFt} />
         <Stat loading label='per Sq.Ft.' stat={pricePerSqFt} unitPre='$' last />
       </Col>
     </Row>
   </SkeletonTheme>
   )
  };

   export default QuickStats