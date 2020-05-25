import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../utils/helpers';

const QuickFacts = ({ quickFacts }) => {
   return (
      <Row className='d-flex justify-content-between px-4 text-center'>
         {quickFacts &&
            Object.keys(quickFacts).map((key) => {
                // filter out listprice from array
               if (key !== 'listPrice')
                // render based on string or boolean
                  if (typeof quickFacts[key] === 'boolean') {
                     return (
                        <Col key={key} xs={4}>
                           <h6>
                              <b>{capitalizeFirstLetter(key)}: </b>
                              {quickFacts[key] ? 'Yes' : 'No'}
                           </h6>
                        </Col>
                     );
                  } else {
                     return (
                        <Col key={key} xs={4}>
                           <h6>
                              <b>{capitalizeFirstLetter(key)}: </b>
                              {quickFacts[key]}
                           </h6>
                        </Col>
                     );
                  }
            })}
      </Row>
   );
};

export default QuickFacts;
