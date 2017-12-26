import React from 'react';
import InputText from 'components/generic/input/InputText';
import {Button} from 'components/generic/buttons';
// import PropTypes from 'prop-types';

const AddNew = ({headingChange, authorChange, typeChange, dateChange, linkChange, descriptionChange, submitNewIssue}) => {
  return (
    <div className="well">
      <div className='row'>
        <InputText name="heading" onchange={headingChange} placeHolder="Heading of Result" className='col-xs-12' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <div className='row'>
        <InputText name="author" onchange={authorChange} placeHolder="Author of Result" className='col-md-6' style={{'position': 'relative', 'float': 'left'}} />
        <InputText name="type" onchange={typeChange} placeHolder="Type of Result" className='col-md-6' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <div className='row'>
        <InputText name="date" onchange={dateChange} placeHolder="Date of Issue." className='col-sm-12' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <div className='row'>
        <InputText name="link" onchange={linkChange} placeHolder="Reference Link" className='col-sm-12' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <div className='row'>
        <InputText name="desc" onchange={descriptionChange} placeHolder="Reference Link" className='col-sm-12' style={{'position': 'relative', 'float': 'left'}} />
      </div>
      <div className='row'>
        <Button className='inline-button' type="submit" label="Add New" onClick={submitNewIssue} />
      </div>
    </div>
  );
};

AddNew.PropTypes = {};

export default AddNew;
