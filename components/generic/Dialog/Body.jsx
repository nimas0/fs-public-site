import React from 'react';
import { Col } from 'react-bootstrap';

const Body = ({ children }) => {
   return (
      <>
         <Col>
            <span data-test='body' className='bodyStyle d-flex align-items-center '>
               <div  className='p-4 w-100 d-flex justify-content-center'>{children}</div>
            </span>
         </Col>
         <style jsx>{`
            .bodyStyle {
               min-height: 50vh;
            }
         `}</style>
      </>
   );
};

export default Body;
