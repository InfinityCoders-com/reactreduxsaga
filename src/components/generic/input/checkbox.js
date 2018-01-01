import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({className, placeHolder, onchange, id, name, value, style}) => {
  const classname = className ? className + ' checkbox' : 'checkbox';
  return (
    <section className='checkbox'>
      <div className="squaredOne">
        <input type="checkbox" className={classname} onChange={onchange} value={value} id="squaredOne" style={style} name={name} checked={value} required />
        <label htmlFor="squaredOne"></label>
      </div>
    </section>
  );
};

export default Checkbox;

Checkbox.PropTypes = {
  className:   PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  onchange:    PropTypes.func.isRequired,
  id:          PropTypes.number,
  name:        PropTypes.string,
  value:       PropTypes.string,
  style:       PropTypes.string
};
