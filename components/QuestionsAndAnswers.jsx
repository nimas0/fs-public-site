'use strict';

import React, { useState, createElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Question from './Question';
import NewQuestionModal from './NewQuestionModal';

export default ({ as, questions, limit, AuthUser }) => {
   const router = useRouter();

   const [modalShown, setModalShown] = useState(false);
   const showModal = () => {
      setModalShown(true);
   };
   const hideModal = () => {
      setModalShown(false);
   };

   return createElement(
      as || 'div',
      {
         id: 'questions-and-answers',
         className: 'mb-5',
         'aria-labelledby': 'questions-and-answers-heading',
      },
      <>
         {createElement(
            as === 'main' ? 'h3' : 'h4',
            { id: 'questions-and-answers-heading', className: 'mb-4 text-uppercase font-weight-light p-3' },
            <>Questions &amp; Answers</>
         )}

         <div className='px-3'>
            <ul className={clsx('list-unstyled', limit && 'mb-n3')}>
               {questions.slice(0, limit || questions.length).map((question, index) => (
                  <Question key={index} question={question.question} answer={question.response} />
               ))}
            </ul>

            {limit && (
               <div className='text-right mr-3 mb-3'>
                  <Link
                     href='/listing/[listingId]/questions'
                     as={`/listing/${router.query.listingId}/questions`}>
                     <a>See all questions ({questions.length})</a>
                  </Link>
               </div>
            )}

            <Button
               variant='primary'
               size='lg'
               block
               onClick={showModal}
               aria-describedby='question-help'
               className='mb-1 text-uppercase'>
               Ask a question
            </Button>
            <div
               id='question-help'
               className='text-center text-muted'
               style={{ fontSize: '0.8em' }}>
               *Homeowner reserves the right to make questions public or private.
            </div>
         </div>

         <NewQuestionModal shown={modalShown} hide={hideModal} AuthUser={AuthUser} />
      </>
   );
};
