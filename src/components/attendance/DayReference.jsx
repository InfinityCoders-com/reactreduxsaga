import React from 'react';
import PropTypes from 'prop-types';
// col-xs-4 col-sm-3 col-md-2 col-lg-1
const DayReference = ({monthlyAttendance}) => {
  return (
    <div className="box">
      <div className="box-header">
        <h3>Day Reference</h3>
        <small></small>
      </div>
      <div className="box-body">
        <div className="row no-gutter m-b text-xs l-h-1x">
          <div className="col-xs-2 day-color-referance">
            <div className="p-a white">
              <h4>{monthlyAttendance.monthSummary.WORKING_DAY}</h4>
              <div className="h-3x text-u-c _600 text-sm">Working Day</div>
            </div>
          </div>

          <div className="col-xs-2 day-color-referance">
            <div className="p-a yellow">
              <h4>{monthlyAttendance.monthSummary.NON_WORKING_DAY}</h4>
              <div className="h-3x text-u-c _600 text-sm"> Non Working Day</div>

            </div>
          </div>

          <div className="col-xs-2 day-color-referance">
            <div className="p-a red">
              <h4>{monthlyAttendance.monthSummary.LEAVE_DAY}</h4>
              <div className="h-3x text-u-c _600 text-sm">Leave Day</div>
            </div>
          </div>

          <div className="col-xs-2 day-color-referance">
            <div className="p-a red-100">
              <h4>{monthlyAttendance.monthSummary.HALF_DAY}</h4>
              <div className="h-3x text-u-c _600 text-sm">Half Day</div>
            </div>
          </div>

          <div className="col-xs-2 day-color-referance">
            <div className="p-a indigo">
              <h4>*</h4>
              <div className="h-3x text-u-c _600 text-sm">Admin Alert</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DayReference.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    monthSummary: PropTypes.object.isRequired
  }).isRequired
};

export default DayReference;
