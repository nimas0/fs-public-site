import React from 'react';
import { Table, Row, Container, Col } from 'react-bootstrap';
const Details = ({ quickFacts }) => {
   // TODO: improve experience so when data is uploaded page doesnt change to action tab

   return (
      <Container>
         <Row className='pb-4'>
            <Col>
               <h4>{quickFacts.currentPrice}</h4>
            </Col>
         </Row>
         <Row className='d-flex justify-content-between'>
            <Col className=''>
               <h6>
                  <b>Beds: </b>
                  {quickFacts.bedrooms}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Bath: </b>
                  {quickFacts.fullBaths + quickFacts.halfBaths}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Sq/ft: </b>
                  {quickFacts.totalFinishedSqFt}
               </h6>
            </Col>
         </Row>
         {/* <Row className='d-flex justify-content-between'>
            <Col className=''>
               <h6>
                  <b>Built: </b>
                  {quickFacts.built}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Acreage: </b>
                  {quickFacts.acreage}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Floors: </b>
                  {quickFacts.floors}
               </h6>
            </Col>
         </Row>
         <Row className='d-flex justify-content-between'>
            <Col className=''>
               <h6>
                  <b>Master: </b>
                  {quickFacts.master ? 'Yes' : 'No'}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Dishwasher: </b>
                  {quickFacts.dishwasher ? 'Yes' : 'No'}
               </h6>
            </Col>
            <Col className=''>
               <h6>
                  <b>Fireplace: </b>
                  {quickFacts.fireplace ? 'Yes' : 'No'}
               </h6>
            </Col>
         </Row> */}
      </Container>
   );
};

export default Details;
