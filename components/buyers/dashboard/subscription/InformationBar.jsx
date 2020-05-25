import React from 'react';
import { Alert } from 'react-bootstrap';

const NoticationBar = () => {
   return (
      <Alert
         className='rounded-0 border-0 w-100 d-flex justify-content-start'
         variant='light text-dark'>
         <b>Scheduled:&nbsp;&nbsp;2:00 pm June 15th 2020</b>
      </Alert>
   );
};

export default NoticationBar;
