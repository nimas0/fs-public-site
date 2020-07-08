import React from 'react';
import MessageList from '../MessageList';
import './Messenger.css';
import Compose from '../Compose';



export default function Messenger({ AuthUserInfo, handleToggleSidebar }) {
  return (
    <div className="messenger">
      <div className="scrollable content">
        <MessageList handleToggleSidebar={handleToggleSidebar}/>
      </div>
      <Compose auth={AuthUserInfo} />
    </div>
  );
}