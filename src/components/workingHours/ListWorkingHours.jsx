import React from 'react';
import PropTypes from 'prop-types';

const ListWorkingHour = ({row}) => {
  return (
    <div className="sl-item b-success">
      <div className="sl-icon">
        <i className="fa fa-check"></i>
      </div>
      <div className="sl-content">
        <div> {row.working_hours} Hours</div>
        <div> {row.date} </div>
        <div className="sl-date text-muted">
          Reason : {row.reason}
        </div>
      </div>
    </div>
  );
};

ListWorkingHour.PropTypes = {
  row: PropTypes.shape({
    working_hours: PropTypes.string.isRequired,
    date:          PropTypes.string.isRequired,
    reason:        PropTypes.string.isRequired
  }).isRequired
};

export default ListWorkingHour;
