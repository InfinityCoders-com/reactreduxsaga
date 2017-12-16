import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type, label, style, className, onClick}) => {
  let classname = 'btn ' + className;
  return (
    <button type={type} className={classname} style={style} onTouchTap={onClick}>{label}</button>
  );
};

Button.PropTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
