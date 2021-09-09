import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatMessagesGroup from './ChatMessageGroup';

class ChatComponent extends Component {
  componentRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const prevMsgs = prevProps.messages;
    // eslint-disable-next-line react/destructuring-assignment
    const msgs = this.props.messages;
    // todo: find better solution
    // hacky solution to correct scroll behavior
    // this is a work around to make database connection hook work
    if (
      Array.isArray(prevMsgs) &&
      Array.isArray(msgs) &&
      msgs.length !== prevMsgs.length
    ) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.componentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  onMessageSend = (text) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onMessageSend(text);
    this.scrollToBottom();
  };

  render() {
    const {
      AuthUser,
      messages,
      agentUser,
      iconSend,
      setMessageGroupCounter,
      timeFormatter,
      showLoginModal,
    } = this.props;

    return (
      <>
        <div className='chat-component'>
          <div className='container chat-messages-container row'>
            <ChatMessagesGroup
              left
              setMessageGroupCounter={setMessageGroupCounter}
              showLoginModal={showLoginModal}
              AuthUser={AuthUser}
              messages={messages}
              agentUser={agentUser}
              timeFormatter={timeFormatter}
            />
          </div>
          <div style={{ float: 'left', clear: 'both' }}>
            <div ref={this.componentRef} />
            {/* allows us to scroll back down page */}
          </div>
        </div>
        <div>
          <div className='row'>
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
  messages: PropTypes.arrayOf(PropTypes.object),
  agentUser: PropTypes.string.isRequired,
  timeFormatter: PropTypes.func,
  iconSend: PropTypes.node,
  onMessageSend: PropTypes.func,
};

ChatComponent.defaultProps = {
  onMessageSend: () => null,
  timeFormatter: (time) => time,
  messages: [],
  iconSend: null,
};
export default ChatComponent;
