import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ChatInput = ({ onMessageSend }) => {
  const textareaRef = React.createRef();
  const [text, setText] = useState('');

  return (
    <div className='input-group chat-input-wrapper p-3 pt-4 pb-4 d-flex justify-content-end'>
      <textarea
        ref={textareaRef}
        className='chat-input form-control border-primary '
        aria-label='textarea message value'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        variant='primary'
        className='mr-1 rounded-0 '
        onClick={() => {
          onMessageSend(text);
          setText('');
          textareaRef.current.focus();
        }}
        onKeyPress={(e) => {
          if (e.keyCode === 13) {
            onMessageSend(text);
            setText('');
            textareaRef.current.focus();
          }
        }}
      >
        Send
      </Button>
    </div>
  );
};

ChatInput.propTypes = {
  onMessageSend: PropTypes.func,
};

ChatInput.defaultProps = {
  onMessageSend: () => null,
};

export default ChatInput;
