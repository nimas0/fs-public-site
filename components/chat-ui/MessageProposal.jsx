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


   const CardView = ({ title, body, footer, color }) => (
     <>
       <Card
         onClick={handleClick}
         border={color}
         className="bg-light m-2 mt-4 w-100"
         title={friendlyTimestamp}
       >
         <Card.Header>
           <Card.Title className={`d-flex text-center text-${color} my-2 justify-content-center`}>
             {title}
           </Card.Title>
         </Card.Header>
         <Card.Body className="bg-white p-3">
           <div className='timestamp'>{friendlyTimestamp}</div>
           <div className='p-4 text-center d-flex justify-content-center' />
           {body}
    
           <Card.Subtitle className='text-dark d-flex justify-content-center'>
             Click to expand more details
           </Card.Subtitle>
         </Card.Body>


         <Card.Footer className='text-dark d-flex justify-content-between'>
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
             color='success'
             title='You submitted an offer!'
             body={(
               <h3 className='text-primary text-center'>
                 <NumberFormat
                   value={data.proposalAmount}
                   displayType="text"
                   thousandSeparator
                   prefix="$"
                 />
               </h3>)}
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
            return <CardView color="danger" title={`Seller rejected $${data.amount}`} body={<h4 className='text-warning text-center'>Rejected</h4>} footer={<h6>Click to try again</h6>}  />
         case "accepted":
            return <CardView color='primary' title={`Offer accepted $${data.amount}`} body={<h4 className='text-primary text-center'>Accepted</h4>} footer={<h6>Click for next Steps</h6>} />
         default:
            return <CardView title='test' />
      }  
   }


   return (
    renderView()
   );
}


  
