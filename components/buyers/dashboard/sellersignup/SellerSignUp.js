import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faListAlt } from '@fortawesome/free-solid-svg-icons';

const SellerSignUp = () => {
    const router = useRouter();

    const [uiState, resetState] = useState();

    const uploadPageRedirect = () => {
        router.push(
            `/buyer/pre-approval?upload=${AuthUser.id}`,
            `/buyer/pre-approval/${AuthUser.id}`
        );
    };

    return (

        // <Card style={{ cursor: 'pointer' }} onClick={() => router.push('/learnmore')} className='border-0   bg-transparent w-100 '>
        //     {/* <Card.Header className='py-4 bg-transparent border-0 text-muted' as='h5'>
        //           Pre-Approval
        //        </Card.Header> */}
        //     <Card.Body className='text-center py-4'>


        //         {/* <Card.Text>
        //             <h6 className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
        //                 Scheduling has been unlocked. You will be notified of your approval within 3
        //                 hours of submittion.
        //              </h6>
        //         </Card.Text> */}
        //     </Card.Body>
        // </Card>

        <Button variant='white' style={{ borderStyle: 'solid', borderRadius: 11 }} block size="lg"  className='pt-3 pb-2 text-primary bg-white buttonShadow  border-rounded  '>

            <h6 className='text-primary'>Learn How To Sell Your Home for Free</h6>
            {/* <b><FontAwesomeIcon icon={faChevronRight} color='green' /></b> */}

        </Button>

    );

}


export default SellerSignUp;
