/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from 'react-number-format';
import { useRouter } from 'next/router';



export default function MessageProposal(props) {
   const {
      data,
      isMine,
      setSelected
   } = props;
   const router = useRouter();
   const handleClick = () => {
      router.query.proposalId = data.proposalId;
      router.push(router, undefined, { shallow: true })
   }

   // console.log("data", data);
   const friendlyTimestamp = moment(data.timestamp).format('LLLL');


   const CardView = ({ title, body, footer }) => (
     <>
      
       <Card
         onClick={handleClick}
         border='primary'
         className='bg-secondary m-2 mt-4'
         title={friendlyTimestamp}
       >
         <Card.Header>
           <Card.Title className='d-flex text-white justify-content-center'>
             {title}
           </Card.Title>
         </Card.Header>
         <Card.Body className=' bg-white p-3'>
           <div className='timestamp'>{friendlyTimestamp}</div>
           <div className='p-4 d-flex justify-content-center' />
           {body}
    
           <Card.Subtitle className='text-muted d-flex justify-content-center'>
             Click to expand more details
           </Card.Subtitle>
         </Card.Body>


         <Card.Footer className='text-light d-flex justify-content-between'>
           {footer}
         </Card.Footer>
         
       </Card>
     </>
   )
console.log('data', data)
   const renderView = () => {
      if(isMine) { 
         return (
           <CardView
             title='You submitted an offer!'
             body={(
               <h4 className='text-primary'>
                 <NumberFormat
                   value={data.proposalAmount}
                   displayType="text"
                   thousandSeparator
                   prefix="$"
                 />
               </h4>)}
             footer={  
                 ( 
                   <>
                     <div>
                       Deposit
                       {' '}
                       <FontAwesomeIcon
                         className='ml-2'
                         icon={data.proposalDeposit ? faCheck : faTimes}
                       />
                       {' '}
                     </div>
                     <div>
                       Pre-Approved
                       {' '}
                       <FontAwesomeIcon
                         className='ml-2'
                         icon={data.proposalVerified ? faCheck : faTimes}
                       />
                       {' '}
                     </div>
                   </>
                   )
               }
           />
         )
      } 
      switch (data.status) {
         case "rejected":
            return <CardView title={`Seller rejected $${data.amount}`} body={<h4 className='text-warning'>Rejected</h4>} footer={<h6>Click to try again</h6>} />
         case "accepted":
            return <CardView title={`Offer accepted $${data.amount}`} body={<h4 className='text-primary'>Accepted</h4>} footer={<h6>Click for next Steps</h6>} />
         default:
            return <CardView title='test' />
      }  
   }


   return (
    renderView()
   );
}


  
