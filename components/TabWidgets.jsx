'use strict';

import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default () => {
   const [expanded, setExpanded] = useState(null);
   const toggle = (eventKey) => {
      if (expanded === eventKey) {
         setExpanded(null);
      } else {
         setExpanded(eventKey);
      }
   };

   return (
      <Accordion
         style={{
            borderLeftStyle: 'solid',
            borderLeftSize: '11px',
            borderColor: '#263238',
            width: '100%',
         }}
         className='mb-5 '>
         {/* Monthly Payment Calculator */}
         <Card
            as={Button}
            style={{ backgroundColor: '#EDEDED', width: '100%', boxShadow: 'none' }}
            className='border-0 d-flex justify-content-between mb-1'>
            <Accordion.Toggle
               eventKey={0}
               as={Card.Header}
               className='bg-transparent  border-0 d-flex'
               style={{ width: '100%' }}
               onClick={() => {
                  toggle(0);
               }}
               aria-label={(expanded === 0 ? 'Hide' : 'Show') + " today's mortgage rates"}>
               <h3 className='d-flex justify-content-start h5 flex-grow-1  mb-0'>
                  Monthly Payment Calculator
               </h3>

               <FontAwesomeIcon
                  className='text-primary '
                  icon={expanded === 0 ? faChevronUp : faChevronDown}
               />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={0}>
               <Card.Body>Insert React component here</Card.Body>
            </Accordion.Collapse>
         </Card>

         {/* Today's Mortgage Rates */}
         <Card
            style={{ backgroundColor: '#EDEDED', width: '100%', boxShadow: 'none' }}
            as={Button}
            className='border-0  mb-1'>
            <Accordion.Toggle
               eventKey={1}
               style={{ width: '100%' }}
               as={Card.Header}
               className='bg-transparent border-0 d-flex align-items-center position-relative'
               onClick={() => {
                  toggle(1);
               }}
               aria-label={(expanded === 1 ? 'Hide' : 'Show') + " today's mortgage rates"}>
               <h3 className='d-flex justify-content-start h5 flex-grow-1 mb-0'>
                  Today's Mortgage Rates
               </h3>

               <FontAwesomeIcon
                  className='text-primary'
                  icon={expanded === 1 ? faChevronUp : faChevronDown}
               />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={1}>
               <Card.Body>Insert React component here</Card.Body>
            </Accordion.Collapse>
         </Card>

         {/* Nearby Schools */}
         <Card
            style={{ backgroundColor: '#EDEDED', width: '100%', boxShadow: 'none' }}
            as={Button}
            className='border-0  mb-1'>
            <Accordion.Toggle
               eventKey={2}
               as={Card.Header}
               style={{ width: '100%' }}
               className='bg-transparent border-0 d-flex align-items-center position-relative'
               onClick={() => {
                  toggle(2);
               }}
               aria-label={(expanded === 2 ? 'Hide' : 'Show') + ' nearby schools'}>
               <h3 className='d-flex justify-content-start h5 flex-grow-1 mb-0'>Nearby Schools</h3>

               <FontAwesomeIcon
                  className='text-primary'
                  icon={expanded === 2 ? faChevronUp : faChevronDown}
               />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={2}>
               <Card.Body>Insert React component here</Card.Body>
            </Accordion.Collapse>
         </Card>
      </Accordion>
   );
};
