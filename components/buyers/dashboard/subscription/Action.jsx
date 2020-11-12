import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GenericModal from '../../../GenericModal';
import InformationBar from './InformationBar';

const Action = ({
   verification: { status },
   subscriptionData: {
      listingMainPhotoUrl,
      listingId,
      buyer: { buyerUid },
      proposal,
   },
}) => {
   const router = useRouter();
   const [modalShow, setModalShow] = React.useState(false);

   const isActive = status === 'pending' || status === 'approved';
   console.log('isActive', isActive);
   const isProposed = proposal && proposal.state === 'active';
   const isAccepted =  proposal && proposal.state === 'accepted'
   console.log('proposal', isProposed);
   const handleClick = () => {
      if (isActive) {
         isProposed
            ? router.push(
                 `/buyer/interest?interestId=${listingId}_${buyerUid}`,
                 `/buyer/interest/${listingId}_${buyerUid}`
              )
            : router.push(`/buyer/Offer/[Offer]`, `/buyer/Offer/${listingId}_${buyerUid}`);
      } else if (!isActive) {
         setModalShow(true);
      }
   };
   console.log('propsal', isProposed)

   return (
      <>
         <Row className='pb-1 px-1'>
            <InformationBar />
         </Row>
         <Row>
            <Col>
               <Image width='225' src={listingMainPhotoUrl} />
            </Col>
            <Col>
            {!isAccepted &&
               (<Button
                  size='sm'
                  onClick={handleClick} // TODO: route to submit offer page
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1 buttonShadow'
                  block>
                  {isActive && isProposed ? 'View Proposals' : 'Propose Offer'}
               </Button>)}
               <Button
                  onClick={() =>
                     status === 'pending' || 'approved'
                        ? router.push(
                             `/buyer/interest?interestId=${listingId}_${buyerUid}`,
                             `/buyer/interest/${listingId}_${buyerUid}`
                          )
                        : setModalShow(true)
                  }
                  size='sm'
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1 buttonShadow'
                  block>
                  Chat with Seller
               </Button>

               <Button
                  onClick={() => router.push(`/listing/${listingId}/tour`)}
                  size='sm'
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1 buttonShadow'
                  block>
                  Request Showing
               </Button>
               {/* <Button
                  onClick={() =>
                     router.push(
                        `/buyer/interest?interestId=${listingId}_${buyerUid}`,
                        `/buyer/interest/${listingId}_${buyerUid}`
                     )
                  }
                  size='sm'
                  variant='primary'
                  className='mb-1 '
                  block>
                  View Docs
               </Button> */}
            </Col>
         </Row>
         <GenericModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            header='Verification required to use this feature.'
            body={<ModalBody />}
         />
      </>
   );
};

const ModalBody = () => (
   <>
      <p>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
         been the industry's standard dummy text ever since the 1500s, when an unknown printer took
         a galley of type and scrambled it to make a type specimen book. It has survived not only
         five centuries, but also the leap into electronic typesetting, remaining essentially
         unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
         Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
         PageMaker including versions of Lorem Ipsum.
      </p>
   </>
);

export default Action;
