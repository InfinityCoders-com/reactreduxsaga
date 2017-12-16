import React from 'react';
import PropTypes from 'prop-types';

const ButtonFlat = ({label, style, className, onClick}) => {
  let classname = "md-btn md-flat " + className;
  return (
    <button className={classname} style={style} onTouchTap={onClick}>{label}</button>
  )
}

ButtonFlat.PropTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default ButtonFlat;
