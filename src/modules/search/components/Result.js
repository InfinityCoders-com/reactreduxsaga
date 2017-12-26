import React from 'react';
import PropTypes from 'prop-types';

const Result = ({data}) => {
  return (
    <div className='result-wrapper'>
      {data.map((value, key) => (
        <div key={key} className='result-item'>
          <div className='row'>
            <h5 className="col-sm-6 text-info">{value.heading}</h5>
            <h6 className="col-sm-3 p-t-xs author">{value.author}</h6>
            <h6 className="col-sm-3 p-t-xs type">{value.type}</h6>
          </div>
          <a href={value.link}><span className='text-success'>{value.link}</span></a>
          <p className='desc'>{value.date + ' - ' + value.description}</p>
        </div>
      ))}
    </div>
  );
};

Result.PropTypes = {
  data: PropTypes.Array
};

export default Result;
