import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const CalendarWeek = ({userId, dayData, onShowDaySummary, onWorkingHoursChange}) => {
  const setCalendarDay = () => {
    let calendarWidth = $('#calendar').width();
    let dayInRow = parseInt(calendarWidth / 100);
    if (dayInRow < 7 && calendarWidth % 100 > 0) {
      let dayWidth = parseInt(calendarWidth / dayInRow);
      $('#calendar .calendar-day').css({width: dayWidth + 'px'});
    } else if (dayInRow >= 7) {
      $('#calendar .calendar-day').css({width: calendarWidth / 7 + 'px'});
    }
  };
  $(document).ready(function () {
    $(window).on('resize', function () {
      setCalendarDay();
    });
    setCalendarDay();
  });
  let dayHtml = '';
  if (userId) {
    dayHtml = <Day forEmployeeHours={false} dayData={dayData} showDaySummary={onShowDaySummary} userid={userId} />;
  } else {
    dayHtml = <Day forEmployeeHours dayData={dayData} onWorkingHoursChange={onWorkingHoursChange} />;
  }
  return (
    <div id="calendarDay" className="calendar-day">
      <div className="fc-event-container">
        {dayHtml}
      </div>
    </div>
  );
};

CalendarWeek.PropTypes = {
  dayData:              PropTypes.object.isRequired,
  userId:               PropTypes.number,
  onShowDaySummary:     PropTypes.func,
  onWorkingHoursChange: PropTypes.func
};

export default CalendarWeek;
