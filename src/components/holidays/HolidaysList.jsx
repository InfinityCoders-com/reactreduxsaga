import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const HolidaysList = ({holidays}) => {
  let img = <img src='./socialMediaIcons/holidays.svg' className="w-40 img-circle m-x-md" />;
  let holidaysList = <tr><td className="text-muted text-center" colSpan={4}><h2>{img} Loading Holidays...</h2></td></tr>;
  if (holidays !== undefined && _.size(holidays) === 0) {
    holidaysList = <tr><td className="text-muted text-center" colSpan={4}><h2>{img} No Holidays This Year.</h2></td></tr>;
  } else if (holidays !== undefined) {
    holidays.sort(function compare (a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
    holidaysList = _.map(holidays, (holiday, key) => {
      return (
        <tr key={key}>
          <td>{holiday.month}</td>
          <td>{holiday.date}</td>
          <td>{holiday.dayOfWeek}</td>
          <td>{holiday.name}</td>
        </tr>
      );
    });
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="table-responsive box">
          <div className="box-divider m-a-0"></div>
          <table className="table table-striped">
            <thead className="success">
              <tr><th>Month</th><th>Date</th><th>Day</th><th>Holiday</th></tr>
            </thead>
            <tbody>
              {holidaysList}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

HolidaysList.PropTypes = {
  holidays: PropTypes.array.isRequired
};

export default HolidaysList;
