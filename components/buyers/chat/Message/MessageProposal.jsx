import React from 'react';
import moment from 'moment';
import './Message.css';
import { Card, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import NumberFormat from 'react-number-format';

export default function MessageProposal(props) {
   const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      handleToggleSidebar,
      proposalId
   } = props;


   const friendlyTimestamp = moment(data.timestamp).format('LLLL');
   return (
      <div
         className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${endsSequence ? 'end' : ''}`,
         ].join(' ')}>
         {showTimestamp && <div className='timestamp'>{friendlyTimestamp}</div>}

         <div className='bubble-container'>
            <Card
               onClick={() => handleToggleSidebar(proposalId)}
               border='primary'
               className='bubble proposal  defaultCard  p-2 mt-4'
               style={{ width: '18rem' }}
               title={friendlyTimestamp}>
               <Card.Header>
                  <Card.Title className='d-flex text-light justify-content-center'>
                     {isMine ? 'You submitted an offer!' : data.status === 'rejected' ? `Seller rejected $${data.amount}` : `Offer accepted $${data.amount}`}
                  </Card.Title>
               </Card.Header>
               <Card.Body className=' p-3'>
                  <Card.Text className='p-4 d-flex justify-content-center'>
                     <h4 className='text-primary'>
                        <strong>
                           {
                                 (!data.status) 
                                    ?
                              <NumberFormat
                                 value={data.proposalAmount}
                                 displayType={'text'}
                                 thousandSeparator={true}
                                 prefix={'$'}
                              />
                              :
                                 data.status === 'rejected' ?
                                       <h4 className='text-warning'>Rejected</h4>
                                    :
                                       <h4 className='text-primary'>Accepted</h4>
                           }
                        </strong>
                     </h4>
                  </Card.Text>
                  <Card.Subtitle className='text-muted d-flex justify-content-center'>
                     Click to expand more details
                  </Card.Subtitle>
               </Card.Body>
               {isMine && (

                  <Card.Footer className='text-light d-flex justify-content-between'>
                  <div>
                     Deposit{' '}
                     <FontAwesomeIcon
                        className='ml-2'
                        icon={data.proposalDeposit ? faCheck : faTimes}
                        />{' '}
                  </div>
                  <div>
                     Pre-Approved{' '}
                     <FontAwesomeIcon
                        className='ml-2'
                        icon={data.proposalVerified ? faCheck : faTimes}
                        />{' '}
                  </div>
               </Card.Footer>
                  )}
            </Card>
            {/* {data.message} */}
         </div>
      </div>
   );
}
