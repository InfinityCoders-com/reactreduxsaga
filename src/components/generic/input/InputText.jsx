import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ className, ref, placeHolder, onchange, id, name, value, style }) => {
  let classname = 'form-control ' + className;
  return (
    <input
      type="text"
      className={classname}
      ref={ref}
      placeholder={placeHolder}
      onChange={onchange}
      id={id} required
      name={name}
      value={value}
      style={style}
    />
  );
};

export default InputText;

InputText.PropTypes = {
  className: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string
};
