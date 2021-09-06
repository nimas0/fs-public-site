import React from 'react';
import PropTypes from 'prop-types';
import SingleChat from './SingleChat';

const ChatMessagesGroup = ({ messages = [], agentUser, timeFormatter }) => {
  console.log('ChatMessageGroup', messages);
  if (Array.isArray(messages)) {
    return (
      <div className='chat-message-list'>
        {messages.map((d, i) => (
          <SingleChat
            messageObject={d}
            left={d.author !== agentUser}
            timeFormatter={timeFormatter}
          />
        ))}
      </div>
    );
  }
  return null;
};

ChatMessagesGroup.propTypes = {
  messages: PropTypes.array,
  agentUser: PropTypes.any,
  timeFormatter: PropTypes.func,
};

export default ChatMessagesGroup;
