import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { Pending, Denied, Approved, Expired } from "./Status";

const Approval = ({ verification, AuthUser, setModalShow, showLoginModal }) => {
  const router = useRouter();

  const [uiState, resetState] = useState();

  const uploadPageRedirect = () => {
    router.push(
      `/buyer/pre-approval?upload=${AuthUser.id}`,
      `/buyer/pre-approval/${AuthUser.id}`
    );
  };

  switch (verification && verification.status) {
    case "pending":
      return <Pending verification={verification} />;
    case "approved":
      return <Approved verification={verification} />;
    case "denied":
      return <Denied reset={uploadPageRedirect} />;
    case "expired":
      return (
        <Expired
          verification={verification}
          uploadPageRedirect={uploadPageRedirect}
        />
      );
    default:
      return (
        <>
          {/* <h4 className=' mt-3 align-content-end bg-transparent text-info '>
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
             </h4> */}

          <Card className=' p-4 bg-white border rounded'>
            <Card.Body className='text-left py-3 pl-0'>
              <div className='text-warning d-flex justify-content-start  '>
                {/* <FontAwesomeIcon size='2x' icon={faFrownOpen} /> */}
                <h4 className='ml-1 text-success '>Verfication</h4>
              </div>

              <Card.Text className=' text-dark text-left  pt-0 mt-0 pt-2 w-100'>
                <>
                  Unlock 
                  {' '}
                  <b>scheduling, chat, or submit an offer </b>
                  {' '}
                  by
                  uploading a Pre-Qualification, Pre-Approval, or Proof of
                  Funds.
                </>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (AuthUser) setModalShow(true);
                    if (!AuthUser) showLoginModal();
                  }}
                  variant='info'
                  className='rounded-0'
                >
                  Upload Verification
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
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
