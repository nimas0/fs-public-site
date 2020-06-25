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
   },
}) => {
   const router = useRouter();
   const [modalShow, setModalShow] = React.useState(false);

   return (
      <>
         <Row className='pb-1 px-1'>
            <InformationBar />
         </Row>
         <Row>
            <Col>
               <Image height='150' src={listingMainPhotoUrl} />
            </Col>
            <Col>
               <Button
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
               </Button>
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
                  className='mb-1'
                  block>
                  Chat with Seller
               </Button>

               <Button
                  size='sm'
                  onClick={() =>
                     status === 'pending' || 'approved' ? router.push('/buyer/offer/123') : setModalShow(true)
                  } // TODO: route to submit offer page
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1'
                  block>
                  Propose Offer
               </Button>
               <Button
                  onClick={() =>
                     status === 'pending' || 'approved' ? router.push('/buyer/interest') : setModalShow(true)
                  } //TODO: route to request showing modal
                  size='sm'
                  variant={status === 'pending' || 'approved' ? 'primary' : 'secondary'}
                  className='mb-1 '
                  block>
                  Request Showing
               </Button>
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
