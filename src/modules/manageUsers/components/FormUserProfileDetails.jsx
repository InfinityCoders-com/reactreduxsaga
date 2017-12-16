import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {CONFIG} from 'src/config/index';
import Label from 'components/generic/label';
import InputText from 'components/generic/input/InputText';
import Textarea from 'components/generic/input/TextArea';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';
var moment = require('moment');

class FormUserProfileDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username:                 '',
      user_id:                  '',
      name:                     '',
      jobtitle:                 '',
      dateofjoining:            '',
      dob:                      '',
      gender:                   '',
      training_month:           '',
      marital_status:           '',
      team:                     '',
      address1:                 '',
      address2:                 '',
      emergency_ph1:            '',
      emergency_ph2:            '',
      blood_group:              '',
      medical_condition:        '',
      work_email:               '',
      other_email:              '',
      training_completion_date: '',
      termination_date:         '',
      holding_comments:         '',
      send_slack_msg:           '',
      slack_msg:                ''
    };
    this.handleTest = this.handleTest.bind(this);
  }
  componentWillReceiveProps (props) {
    let username : "";
    let user_id = '';
    let name = '';
    let jobtitle = '';
    let team = '';
    let dateofjoining = '';
    let dob = '';
    let gender = ' ';
    let training_month = '';
    let marital_status = ' ';
    let address1 = ' ';
    let address2 = ' ';
    let emergency_ph1 = ' ';
    let emergency_ph2 = ' ';
    let blood_group = ' ';
    let medical_condition = ' ';
    let work_email = ' ';
    let other_email = '';
    let training_completion_date: "";
    let termination_date: "";
    let holding_comments: "";
    let slack_msg: "";
    let userProfileDetail = props.user_profile_detail;
    if (typeof props.username !== 'undefined' && props.username != null) {
      username = props.username;
    }
    if (typeof props.user_profile_detail.other_email !== 'undefined' && props.user_profile_detail.other_email != null) {
      other_email = props.user_profile_detail.other_email;
    }
    if (typeof userProfileDetail.user_Id !== 'undefined' && userProfileDetail.user_Id != null) {
      user_id = userProfileDetail.user_Id;
    }
    if (typeof userProfileDetail.name !== 'undefined' && userProfileDetail.name != null) {
      name = userProfileDetail.name;
    }
    if (typeof userProfileDetail.jobtitle !== 'undefined' && userProfileDetail.jobtitle != null) {
      jobtitle = userProfileDetail.jobtitle;
    }
    if (typeof userProfileDetail.training_month !== 'undefined' && userProfileDetail.training_month !== null) {
      training_month = userProfileDetail.training_month;
    }
    if (typeof userProfileDetail.dateofjoining !== 'undefined' && userProfileDetail.dateofjoining != null) {
      var mydate = new Date(userProfileDetail.dateofjoining);
      if (mydate !== 'Invalid Date') {
        dateofjoining = userProfileDetail.dateofjoining;
      }
    }
    if (typeof userProfileDetail.dob !== 'undefined' && userProfileDetail.dob !== null) {
      var mydate = new Date(userProfileDetail.dob);
      if (mydate !== 'Invalid Date') {
        dob = moment(mydate);
      }
    }
    if (typeof userProfileDetail.training_month !== 'undefined' && userProfileDetail.training_month != null) {
      training_month = userProfileDetail.training_month;
    }
    if (typeof userProfileDetail.gender !== 'undefined' && userProfileDetail.gender != null) {
      gender = userProfileDetail.gender;
    }
    if (typeof userProfileDetail.marital_status !== 'undefined' && userProfileDetail.marital_status != null) {
      marital_status = userProfileDetail.marital_status;
    }
    if (typeof userProfileDetail.team !== 'undefined' && userProfileDetail.team != null) {
      team = userProfileDetail.team;
    }
    if (typeof userProfileDetail.current_address !== 'undefined' && userProfileDetail.current_address != null) {
      address1 = userProfileDetail.current_address;
    }
    if (typeof userProfileDetail.permanent_address !== 'undefined' && userProfileDetail.permanent_address != null) {
      address2 = userProfileDetail.permanent_address;
    }
    if (typeof userProfileDetail.emergency_ph1 !== 'undefined' && userProfileDetail.emergency_ph1 != null) {
      emergency_ph1 = userProfileDetail.emergency_ph1;
    }
    if (typeof userProfileDetail.emergency_ph2 !== 'undefined' && userProfileDetail.emergency_ph2 != null) {
      emergency_ph2 = userProfileDetail.emergency_ph2;
    }
    if (typeof userProfileDetail.blood_group !== 'undefined' && userProfileDetail.blood_group != null) {
      blood_group = userProfileDetail.blood_group;
    }
    if (typeof userProfileDetail.medical_condition !== 'undefined' && userProfileDetail.medical_condition != null) {
      medical_condition = userProfileDetail.medical_condition;
    }
    if (typeof userProfileDetail.work_email !== 'undefined' && userProfileDetail.work_email != null) {
      work_email = userProfileDetail.work_email;
    }
    if (typeof userProfileDetail.training_completion_date !== 'undefined' && userProfileDetail.training_completion_date !== null) {
      var mydate = new Date(userProfileDetail.training_completion_date);
      if (mydate !== 'Invalid Date') {
        training_completion_date = userProfileDetail.training_completion_date;
      }
    }
    if (typeof userProfileDetail.termination_date !== 'undefined' && userProfileDetail.termination_date != null) {
      var mydate = new Date(userProfileDetail.termination_date);
      if (mydate !== 'Invalid Date') {
        termination_date = userProfileDetail.termination_date;
      }
    }
    if (typeof userProfileDetail.holding_comments !== 'undefined' && userProfileDetail.holding_comments != null) {
      holding_comments = userProfileDetail.holding_comments;
    }
    if (typeof userProfileDetail.slack_msg !== 'undefined' && userProfileDetail.slack_msg != null) {
      slack_msg = userProfileDetail.slack_msg;
    }
    this.setState({
      username:                 username,
      user_id:                  user_id,
      name:                     name,
      jobtitle:                 jobtitle,
      team:                     team,
      dateofjoining:            dateofjoining,
      dob:                      dob,
      gender:                   gender,
      training_month:           training_month,
      marital_status:           marital_status,
      address1:                 address1,
      address2:                 address2,
      emergency_ph1:            emergency_ph1,
      emergency_ph2:            emergency_ph2,
      blood_group:              blood_group,
      medical_condition:        medical_condition,
      work_email:               work_email,
      other_email:              other_email,
      training_completion_date: training_completion_date,
      termination_date:         termination_date,
      holding_comments:         holding_comments,
      slack_msg:                slack_msg
    });
  }
  handleTest () {
    if (this.props.user_profile_detail.slack_msg === '1') {
      this.setState({slack_msg: '0'});
    } else {
      this.setState({slack_msg: '1'});
    }
    this.props.callUpdateUserProfileDetails(this.state);
  }
  render () {
    let teams = this.props.teamList.data.length > 0 ? this.props.teamList.data : [];
    let userLevel = this.props.loggedUser.data.role === CONFIG.ADMIN;
    return (
      <div>
        <h6 className="text-center">Personal Details</h6>
        <br />
        <div className="row no-gutter">
          <div className="col-md-6">
            Employee Id :
            <b> {this.state.user_id}</b><br />
            Username :
            <b> {this.state.username}</b>
          </div>
        </div>
        <hr />
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="name" text={'Name'} />
              <InputText
                onchange={(e) => this.setState({name: e.target.value})}
                value={this.state.name}
              />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Job Title" text={'Job Title'} />
              <InputText
                onchange={(e) => this.setState({jobtitle: e.target.value})}
                value={this.state.jobtitle}
              />
            </div>
          </div>
        </div>
        <div className="form-group padding-x-5">
          <Label htmlfor="Team" text={'Team'} />
          <select
            className="form-control"
            onChange={(e) => this.setState({team: e.target.value})}
            value={this.state.team}>
            <option value="">--Select team--</option>
            {_.map(teams, (tm, i) => (<option key={i} value={tm}>{tm}</option>))}
          </select>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Date Of Birth" text={'Date Of Birth ( eg. 27/1/1988 )'} />
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date, {dateMoment, timestamp}) => this.setState({dob: dateMoment})}
                value={this.state.dob}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Date Of Joining" text={'Date Of Joining ( eg. 2016-12-30 )'} />
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date) => this.setState({dateofjoining: date})}
                value={this.state.dateofjoining}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Training Completion Date" text={'Training Completion Date'} />
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date) => this.setState({training_completion_date: date})}
                value={this.state.training_completion_date}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Date Of Termination" text={'Date Of Termination  ( eg. 2016-12-30 )'} />
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={(date) => this.setState({termination_date: date})}
                value={this.state.termination_date}
                className="form-control" />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Training Month" text={'Training Month ( eg. 0-4 month )'} />
              <select
                className="form-control"
                ref="training_month"
                onChange={(e) => this.setState({training_month: e.target.value})}
                value={this.state.training_month}>
                <option disabled>--select month--</option>
                <option value="0">0 month </option>
                <option value="1">1 month</option>
                <option value="2">2 month</option>
                <option value="3">3 month</option>
                <option value="4">4 month</option>
              </select>
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <label>Personal Email</label>
              <input type="text" className="form-control" ref="other_email"
                onChange={() => this.setState({other_email: this.refs.other_email.value})}
                value={this.state.other_email} />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className={(userLevel ? 'col-xs-6' : 'col-xs-12' ) + ' profile-input'}>
            <div className="form-group">
              <Label htmlfor="Work Email" text={'Work Email'} />
              <InputText
                onchange={(e) => this.setState({work_email: e.target.value})}
                value={this.state.work_email}
              />
            </div>
          </div>
          <div className={userLevel ? 'col-xs-6 profile-input' : 'hide'}>
            <div className="form-group">
              <Label htmlfor="Employee Holding Comment" text={'Employee Holding Comment'} />
              <Textarea
                placeHolder="enter employee holding comment..."
                onchange={(e) => this.setState({holding_comments: e.target.value})}
                value={this.state.holding_comments}
              />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Gender" text={'Gender'} />
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
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Marital Status" text={'Marital Status'} />
              <select
                className="form-control"
                ref="marital_status"
                onChange={(e) => this.setState({marital_status: e.target.value})}
                value={this.state.marital_status}>
                <option value="">--Select marital status--</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Current Address" text={'Current Address'} />
              <Textarea
                placeHolder="your current address..."
                onchange={(e) => this.setState({address1: e.target.value})}
                value={this.state.address1}
              />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Permanent Address" text={'Permanent Address'} />
              <Textarea
                placeHolder="your permanent address..."
                onchange={(e) => this.setState({address2: e.target.value})}
                value={this.state.address2}
              />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Emergency Contact Information 1" text={'Emergency Contact Information 1'} />
              <InputText
                onchange={(e) => this.setState({emergency_ph1: e.target.value})}
                value={this.state.emergency_ph1}
              />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <Label htmlfor="Emergency Contact Information 2" text={'Emergency Contact Information 2'} />
              <InputText
                onchange={(e) => this.setState({emergency_ph2: e.target.value})}
                value={this.state.emergency_ph2}
              />
            </div>
          </div>
        </div>
        <div className="form-group padding-x-5">
          <Label htmlfor="Blood Group" text={'Blood Group'} />
          <select
            className="form-control"
            ref="blood_group"
            onChange={(e) => this.setState({blood_group: e.target.value})}
            value={this.state.blood_group}>
            <option value="">--Select your Blood Group--</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group padding-x-5">
          <Label htmlfor="Any Medical Conditions" text={'Any Medical Conditions'} />
          <Textarea
            placeHolder="your medical conditions..."
            onchange={(e) => this.setState({medical_condition: e.target.value})}
            value={this.state.medical_condition}
          />
        </div>
        <div className="form-group padding-x-5">
          <i className='fa fa-slack' aria-hidden='true'></i>{' '}
          <Label htmlfor="Don’t post on Slack" text={'Don’t post on Slack'} />
          <input value type="checkbox" id="1" name="send_slack_msg" className="send-slack-msg-checkbox" onChange={(e) => {
              if (e.target.checked) {
                this.setState({
                  send_slack_msg: '1'
                });
              } else {
                this.setState({
                  send_slack_msg: ''
                });
              }
            }}
          />
        </div>
        <ButtonRaised
          className="col-xs-12 m-b-sm indigo"
          onClick={() => this.props.callUpdateUserProfileDetails(this.state)}
          label={'Update Profile Details'}
        />
      </div>
    );
  }
}

export default FormUserProfileDetails;

FormUserProfileDetails.propTypes = {
  user_profile_detail:          PropTypes.object.isRequired,
  callUpdateUserProfileDetails: PropTypes.func.isRequired,
  teamList:                     PropTypes.object.isRequired,
  loggedUser:                   PropTypes.object.isRequired
};
