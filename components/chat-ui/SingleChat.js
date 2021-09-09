import React from 'react';
import PropTypes from 'prop-types';

const SingleChat = ({
  messageObject,
  left,
  timeFormatter,
  AuthUser,
  showLoginModal,
}) => {
  // todo: add timestamp feature and photoURL beside message
  const { message, timestamp, photoURL } = messageObject;
  const upperClass = left
    ? 'single-chat  d-flex justify-content-start mb-2'
    : 'single-chat d-flex justify-content-end mb-2';
  const bodyClass = left
    ? 'bg-secondary text-white p-2 w-50 single-chat-text rounded text-left '
    : 'bg-success text-white  p-2 w-50 single-chat-text rounded text-left';
  // time = timeFormatter(time);

  return (
    <div className={upperClass}>
      {/* <span className={leftSpanClass} hidden={!left}>
        {time}
      </span> */}
      <span className={bodyClass}>{message}</span>

      {/* <span className={rightSpanClass} hidden={left}>
        {time}
      </span> */}
    </div>
  );
};

SingleChat.propTypes = {
  AuthUser: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
    id: PropTypes.string,
    verification: PropTypes.shape({
      status: PropTypes.string,
    }),
  }).isRequired,
  left: PropTypes.bool,
  messageObject: PropTypes.shape({
    message: PropTypes.string,
    photoURL: PropTypes.string,
    timestamp: PropTypes.number,
  }).isRequired,
  showLoginModal: PropTypes.bool,
  timeFormatter: PropTypes.func,
};

SingleChat.defaultProps = {
  left: true,
  showLoginModal: false,
  timeFormatter: (time) => time,
};

export default SingleChat;
