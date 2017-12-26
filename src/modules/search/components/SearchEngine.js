import React from 'react';
import PropTypes from 'prop-types';
import InputText from 'components/generic/input/InputText';
import {Button} from 'components/generic/buttons';

const SearchEngine = ({onInputchange, onAuthorchange, onDatechange, onSearchTypechange, author, date, type}) => {
  return (
    <div className="well">
      <div className="searchInput">
        <InputText name="searchString" onchange={onInputchange} placeHolder="Search for issues" className='col-sm-8' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <Button className='inline-button' type="submit" label="Search" />
      <div className="filters">
        <select name='author' onChange={onAuthorchange}>
          <option value=''>-- Please Select --</option>
          {author.map((value, key) => (<option key={key} value={value}>{value}</option>))}
        </select>
        <select name='date' onChange={onDatechange}>
          <option value=''>-- Please Select --</option>
          {date.map((value, key) => (<option key={key} value={value}>{value}</option>))}
        </select>
        <select name='type' onChange={onSearchTypechange}>
          <option value=''>-- Please Select --</option>
          {type.map((value, key) => (<option key={key} value={value}>{value}</option>))}
        </select>
      </div>
    </div>
  );
};

SearchEngine.PropTypes = {
  onchange: PropTypes.func,
  author:   PropTypes.Array,
  date:     PropTypes.Array,
  type:     PropTypes.Array
};

export default SearchEngine;
