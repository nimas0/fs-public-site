import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleChat from './SingleChat';
import ProposalMessageWithDrawer from './ProposalMessageWithDrawer.js';

const ChatMessagesGroup = ({
  messages = [],
  agentUser,
  timeFormatter,
  AuthUser,
  showLoginModal,
}) => {
  const [selected, setSelected] = useState(null);

  if (Array.isArray(messages)) {
    return (
      <div className='chat-message-list'>
        {messages.map((d, i) => {
          // console.log('d', d);
          if (Object.keys(d).find((element) => element === 'proposalId')) {
            return (
              <div
                className={
                  d.author === agentUser
                    ? 'single-chat w-100  d-flex justify-content-end mb-5'
                    : 'single-chat w-100 d-flex justify-content-start mb-2'
                }
              >
                <ProposalMessageWithDrawer
                  key={selected}
                  AuthUser={AuthUser}
                  isMine={d.author === agentUser}
                  messageData={d}
                  setSelected={setSelected}
                />
              </div>
            );
          }
          return (
            <SingleChat
              messageObject={d}
              left={d.author !== agentUser}
              timeFormatter={timeFormatter}
              AuthUser={AuthUser}
            />
          );
        })}
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
