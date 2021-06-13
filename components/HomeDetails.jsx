

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { capitalize, startCase } from 'lodash';

export default ({ details, features }) => {
   const [expanded, setExpanded] = useState(false);
   const toggleExpanded = () => {
      setExpanded(!expanded);
   };


   const featuresArray = [];
   for (const property in features) {
      if (features[property]) {
         featuresArray.push({ label: property, list: features[property] });
      }
   }

   return (
     <section id='details' aria-labelledby='details-heading' className='mb-5'>
       <h4 id='details-heading' className='mb-4'>
         <FontAwesomeIcon icon={faListAlt} fixedWidth />
         {' '}
         Home Details
       </h4>

       <ul id='home-details' className='pr-3 mb-0  font-weight-light'>
         {details.slice(0, expanded ? details.length : 14).map((detail, index) => (
           <li key={`d${index}`}>
             <b>
               {startCase(detail.label)}
               :
             </b> 
             {' '}
             {startCase(detail.value)}
           </li>
            ))}
         {featuresArray
               .slice(0, expanded ? featuresArray.length : Math.max(0, 14 - details.length))
               .map((feature, index) => (
                 <li className='font-weight-bold' key={`f${index}`}>
                   <b>
                     {(startCase(feature.label))}
                     :
                   </b> 
                   {' '}
                   {startCase(feature.list)}
                 </li>
               ))}
       </ul>

       <div className='text-center'>
         <Button variant='white' className='text-primary' onClick={toggleExpanded}>
           See 
           {' '}
           {expanded ? 'less' : 'more'}
           <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className='ml-1' />
         </Button>
       </div>
     </section>
   );
};
