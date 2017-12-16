import React from 'react';
import PropTypes from 'prop-types';

const TimeSummary = ({monthlyAttendance}) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-4 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r">
            <span className="w-48 rounded  accent">
              <i className="material-icons"></i>
            </span>
          </div>
          <div className="clear">
            <h4 className="m-a-0 text-lg _300">
              {monthlyAttendance.monthSummary.actual_working_hours}
              <span className="text-sm"> </span>
            </h4>
            <small className="text-muted"> Total Working Hours</small>
          </div>
        </div>
      </div>
      <div className="col-xs-6 col-sm-4 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r">
            <span className="w-48 rounded primary">
              <i className="material-icons"></i>
            </span>
          </div>
          <div className="clear">
            <h4 className="m-a-0 text-lg _300">
            {monthlyAttendance.monthSummary.completed_working_hours} <span className="text-sm"></span></h4>
            <small className="text-muted">Completed</small>
          </div>
        </div>
      </div>
      <div className="col-xs-6 col-sm-4 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r">
            <span className="w-48 rounded warn">
              <i className="material-icons"></i>
            </span>
          </div>
          <div className="clear">
            <h4 className="m-a-0 text-lg _300">
              {monthlyAttendance.monthSummary.pending_working_hours}
              <span className="text-sm"></span>
            </h4>
            <small className="text-muted">Pending</small>
          </div>
        </div>
      </div>
    </div>
  );
};

TimeSummary.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    monthSummary: PropTypes.object.isRequired
  }).isRequired
};

export default TimeSummary;
