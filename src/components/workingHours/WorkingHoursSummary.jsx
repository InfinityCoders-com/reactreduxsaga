import React from 'react';
import PropTypes from 'prop-types';
import CalendarStructure from 'components/generic/employeeMonthGrid/CalendarStructure';

const WorkingHoursSummary = ({workingHoursSummary, onWorkingHoursChange, onWorkingHoursSummary}) => {
  const _onChangeMonth = (check) => {
    if (check === 'previous') {
      onWorkingHoursSummary(workingHoursSummary.previousMonth.year, workingHoursSummary.previousMonth.month);
    } else if (check === 'next') {
      onWorkingHoursSummary(workingHoursSummary.nextMonth.year, workingHoursSummary.nextMonth.month);
    }
  };
  return (
    <div >
      <div id="content" className="app-content box-shadow-z0" role="main">
        <div className="app-body" id="view">
          <div>
            <div className="fullcalendar fc fc-ltr fc-unthemed">
              <div className="fc-toolbar">
                <div className="fc-left">
                  <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => _onChangeMonth('previous')}>
                    <span className="fc-icon fc-icon-left-single-arrow"></span>
                  </button>
                </div>
                <div className="fc-right">
                  <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => _onChangeMonth('next')}>
                    <span className="fc-icon fc-icon-right-single-arrow"></span>
                  </button>
                </div>
                <div className="fc-center">
                  <h2>{workingHoursSummary.monthName}-{workingHoursSummary.year}</h2>
                </div>
                <div className="fc-clear"></div>
              </div>
              <br />
              <div className="fc-view-container">
                <div className="fc-view fc-month-view fc-basic-view">
                  <div className="fc-body">
                    <div className="fc-widget-content">
                      <div className="fc-day-grid-container">
                        <div className="fc-day-grid">
                          <CalendarStructure month={workingHoursSummary.monthSummary} onWorkingHoursChange={onWorkingHoursChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WorkingHoursSummary.PropTypes = {
  workingHoursSummary: PropTypes.shape({
    monthSummary:  PropTypes.array.isRequired,
    previousMonth: PropTypes.object.isRequired,
    nextMonth:     PropTypes.object.isRequired,
    monthName:     PropTypes.string.isRequired,
    year:          PropTypes.number.isRequired
  }).isRequired,
  onWorkingHoursChange:  PropTypes.func.isRequired,
  onWorkingHoursSummary: PropTypes.func.isRequired
};

export default WorkingHoursSummary;
