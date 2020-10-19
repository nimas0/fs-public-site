import React from 'react';
import MessageList from '../MessageList';
import './Messenger.css';
import Compose from '../Compose';



export default function Messenger({ messagesEndRef, AuthUserInfo, handleToggleSidebar, proposalData, activeProposal, setProposalData }) {
  return (
    <div className="messenger">
      <div className="scrollable content">
        <MessageList messagesEndRef={messagesEndRef} activeProposal={activeProposal} proposalData={proposalData} handleToggleSidebar={handleToggleSidebar} />
      </div>
      <Compose messagesEndRef={messagesEndRef} setProposalData={setProposalData} auth={AuthUserInfo} />
    </div>
  );
}