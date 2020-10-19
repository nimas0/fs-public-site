'use strict';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const Widget = ({ handleClick, label, icon, title, isSubscribed }) => (
   <>
      <Button
         style={{
            backgroundColor: 'green',
            '&:hover': {
               backgroundColor: '#fffff',
            },
            boxShadow: ' 0px 0px 0px ',
         }}
         onClick={handleClick}
         className='text-info bg-transparent'
         title={title}>
         <div className='h1-icon'>
            <FontAwesomeIcon size='xs' color={isSubscribed ? 'green' : ''} icon={icon} />
         </div>
      </Button>
      {label && <div style={{ fontSize: '80%' }}>{label}</div>}
   </>
);

export default Widget;
