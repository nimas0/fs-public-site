import React from 'react';
/* eslint react/prop-types: 0 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
   const dots = [];
   for (let i = 1; i <= props.totalSteps; i += 1) {
      const isActive = props.currentStep === i;
      dots.push(
         <FontAwesomeIcon
            key={`step-${i}`}
            onClick={() => props.goToStep(i)}
            size='xs'
            className={`${'dot'} ${isActive ? 'active' : ''}`}
            color={isActive ? 'green' : 'grey'}
            icon={faCircle}
            fixedWidth
         />
      );
   }

   return (
      <>
         <div className='nav' style={{ padding: 0, display: 'block' }}>
            <h6 className='text-secondary' display='block'>
               {props.titles[props.currentStep]}
            </h6>
            {dots}
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
