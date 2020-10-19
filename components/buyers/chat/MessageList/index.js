import React, { useEffect, useState, useRef } from 'react';
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useListVals } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseInit from '../../../../utils/firebaseInit';
import './MessageList.css';
import MessageProposal from '../Message/MessageProposal';


// Initialize Firebase app
firebaseInit();


export default function MessageList({ messagesEndRef, ...props }) {
  const router = useRouter();
  const interestId = router.query.interestId;



  // interest id includes embed buyer id after '_' underscore
  const MY_USER_ID = interestId.split('_')[1];
  // console.log(MY_USER_ID)

  let messages = [];



  const scrollToBottom = () => {

    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };






  const [value, loading, error] = useListVals(firebase.database().ref(`interest_chat/${interestId}`));

  if (!loading && value) {
    messages = [...value]
  }

  useEffect((messagesEndRef) => {
    scrollToBottom(messagesEndRef)
    console.log('falsdfj')

  }, [loading])

  const getMessages = () => {
    var tempMessages = []
    setMessages([...messages, ...tempMessages])
  }



  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isProposal = messages[i].proposalId && messages[i].proposalId
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }




      if (isProposal) {
        const proposalId = current.proposalId;
        // console.log(current.proposalId)
        tempMessages.push(
          <MessageProposal
            handleToggleSidebar={props.handleToggleSidebar}
            data={current}
            proposalId={proposalId}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
          />
        )
      } else {
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            messagesEndRef={messagesEndRef}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
      }



      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className="message-list">


      <div className="message-list-container">{renderMessages()}
        <div ref={messagesEndRef} />
      </div>


    </div>
  );
}