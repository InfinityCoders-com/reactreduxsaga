import React from 'react';
import PropTypes from 'prop-types';

const DaySection = ({block, classname, dataToDisplay, time, title}) => {
  let content = '';
  if (block === 'type1') {
    content = <span>
      <span className="fc-time">{time}</span>
      <span className="fc-title">{title}</span>
    </span>;
  } else if (block === 'type2') {
    content = dataToDisplay;
  }
  return (
    <div className={classname}>
      <div className="fc-content">
        {content}
      </div>
    </div>
  );
};

DaySection.PropTypes = {
  block: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  dataToDisplay: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DaySection;
