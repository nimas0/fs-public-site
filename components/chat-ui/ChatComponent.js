import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatMessagesGroup from './ChatMessageGroup';

class ChatComponent extends Component {
  componentRef = React.createRef();

  onMessageSend = (text) => {
    this.props.onMessageSend(text);
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.componentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const prevMsgs = prevProps.messages;
    const msgs = this.props.messages;
    if (
      Array.isArray(prevMsgs) &&
      Array.isArray(msgs) &&
      msgs.length !== prevMsgs.length
    ) {
      this.scrollToBottom();
    }
  }

  render() {
    const {
      AuthUser,
      messages,
      agentUser,
      iconSend,
      displayStop,
      onMessageStop,
      timeFormatter,
      showLoginModal,
    } = this.props;
    return (
      <>
        <div className='chat-component'>
          <div className='container chat-messages-container row'>
            <ChatMessagesGroup
              left
              showLoginModal={showLoginModal}
              AuthUser={AuthUser}
              messages={messages}
              agentUser={agentUser}
              timeFormatter={timeFormatter}
            />
          </div>
          <div style={{ float: 'left', clear: 'both' }}>
            <div ref={this.componentRef} />
          </div>
        </div>
        <div>
          <div className='row '>
            <div className='col chat-component-bottom'>
              <ChatInput
                iconSend={iconSend}
                onMessageSend={(text) => this.onMessageSend(text)}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
ChatComponent.propTypes = {
  messages: PropTypes.array,
  agentUser: PropTypes.any,
  timeFormatter: PropTypes.func,
  iconSend: PropTypes.node,
  onMessageSend: PropTypes.func,
  displayStop: PropTypes.bool,
  onMessageStop: PropTypes.func,
};

ChatComponent.defaultProps = {
  onMessageSend: (text) => null,
  onMessageStop: () => null,
  displayStop: true,
  timeFormatter: (time) => time,
};
export default ChatComponent;
