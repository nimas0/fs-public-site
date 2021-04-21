import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Pending, Denied, Approved, Expired } from './Status';

const Approval = ({ verification, AuthUser, setModalShow }) => {
   const router = useRouter();

   const [uiState, resetState] = useState();

   const uploadPageRedirect = () => {
      router.push(
         `/buyer/pre-approval?upload=${AuthUser.id}`,
         `/buyer/pre-approval/${AuthUser.id}`
      );
   };

   switch (verification.status) {
      case 'pending':
         return <Pending verification={verification}  />;
      case 'approved':
         return <Approved verification={verification} />;
      case 'denied':
         return <Denied reset={uploadPageRedirect} />;
      case 'expired':
         return <Expired verification={verification} uploadPageRedirect={uploadPageRedirect} />;
      default:
         return (
           <>
             <h4 className=' mt-3 align-content-end bg-transparent text-info '>
               <Button
                 onClick={
              (e) => {
                  e.preventDefault();
                  setModalShow(true);
              }
            }
                 variant='info'
                 className='rounded-0'
               >Upload Verification
               </Button>
             </h4>
             {/* <Button
                     onClick={uploadPageRedirect}
                     variant='primary'
                     className='mb-3 px-5 rounded-lg'
                   >
                     Upload
                   </Button> */}
             {/* <Card.Text>
               <small>
                 <i>*required to view properties through findingSpaces</i>
               </small>
             </Card.Text> */}
           </>
         );
   }
};

export default Approval;
