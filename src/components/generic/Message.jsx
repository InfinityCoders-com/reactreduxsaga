import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  errorAlert: {
    "width": "100%",
    "display":"none",
  },
}

const Message = ({message, style, className, onClick}) => {
  let classname = "alert " + (className || 'hidden');
  return (
    <div className={classname} style={style}>
      <a href="#" className="close" onClick={onClick} aria-label="close">&times;</a>
      <span>{message}</span>
    </div>
  )
}

Message.PropTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default Message;
