import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import LeavesSummary from './LeavesSummary';

const styles = {
  height100per: {
    'minHeight': '150px'
  }
};

const ViewLeavesSummary = ({componentData, on_all_leaves_summary}) => {
  const _onChangeMonth = (check) => {
    if (check == 'previous') {
      on_all_leaves_summary(componentData.previousMonth.year, componentData.previousMonth.month)
    } else if (check == 'next') {
      on_all_leaves_summary(componentData.nextMonth.year, componentData.nextMonth.month)
    }
  }
  let current_month = typeof componentData.month != 'undefined'? componentData.month : '';
  let current_year = typeof componentData.year != 'undefined' ? componentData.year : '';
  let current_monthName = typeof componentData.monthName != 'undefined'? componentData.monthName : '';
  let summaryHtml = _.map(componentData.leavesSummary, (userLeaveSummary, key) => {
    return <LeavesSummary key={key} user={userLeaveSummary} />
  });
  return (
    <div className="app-body" id="view">
      <div className="padding">
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
                    <h2>
                      {current_monthName}
                      - {current_year}</h2>
                  </div>
                  <div className="fc-clear"></div>
                </div>
                <br/>
                <div className="fc-view fc-month-view fc-basic-view">
                  {summaryHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ViewLeavesSummary.PropTypes = {
  componentData: PropTypes.shape({
    leavesSummary: PropTypes.array.isRequired,
    month: PropTypes.number,
    monthName: PropTypes.string,
    username: PropTypes.string,
    previousMonth: PropTypes.object.isRequired,
    nextMonth: PropTypes.object.isRequired,
    year: PropTypes.number
  }).isRequired,
  on_all_leaves_summary: PropTypes.func.isRequired
}

export default ViewLeavesSummary;
