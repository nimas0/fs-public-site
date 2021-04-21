

import React from 'react';
import { Settings as LuxonSettings, DateTime } from 'luxon';
import clsx from 'clsx';
import ExpandButton from './ExpandButton';
import DateButton from './DateButton';
import useResizeObserver from '../utils/useResizeObserver';

export default ({
   daysDisplayed,
   small,
   alignment = 'center',
   firstDate,
   setFirstDate,
   firstAvailableDate,
   activeDate,
   setActiveDate,
   dayAvailability,
   getTimeAvailability,
   setDateButtonsWidth = null,
   timeZone,
   disableAllDates,
   className,
}) => {
   LuxonSettings.defaultZoneName = timeZone;

   const daysArray = [...Array(daysDisplayed).keys()];

   const { ref: dateButtons } = setDateButtonsWidth
      ? useResizeObserver({
           type: 'offset',
           onResize: ({ width }) => setDateButtonsWidth(width),
        })
      : { ref: null };

   return (
     <div
       className={clsx(
            'd-flex align-items-center mb-2',
            alignment === 'left'
               ? 'justify-content-start'
               : alignment === 'right'
               ? 'justify-content-end'
               : 'justify-content-center',
            className
         )}
     >
       <ExpandButton
         className='schedulingShadow'
         direction='left'
         overlap='right'
         onClick={() => {
               setFirstDate(
                  DateTime.max(firstAvailableDate, firstDate.minus({ days: daysDisplayed }))
               );
            }}
         hidden={firstDate.hasSame(firstAvailableDate, 'day')}
       />

       <div ref={dateButtons} className='mr-n1'>
         {daysArray.map((index) => (
           <DateButton
             key={index}
             date={firstDate.plus({ days: index })}
             disabled={disableAllDates}
             {...{
                     small,
                     dayAvailability,
                     getTimeAvailability,
                     activeDate,
                     setActiveDate,
                  }}
           />
            ))}
       </div>

       <ExpandButton
         className='schedulingShadow'
         direction='right'
         overlap='left'
         onClick={() => {
               setFirstDate(
                  DateTime.min(
                     DateTime.local()
                        .startOf('day')
                        .plus({ months: 1 })
                        .minus({ days: daysDisplayed - 1 }),
                     firstDate.plus({ days: daysDisplayed })
                  )
               );
            }}
         hidden={firstDate.hasSame(
               DateTime.local()
                  .plus({ months: 1 })
                  .minus({ days: daysDisplayed - 1 }),
               'day'
            )}
       />
     </div>
   );
};
