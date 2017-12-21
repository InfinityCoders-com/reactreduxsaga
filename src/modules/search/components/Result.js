import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const Result = ({data}) => {
  return (
    <div className="row">
      <div className="col-sm-3 col-md-2">
        <ul className='sideNav'>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      </div>
      <div className="col-sm-6">
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
    </div>
  );
};

Result.PropTypes = {
  data: PropTypes.Array
};

export default Result;
