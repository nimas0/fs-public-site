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
         <Row className='pb-1 mb-3 px-1'>
            <InformationBar buyerUid={buyerUid} listingId={listingId} />
         </Row>
         <Row>
            <Col>
               <Image style={{borderRadius: 15, border: 0}} width='225rem' src={listingMainPhotoUrl} />
            </Col>
            <Col>
            <Button
             style={{borderRadius: 30, border: 0}}
                  onClick={() =>
                     status === 'pending' || 'approved'
                        ? router.push(
                             `/buyer/interest?interestId=${listingId}_${buyerUid}`,
                             `/buyer/interest/${listingId}_${buyerUid}`
                          )
                        : setModalShow(true)
                  }
                  size='large'
                  variant={status === 'pending' || 'approved' ? 'primary' : 'success'}
                  className='mb-3 buttonShadow'
                  block>
                  Chat
               </Button>
            {!isAccepted &&
               (<Button
                  style={{borderRadius: 30, border: 0}}
                  size='sm'
                  onClick={handleClick} // TODO: route to submit offer page
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1 buttonShadow'
                  block>
                  {isActive && isProposed ? 'View Proposals' : 'Propose Offer'}
               </Button>)}
             

               <Button
                   style={{borderRadius: 30, border: 0}}
                  onClick={() => (
                     isActive 
                     ?
                     router.push(`/listing/${listingId}/tour`)
                     :
                     setModalShow(true)
                   ) }
                  size='sm'
                  variant={(status === 'pending' || 'approved') ? 'primary' : 'secondary'}
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
            header='Pre-Approval or Pre-Qualification Required.'
            body={<ModalBody />}
         />
      </>
   );
};

const ModalBody = () => (
   <>
      <p>
      A mortgage approval allows you to make an offer with confidence and shows that you're a serious buyer with the means to purchase the seller's home. Please submit a pre-approval or proof of funds to unlock this feature.
      </p>
   </>
);

export default Action;
