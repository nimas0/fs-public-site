import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ChatInput = ({ iconSend, onMessageSend, displayStop, onMessageStop }) => {
  const textareaRef = React.createRef();
  const [text, setText] = useState('');
  const stopBtnClasses = displayStop
    ? 'btn btn-danger chat-button-stop rounded-0'
    : 'btn btn-danger chat-button-stop hidden';
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

      {/* <div className='bg-white chat-button-wrapper p-3 '>
        <Button
          variant='primary'
          className='mr-1 '
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
        </Button> */}
      {/* <button
          type='button'
          className={stopBtnClasses}
          hidden={displayStop === false}
          onClick={() => onMessageStop()}
          onKeyPress={(e) => {
            if (e.keyCode === 13) {
              onMessageStop();
              setText('');
            }
          }}
        >
          stop
        </button> */}
      {/* </div> */}
    </div>
  );
};

ChatInput.propTypes = {
  iconSend: PropTypes.node,
  onMessageSend: PropTypes.func,
  displayStop: PropTypes.bool,
  onMessageStop: PropTypes.func,
};

ChatInput.defaultProps = {
  onMessageSend: (text) => null,
  onMessageStop: () => null,
  displayStop: true,
};
export default ChatInput;
