import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import CalendarWeek from './CalendarWeek';

const CalendarStructure = ({userId, month, onShowDaySummary, onWorkingHoursChange}) => {
  let daysOfCalender = _.map(month, (dayData, key) => {
    return <CalendarWeek key={key} userId={userId} dayData={dayData} onShowDaySummary={onShowDaySummary} onWorkingHoursChange={onWorkingHoursChange} />;
  });
  return (
    <div id="calendar" className="col-xs-12">
      {daysOfCalender}
    </div>
  );
};

CalendarStructure.PropTypes = {
  userId:           PropTypes.number.isRequired,
  month:            PropTypes.array.isRequired,
  onShowDaySummary: PropTypes.func.isRequired
};

export default CalendarStructure;
