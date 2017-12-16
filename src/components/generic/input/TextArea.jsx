import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ className, placeHolder, onchange, id, name, value, style }) => {
  let classname = 'form-control ' + className;
  return (
    <textarea
      className={classname}
      placeholder={placeHolder}
      onChange={onchange} id={id} required
      value={value}
      name={name}
      style={style}
    />
  );
};

export default Textarea;

Textarea.PropTypes = {
  classname: PropTypes.string,
  placeHolder: PropTypes.string,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string
};
