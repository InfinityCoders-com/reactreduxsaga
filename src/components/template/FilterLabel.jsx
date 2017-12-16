import React from 'react';
import PropTypes from 'prop-types';
import {forEach} from 'lodash';

const FilterLabel = ({data, onClick, onClear}) => {
  const handleOnClick = (label, index) => {
    onClick && onClick(label, index);
  };

  const clearFilter = () => {
    onClear && onClear();
  };

  var child = [];
  data && forEach(data, (label, index) => {
    child[index] =
      <span key={index} className="filter-label label label-info">
        <a className="filter-remove" onClick={() => handleOnClick(label, index)}>
          <i className="fa fa-times"></i>
        </a>
        <span className="option-name">{label.name}</span>
      </span>;
  });

  return (
    <div>
      {child}
      {data.length > 0 && onClear &&
        <a onClick={() => clearFilter()} className={'filter-label label label-info clear-all'} style={{backgroundColor: '#747474'}}>
          Clear <span style={{'textTransform': 'lowercase'}}>all</span>
        </a>}
    </div>
  );
};

FilterLabel.PropTypes = {
  data:    PropTypes.array,
  onClick: PropTypes.func,
  onClear: PropTypes.func
};

export default FilterLabel;
