import React from 'react';
/* eslint react/prop-types: 0 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
import { Row } from 'react-bootstrap';

const Nav = (props) => {
   const dots = [];
   for (let i = 1; i <= props.totalSteps; i += 1) {
      const isActive = props.currentStep === i;
      dots.push(
         <FontAwesomeIcon
            key={`step-${i}`}
            onClick={() => props.goToStep(i)}
            size='xs'
            className={`${'dot'} ${isActive ? 'active mr-3' : 'mr-3'}`}
            color={isActive ? 'green' : 'lightGrey'}
            icon={faSquare}
            fixedWidth
         />
      );
   }

   return (
      <>
         <div className='nav' style={{ padding: 0, display: 'block' }}>
         
            <h2 className='text-secondary text-left mb-5'>
               {props.titles[props.currentStep]}
            </h2>
            <div className='d-flex justify-content-start'>
         {dots}
            </div>
           
         </div>
         <style jsx>{`
            .nav {
               padding: 0;
               margin-bottom: 0.2em;
               text-align: right;
            }
            .active svg path {
               background: green;
               opacity: 1;
               text-shadow: 0 0px 8px;
            }
            .dot {
               background-color: grey;
               cursor: pointer;
               line-height: 1;
               margin: 0 15px;
               opacity: 0.4;
               text-shadow: none;
               transition: opacity 1s ease, text-shadow 1s ease;
            }
         `}</style>
      </>
   );
};

export default Nav;
