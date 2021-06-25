import React from 'react'
import { Row, Container, Button, Col } from 'react-bootstrap';
import MobileNav from "../../../components/MobileNav";
const [appointmentState, setAppointmentState] = React.useState('cancelled');
const Cancelled = ({AuthUser, showLoginModal, submitted, error, submit, setState}) => (
  <>
    <Container className='d-flex flex-column justify-content-center align-items-center my-5'>
      <Col className='align-items-center' xs='12' lg='6'>
        <h5 className='pb-2 '>1234 Main Street Owensboro Kentucky</h5>
        <h3 className='text-primary mb-0'><b>Thursday, June 17th, 2012</b></h3>
        <h3 className='text-primary mt-0'>2:00 pm - 3:00pm</h3>
      </Col>
      {submitted ? (
        <Col xs='12' lg='6' className='p-4 border border-secondary'>
          <Row style={{maxWidth: '500px', height: '250px'}} xs='12'>
            <h6>Your have successfully cancelled your appointment.</h6>
          </Row>
              
        </Col>
          ) : (
            <Col xs='12' lg='6' className='p-4 border border-secondary'>
              <Row style={{maxWidth: '500px'}} xs='12'>
                <h6>Are you sure you want to cancel this appointment?</h6>
              </Row>
              <Row style={{maxWidth: '500px', height: '250px'}} xs='12'>
                <h6>Select Reason to cancel</h6>
              </Row>
              <h6 className='text-danger text-bold'>
                {error && `${error}: Please contact our live chat to resolve.`}
              </h6>
              <Row style={{maxWidth: '500px'}} xs='12'>
                <Button onClick={() => submit()} variant="warning  m-2  w-100">Yes, cancel appointment</Button>
                <Button variant='link' onClick={() => setState(false)} className='text-dark text-center w-100'>No, don't cancel</Button>
              </Row>
            </Col>
          )}
         


         
      <Col xs='12' />
    </Container>
  </>
    )

export default Cancelled
