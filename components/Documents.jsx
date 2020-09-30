'use strict';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';
import Document from './Document';

export default ({ documents }) => (
   <>
      <section id='documents' aria-labelledby='documents-heading' className='mb-5'>
         <h4 id='documents-heading' className='mb-4 font-wieght-light text-dark'>
            <FontAwesomeIcon icon={faListAlt} fixedWidth /> Documents
         </h4>
         {documents.length === 0 ? (
            <p className='text-muted p-5'>
               Subscribe to recieve a email/text notifications when documents become available or
               check back shortly.
            </p>
         ) : (
            <ul className='list-unstyled px-3 mb-n3'>
               {documents.map((document, index) => (
                  <Document
                     key={index}
                     name={document.label}
                     href={document.url}
                     description={document.description}
                     mimeType={document.type}
                  />
               ))}
            </ul>
         )}
      </section>
   </>
);
