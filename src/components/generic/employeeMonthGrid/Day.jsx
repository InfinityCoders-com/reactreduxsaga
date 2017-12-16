import React from 'react';
import PropTypes from 'prop-types';
import * as dayType from 'appRedux/attendance/constants';
import DaySection from './DaySection';

const styles = {
  timeInputBox: {
    'width': '40px'
  }
};

const Day = ({dayData, classname, forEmployeeHours, day, userid, showDaySummary, onWorkingHoursChange}) => {
  $(document).ready(function () {
    $('input.timepicker').timepicker({'minTime': '5:00', 'maxTime': '12:00', 'timeFormat': 'h:i', 'step': 10});
  });

  let d = dayData;

  let officeWorkingHours = d.office_working_hours;
  let main = '';
  let _class = 'fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable ';

  let extraTimebg = '';
  let date = d.date;
  let datebg = 'dark-white';
  let workTimeData = d.total_time + ' - Total Work Time';

  if (d.extra_time_status === '-') {
    extraTimebg = 'red';
  } else if (d.extra_time_status === '+') {
    extraTimebg = 'green';
  }
  if (d.admin_alert === 1) {
    date = date + ' * ';
    datebg = 'indigo';
    workTimeData = d.admin_alert_message;
  }
  if (!forEmployeeHours && d.day_type === dayType.WORKING_DAY) {
    main = <div data-toggle="modal" data-target="#modalUserDaySummary" onClick={() => showDaySummary(userid, dayData.full_date)}>
      <DaySection classname={_class + datebg} block="type1" time={<h5>{date}</h5>} title={d.day} />
      <DaySection classname={_class + 'dark-white'} block="type1" time={d.in_time + ' - ' + d.out_time} title='' />
      <DaySection classname={_class + 'dark-white center'} block="type2" dataToDisplay={workTimeData} />
      <DaySection classname={_class + extraTimebg} block="type1" time={d.extra_time} title='' />
    </div>;
  } else if (!forEmployeeHours && d.day_type === dayType.NON_WORKING_DAY) {
    main = <div>
      <DaySection classname={_class + 'yellow'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'yellow'} block="type1" time={'Non Working day'} />
      <DaySection classname={_class + 'yellow'} block="type1" time={d.day_text} />
    </div>;
  } else if (!forEmployeeHours && d.day_type === dayType.FUTURE_WORKING_DAY) {
    main = <div>
      <DaySection classname={_class + 'dark-white'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'dark-white'} block="type1" time='' title='' />
      <DaySection classname={_class + 'dark-white'} block="type1" dataToDi splay={d.day_text} />
      <DaySection classname={_class + 'dark-white center'} block="type2" dataToDisplay={workTimeData} />
    </div>;
  } else if (!forEmployeeHours && d.day_type === dayType.LEAVE_DAY) {
    main = <div>
      <DaySection classname={_class + 'red'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'red'} block="type1" time={'On Leave'} title='' />
      <DaySection classname={_class + 'red'} block="type1" time={d.day_text} title='' />
    </div>;
  } else if (!forEmployeeHours && d.day_type === dayType.HALF_DAY) {
    main = <div>
      <DaySection classname={_class + 'red-100'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'red-100'} block="type1" time={'Half day'} title='' />
      <DaySection classname={_class + 'red-100'} block="type1" time={d.day_text} title='' />
    </div>;
  } else if (forEmployeeHours && d.day_type === dayType.WORKING_DAY) {
    main = <div data-toggle="modal">
      <DaySection classname={_class + 'dark-white'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'dark-white'} block="type1" time={<h6>Hours : {officeWorkingHours}</h6>} title='' />

      <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end dark-white fc-draggable">
        <div className="fc-content">
          <span className="fc-title">
            Change to &nbsp;:&nbsp;
          </span>
          <span className="fc-time">
            <input type="text" className="timepicker" style={styles.timeInputBox} onBlur={(e) => onWorkingHoursChange(dayData.full_date, e.target.value)} />
          </span>
        </div>
      </div>

    </div>;
  } else if (forEmployeeHours && d.day_type === dayType.NON_WORKING_DAY) {
    main = <div>
      <DaySection classname={_class + 'yellow'} block="type1" time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class + 'yellow'} block="type1" time={'Non Working day'} />
      <DaySection classname={_class + 'yellow'} block="type1" time={d.day_text} title='' />

      <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end dark-white fc-draggable">
        <div className="fc-content">
          <span className="fc-title">
            Change to &nbsp;:&nbsp;
          </span>
          <span className="fc-time">
            <input type="text" className="timepicker" style={styles.timeInputBox} onBlur={(e) => onWorkingHoursChange(dayData.full_date, e.target.value)} />
          </span>
        </div>
      </div>
    </div>;
  }

  return (
    <div>
      {main}
    </div>
  );
};

Day.PropTypes = {
  classname:            PropTypes.string,
  forEmployeeHours:     PropTypes.bool,
  day:                  PropTypes.string,
  userid:               PropTypes.number,
  showDaySummary:       PropTypes.func,
  onWorkingHoursChange: PropTypes.func,
  dayData:              PropTypes.shape({
    date:                 PropTypes.number.isRequired,
    day:                  PropTypes.string.isRequired,
    day_type:             PropTypes.string.isRequired,
    full_date:            PropTypes.string.isRequired,
    admin_alert:          PropTypes.number,
    admin_alert_message:  PropTypes.string,
    day_text:             PropTypes.string,
    extra_time:           PropTypes.string,
    in_time:              PropTypes.string,
    out_time:             PropTypes.string,
    total_time:           PropTypes.string,
    office_working_hours: PropTypes.string,
    text:                 PropTypes.string
  }).isRequired
};

export default Day;
