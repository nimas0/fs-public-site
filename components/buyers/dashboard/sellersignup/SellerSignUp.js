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

        <Card className='border-0 bg-transparent w-100 my-3'>
            <Card.Body as={Button} variant='link' className='py-3'>
                <div className=' d-flex justify-content-between px-0 pt-2'>
                    <h5 className='ml-0 text-primary '>Sell Your Home for Free</h5>
                    <h5 id='documents-heading'>
                        <FontAwesomeIcon icon={faChevronRight} color='green' />
                    </h5>
                </div>
            </Card.Body>
        </Card>

    );

}


export default SellerSignUp;
