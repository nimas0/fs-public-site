import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const Approval = () => {
   return (
      <span className='mx-4'>
         <Row>
            <Col>
               <Card className='shadow'>
                  <Card.Header className='py-4 text-muted' as='h5'>
                     Pre-Approval
                  </Card.Header>
                  <Card.Body className='text-center py-5'>
                     <Button variant='primary' className='mb-3 px-5'>
                        Upload
                     </Button>
                     <Card.Text>
                        <small>
                           <i>*required to view properties through findingSpaces</i>
                        </small>
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </span>
   );
};

export default Approval;
