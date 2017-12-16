import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ListWorkingHours from './ListWorkingHours';

const ListUserWorkingHours = ({displayData}) => {
  let WorkingHoursList = _.map(displayData, (row, key) => {
    return (
      <ListWorkingHours key={key} row={row} />
    );
  });
  return (
    <div className="row box">
        <div className="box-body">
          <div className="streamline b-l m-l">
            {WorkingHoursList}
          </div>
        </div>
    </div>
  );
};

ListUserWorkingHours.PropTypes = {
  displayData: PropTypes.array.isRequired
};

export default ListUserWorkingHours;
