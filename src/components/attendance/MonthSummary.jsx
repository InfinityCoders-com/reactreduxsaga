import React from 'react';
import PropTypes from 'prop-types';
import DayReference from './DayReference';
import TimeSummary from './TimeSummary';

const MonthSummary = ({monthlyAttendance}) => {
  return (
    <div>
      <TimeSummary monthlyAttendance={monthlyAttendance} />
      <DayReference monthlyAttendance={monthlyAttendance} />
    </div>
  );
};

MonthSummary.PropTypes = {
  monthlyAttendance: PropTypes.object.isRequired
};

export default MonthSummary;
