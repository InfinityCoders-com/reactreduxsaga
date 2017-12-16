import React from 'react';
import PropTypes from 'prop-types';
import {DateField} from 'react-date-picker';
import {ButtonRaised} from 'components/generic/buttons/index';
import 'react-date-picker/index.css';

class FormProfileDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id:        '',
      name:           '',
      jobtitle:       '',
      dateofjoining:  '',
      dob:            '',
      gender:         '',
      marital_status: 'Single',
      address1:       '',
      address2:       '',
      emr_con_1:      '',
      emr_con_2:      '',
      work_email:     '',
      emp_email:      '',
      blood_group:    '',
      medical_con:    ''
    };
  }
  componentWillReceiveProps (props) {
    let {name, jobtitle, dateofjoining, dob, gender, marital_status, current_address, permanent_address, emergency_ph1, emergency_ph2, work_email, other_email, blood_group, medical_condition} = props.user_profile_detail;
    this.setState({
      name:           name || '',
      jobtitle:       jobtitle || '',
      dateofjoining:  dateofjoining || '',
      dob:            dob || '',
      gender:         gender || '',
      marital_status: marital_status || 'Single',
      address1:       current_address || '',
      address2:       permanent_address || '',
      emr_con_1:      emergency_ph1 || '',
      emr_con_2:      emergency_ph2 || '',
      work_email:     work_email || '',
      emp_email:      other_email || '',
      blood_group:    blood_group || '',
      medical_con:    medical_condition || ''
    });
  }

  render () {
    return (
      <div>
        <h6 className="text-center">Personal Details</h6>
        <div className="row no-gutter">
          <div className="col-xs-12 profile-input form-group">
            <label>User Name</label>
            <input type="text" className="form-control" value={this.state.name} disabled />
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 col-sm-12 profile-input form-group">
            <label>Marital Status</label>
            <select
              className="form-control"
              onChange={(e) => this.setState({marital_status: e.target.value})}
              value={this.state.marital_status}>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-xs-6 col-sm-12 profile-input form-group">
            <label>Date of Birth</label>
            <DateField dateFormat="YYYY-MM-DD" value={this.state.dob} onChange={(date) => { this.setState({dob: date}); }} className="form-control" />
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <label>Current Address</label>
              <textarea
                placeholder="your current address..."
                className="form-control resize-y"
                onChange={(e) => this.setState({address1: e.target.value})}
                value={this.state.address1}>
              </textarea>
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <label>Permanent Address</label>
              <textarea
                placeholder="your permanent address..."
                className="form-control resize-y"
                onChange={(e) => this.setState({address2: e.target.value})}
                value={this.state.address2}>
              </textarea>
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <label>Emergency Contact 1</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.setState({emr_con_1: e.target.value})}
                value={this.state.emr_con_1} />
            </div>
          </div>
          <div className="col-xs-6 profile-input">
            <div className="form-group">
              <label>Emergency Contact 2</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.setState({emr_con_2: e.target.value})}
                value={this.state.emr_con_2} />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 col-sm-12 profile-input form-group">
            <label>Personal Email Address</label>
            <input type="email"
              className="form-control"
              onChange={(e) => this.setState({emp_email: e.target.value})}
              value={this.state.emp_email} />
          </div>
          <div className="col-xs-6 col-sm-12 profile-input form-group">
            <label>Blood Group</label>
            <select className="form-control" onChange={(e) => this.setState({blood_group: e.target.value})} value={this.state.blood_group}>
              <option value="">--select your blood group--</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
            </select>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-12 profile-input form-group">
            <label>Any Medical Conditions</label>
            <textarea
              placeholder="your medical conditions..."
              className="form-control resize-y"
              onChange={(e) => this.setState({medical_con: e.target.value})}
              value={this.state.medical_con}>
            </textarea>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-12 profile-input form-group">
            <ButtonRaised className="col-xs-12 indigo" onClick={() => this.props.callUpdateProfileDetails(this.state)} label="Update Profile Details" />
          </div>
        </div>
      </div>
    );
  }
}
FormProfileDetails.propTypes = {
  name:           PropTypes.string,
  jobtitle:       PropTypes.string,
  dateofjoining:  PropTypes.string,
  dob:            PropTypes.string,
  gender:         PropTypes.string,
  marital_status: PropTypes.string,
  address1:       PropTypes.string,
  address2:       PropTypes.string,
  emr_con_1:      PropTypes.number,
  emr_con_2:      PropTypes.number,
  work_email:     PropTypes.string,
  emp_email:      PropTypes.string,
  blood_group:    PropTypes.string,
  medical_con:    PropTypes.string
};
export default FormProfileDetails;
