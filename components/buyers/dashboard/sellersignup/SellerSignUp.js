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

        <Card className='border-0  schedulingShadow bg-transparent w-100 mt-3'>
            {/* <Card.Header className='py-4 bg-transparent border-0 text-muted' as='h5'>
                  Pre-Approval
               </Card.Header> */}
            <Card.Body className='text-center py-4'>
                <div className='text-success d-flex justify-content-between px-1 pt-2 '>
                    <h5 className='ml-3 text-success '>Sell your home for free</h5>
                    <h4 id='documents-heading' className=' font-wieght-light text-dark'>
                        <FontAwesomeIcon icon={faChevronRight} color='green' />
                    </h4>
                </div>

                {/* <Card.Text>
                    <h6 className=' text-dark text-left px-4 pt-0 mt-0 pt-2'>
                        Scheduling has been unlocked. You will be notified of your approval within 3
                        hours of submittion.
                     </h6>
                </Card.Text> */}
            </Card.Body>
        </Card>

    );

}


export default SellerSignUp;
