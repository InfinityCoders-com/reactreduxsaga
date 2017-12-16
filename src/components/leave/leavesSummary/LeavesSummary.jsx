import React from 'react';
import PropTypes from 'prop-types';

const LeavesSummary = ({user}) => {
  let pendingPunchingDays = _.map(user.attendance, (day, key) => {
    let checkClass = 'b-success';
    if (day.day_type === 'WORKING_DAY') {
      if (day.in_time === '' || day.out_time === '') {
        checkClass = 'b-danger';
      }
    }
    let showText = '';
    if (day.day_type === 'HALF_DAY') {
      checkClass = 'b-warn';
      showText = day.day_type + ' / ' + 'Timings : ' + day.in_time + ' - ' + day.out_time + ' / Total Time : ' + day.total_time;
    }
    return (
      <div key={key} className={`sl-item ${checkClass}`}>
        <div className="sl-icon">
          <i className="fa fa-check"></i>
        </div>
        <div className="sl-content">
          <div className="">{day.display_date}</div>
          <div>{day.day_text}</div>
          <div>{showText}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="col-12">
      <div className="col-sm-4 col-md-4 col-xs-12  ">
        <div className="box box-responsive-5 scroll">
          <div className="box-header">
            <h3>{user.name}</h3>
            <small>{user.jobtitle}</small>
          </div>
          <div className="box-body">
            <div className="streamline b-l m-l">
              {pendingPunchingDays}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LeavesSummary.PropTypes = {
  user: PropTypes.shape({
    attendance: PropTypes.array.isRequired,
    name:       PropTypes.string.isRequired,
    jobtitle:   PropTypes.string.isRequired
  }).isRequired
};

export default LeavesSummary;
