import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { Pending, Denied, Approved, Expired } from './Status';

const Approval = ({ verification, AuthUser }) => {
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
         return <Expired verification={verification}  uploadPageRedirect={uploadPageRedirect} />;
      default:
         return (
            <Row>
               <Col>
                  {/*  boxShadow: 'inset 4px 4px 15px #bdbdbd' */}
                  <Card style={{}} className=' bg-transparent mb-2'>
                     <Card.Header className='py-2 text-muted' as='h5'>
                        Verification
                     </Card.Header>
                     <Card.Body className='text-center py-5'>
                        <Button
                           onClick={uploadPageRedirect}
                           variant='primary'
                           className='mb-3 px-5 rounded-lg'>
                           Upload
                        </Button>
                        <Card.Text>
                           <small>
                              <i>*required to view properties through findingSpaces</i>
                           </small>
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         );
   }
};

export default Approval;
