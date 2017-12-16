import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ style, classname, htmlfor, text }) => (
  <label style={style} className={classname} htmlFor={htmlfor} >{text}</label>
);

export default Label;

Label.PropTypes = {
  style: PropTypes.string,
  classname: PropTypes.string,
  htmlfor: PropTypes.string,
  text: React.PropTypes.string.isRequired
};
