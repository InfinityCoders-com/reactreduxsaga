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
              <h4 className="col-sm-6">{value.heading}</h4>
              <h5 className="col-sm-3 p-t-sm">{value.author}</h5>
              <h5 className="col-sm-3 p-t-sm">{value.type}</h5>
            </div>
            <Link to={value.link}>{value.link}</Link>
            <p>{value.description}</p>
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
