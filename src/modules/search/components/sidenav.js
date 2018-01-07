import React from 'react';
// import PropTypes from 'prop-types';
import Checkbox from 'components/generic/input/checkbox';

const SideNav = ({searchWithin, searchWithinValue}) => {
  return (
    <div className="well">
      <h3> Advanced Search </h3>
      <ul className='sideNav'>
        <li><Checkbox onchange={searchWithin} value={searchWithinValue} label='Search Within Results' /></li>
      </ul>
    </div>
  );
};

SideNav.PropTypes = {};

export default SideNav;
