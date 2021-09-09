import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import SingleChat from './SingleChat';
import ProposalMessageWithDrawer from './ProposalMessageWithDrawer.js';
import { useProposal } from '../../utils/hooks/useProposal';

const ChatMessagesGroup = ({
  messages = [],
  agentUser,
  setMessageGroupCounter,
  timeFormatter,
  AuthUser,
  showLoginModal,
}) => {
  // console.log('counter!!!', setMessageGroupCounter);
  const [selected, setSelected] = useState(null);
  const { proposal, loading, error } = useProposal(selected);
  console.log('setMessageGroupCounter', setMessageGroupCounter);
  if (loading) return <p>loading</p>;
  if (error)
    return (
      <div>
        <p>Please contact support.</p>
        <p>{error}</p>
      </div>
    );
  if (Array.isArray(messages)) {
    return (
      <div className='chat-message-list'>
        <Button
          variant='outlined-dark'
          className='w-100 mb-5 text-dark'
          onClick={() => setMessageGroupCounter((prev) => prev + 10)}
        >
          Load More
        </Button>
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
                  proposal={proposal}
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
  AuthUser: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
    id: PropTypes.string,
    verification: PropTypes.shape({
      status: PropTypes.string,
    }),
  }).isRequired,
  agentUser: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  setMessageGroupCounter: PropTypes.func,
  showLoginModal: PropTypes.bool,
  timeFormatter: PropTypes.func,
};

ChatMessagesGroup.defaultProps = {
  messages: [],
  setMessageGroupCounter: 20,
  showLoginModal: false,
  timeFormatter: () => null,
};

export default ChatMessagesGroup;
