import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {CONFIG} from 'src/config/index';
import * as actions_login from 'appRedux/auth/actions/index';
import AddUserPendingHour from './AddUserPendingHour';
import 'react-date-picker/index.css';
var moment = require('moment');

const PendingHourSummary = ({manageUserPendingHours, onUserPendingHoursData}) => {
  const onChangeMonthData = (check) => {
    let pendingData = manageUserPendingHours.displayData;
    let year = '';
    let month = '';

    if (check === 'previous') {
      if (Object.keys(pendingData).length > 0) {
        year = pendingData.previousMonth.year;
        month = pendingData.previousMonth.month;
      }
      onUserPendingHoursData(year, month);
    } else if (check === 'next') {
      if (Object.keys(pendingData).length > 0) {
        year = pendingData.nextMonth.year;
        month = pendingData.nextMonth.month;
      }
      onUserPendingHoursData(year, month);
    }
  };
  return (
    <div>
        <div className="fullcalendar fc fc-ltr fc-unthemed">
          <div className="fc-toolbar">
            <div className="fc-left">
              <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right"
                onClick={() => onChangeMonthData('previous')}>
                <span className="fc-icon fc-icon-left-single-arrow"></span>
              </button>
            </div>
            <div className="fc-right">
              <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right"
                onClick={() => onChangeMonthData('next')}>
                <span className="fc-icon fc-icon-right-single-arrow"></span>
              </button>
            </div>
            <div className="fc-center">
              <h2>{manageUserPendingHours.displayData.monthName} - {manageUserPendingHours.displayData.year}</h2>
            </div>
            <div className="fc-clear"></div>
          </div>
        </div>
    </div>
  );
};
PendingHourSummary.PropTypes = {
  manageUserPendingHours: PropTypes.shape({
    previousMonth: PropTypes.object.isRequired,
    nextMonth:     PropTypes.object.isRequired,
    monthName:     PropTypes.string.isRequired,
    year:          PropTypes.number.isRequired
  }).isRequired
};
export default PendingHourSummary;
