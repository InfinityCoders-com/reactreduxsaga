import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import Button from 'components/generic/buttons/Button';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';

class FormAddNewEmployee extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open:           false,
      dateofjoining:  '',
      name:           '',
      jobtitle:       '',
      gender:         '',
      dob:            '',
      username:       '',
      training_month: '',
      workemail:      ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen () {
    this.setState({
      open:           true,
      dateofjoining:  '',
      name:           '',
      jobtitle:       '',
      gender:         '',
      dob:            '',
      training_month: '',
      username:       '',
      workemail:      ''
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  render () {
    return (
      <div>
        <Button className="btn-fw info responsive-p-x-sm" onClick={this.handleOpen} label="Add New Employee" />
        <Dialog
          title="Add New Employee"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentClassName="add-new-emp-dialog dialog-add-role"
          titleClassName="title"
          bodyClassName="body"
          autoScrollBodyContent>
          <div className="text-danger"><i>*Create a slack profile first and enter email in Work Email</i></div>
          <div className="text-info">*Default password is : {CONFIG.DEFAULT_PASSWORD}</div>
          <div className="row">
            <div className="col-xs-6 input-wrapper">
              Date of Joining
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date) => { this.setState({dateofjoining: date}); }}
                className="form-control"
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              Date of Birth
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date) => { this.setState({dob: date}); }}
                className="form-control"
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              Training Month
              <select
                className="form-control"
                ref="training_month"
                onChange={(evt) => { this.setState({training_month: evt.target.value}); }}>
                <option disabled>--select month--</option>
                <option value="0">0 month </option>
                <option value="1">1 month</option>
                <option value="2">2 month</option>
                <option value="3">3 month</option>
                <option value="4">4 month</option>
              </select>
            </div>
            <div className="col-xs-6 input-wrapper">
              Gender
              <select
                className="form-control"
                ref="gender"
                onChange={(e) => this.setState({gender: e.target.value})}
                value={this.state.gender}>
                <option value="">--Select gender--</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="Name"
                floatingLabelFixed fullWidth
                onChange={(e) => (this.setState({name: e.target.value}))}
                value={this.state.name}
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="Job Title"
                floatingLabelFixed fullWidth
                onChange={(e) => (this.setState({jobtitle: e.target.value}))}
                value={this.state.jobtitle}
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="UserName"
                floatingLabelFixed fullWidth
                onChange={(e) => (this.setState({username: e.target.value}))}
                value={this.state.username}
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="Work Email"
                floatingLabelFixed fullWidth
                onChange={(e) => (this.setState({workemail: e.target.value}))}
                value={this.state.workemail}
              />
            </div>
            <div className="col-xs-6 input-wrapper"></div>
          </div>
          <br />
          <br />
          <ButtonRaised
            className="col-xs-12 m-b-sm indigo"
            onClick={() => this.props.callAddNewEmployee(this.state)}
            label={'Add Employee'}
          />
        </Dialog>
      </div>
    );
  }
}

export default FormAddNewEmployee;

FormAddNewEmployee.propTypes = {
  client:             PropTypes.object,
  selectedClientId:   PropTypes.string,
  callAddNewEmployee: PropTypes.func.isRequired
};
