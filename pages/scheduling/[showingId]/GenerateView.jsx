import React from 'react'
import { Row, Container, Button, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from 'next/router'

const GenerateView = ({
    sending,
    setSending,
    success, 
    error, 
    setSuccess, 
    handleCancelSubmit, 
    setReason,
    reason,
    startDate,
    AuthUser,
    listing,
    showLoginModal,
    photoURL
}) => {
    const [state, setState] = React.useState(false);
    const router = useRouter()

console.log(startDate)

   
       return (
         <>
           {success ? (
             <Col xs='12' lg='6' className='p-4 border border-secondary'>
               <Row style={{maxWidth: '500px', height: '250px'}} xs='12'>
                 <h6>Your have successfully cancelled your appointment. Redirecting you to the home..</h6>
               </Row>
                 
             </Col>
             ) : (
               <Col xs='12' lg='6' className='p-4 border border-secondary'>
                 <Row style={{maxWidth: '500px'}} xs='12'>
                   <h6>Are you sure you want to cancel this appointment?</h6>
                 </Row>
                 <Row className='d-flex align-content-center align-item-center justify-content-center' style={{maxWidth: '500px', height: '250px'}}>
                   <Col className='justify-content-center align-content-center' xs={12}>
                     <Dropdown className='text-center' drop='up' menuAlign=''>
                       <Dropdown.Toggle variant="success" id="dropdown-basic">
                         Select Reason
                       </Dropdown.Toggle>

                       <Dropdown.Menu>
                         <Dropdown.Item onClick={() => setReason('Had something come up')}>Had something come up</Dropdown.Item>
                         <Dropdown.Item onClick={() => setReason('Im no longer interested in the home')}>I'm no longer interested in the home</Dropdown.Item>
                         <Dropdown.Item onClick={() => setReason('I purchased another home.')}>I purchased another home.</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                     <p className='p-3 d-block text-center'>
                       {reason && reason}
                     </p>
                   </Col>
              
                 </Row>
                
                 <h6 className='text-danger text-bold'>
                   {error && `${error}: Please contact our live chat to resolve.`}
                 </h6>
                 <Row style={{maxWidth: '500px'}} xs='12'>
                   <Button onClick={() => handleCancelSubmit()} variant="warning  m-2  w-100">Yes, cancel appointment</Button>
                   <Button variant='link' onClick={() => router.back()} className='text-dark text-center w-100'>No, don't cancel</Button>
                 </Row>
               </Col>
             )}   
           <Col xs='12' />
        
         </>
         )
    
   
 }
export default GenerateView
