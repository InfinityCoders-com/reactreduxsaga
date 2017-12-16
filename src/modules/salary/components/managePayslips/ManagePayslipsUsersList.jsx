import React from 'react';
import * as _ from 'lodash';
import $ from 'jquery';
import {notify} from 'src/services/notify';
import {getToken} from 'src/services/generic';
import {CONFIG} from 'src/config/index';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class ManagePayslipsUsersList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_token:           '',
      'email_paylsips_ids': [],
      'openIframe':         false,
      'checked':            [],
      openTransfer:         false
    };
    this._select_payslips_to_email = this._select_payslips_to_email.bind(this);
    this.handleOpenIframe = this.handleOpenIframe.bind(this);
    this.handleCloseIframe = this.handleCloseIframe.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.change = this.change.bind(this);
    this.getTransfer = this.getTransfer.bind(this);
    this.closeTrnsfer = this.closeTrnsfer.bind(this);
    this.openTrnsfer = this.openTrnsfer.bind(this);
  }
  handleOpenIframe () {
    this.setState({openIframe: true});
  }

  handleCloseIframe () {
    this.setState({openIframe: false});
  }

  _select_payslips_to_email (e) {
    let existing_email_paylsips_ids = this.state.email_paylsips_ids;
    let checked_payslip_id = e.target.value;
    let checked_status = e.target.checked;

    let new_email_paylsips_ids = existing_email_paylsips_ids;

    if (checked_status == true) {
      new_email_paylsips_ids.push(checked_payslip_id);
    } else {
      _.pull(new_email_paylsips_ids, checked_payslip_id);
    }
    this.setState({email_paylsips_ids: new_email_paylsips_ids});
  }

  componentWillReceiveProps (props) {
    this.setState({email_paylsips_ids: [], user_token: getToken()});
  }
  selectAll (e) {
    $('input[name=employee]').prop('checked', e.target.checked);
    let check = [];
    if (e.target.checked == true) {
      _.map(this.props.users, (user) => {
        check.push(user.user_Id);
      });
    } else {
      check = [];
    }
    this.setState({checked: check});
  }
  change (userid, e) {
    let check = this.state.checked;
    if (e.target.checked == true) {
      if (_.includes(check, userid) == false) {
        check.push(userid);
      }
    } else {
      if (_.includes(check, userid) == true) {
        _.pull(check, userid);
      }
    }
    this.setState({checked: check});
  }
  getTransfer () {
    this.props.onGetTransferList(this.state.checked).then((data) => {
      this.openTrnsfer();
    }).catch((err) => {
      notify(err.toString());
    });
  }
  openTrnsfer () {
    this.setState({openTransfer: true});
  }

  closeTrnsfer () {
    this.setState({openTransfer: false});
  }
  validate (e) {
    let stop_user = '';
    _.map(this.props.users, (user, keyval) => {
      if (typeof this.props.all_users_latest_payslip !== 'undefined' && this.props.all_users_latest_payslip.length > 0) {
        let findUser = _.find(this.props.all_users_latest_payslip, {'user_Id': user.user_Id});
        if (typeof findUser === 'undefined') {
          if (_.includes(this.state.checked, user.user_Id) == true) {
            stop_user += '\n' + user.user_Id;
          }
        }
      }
    });

    if (stop_user !== '') {
      let res = confirm('Payslip not generated for user ID :' + stop_user + '\n Do you want to submit');
      if (!res) {
        e.preventDefault();
      }
    }
  }

  render () {
    let styles = _.cloneDeep(this.constructor.styles);

    // ----account no.

    let employee_account_no = this.props.managePayslips.employee_account_no;

    let Account_list = [];
    _.map(employee_account_no, (empAcc, key) => {
      Account_list.push(employee_account_no[key] + <br />);
    });

// ------user list

    let usersList = _.map(this.props.users, (user, keyval) => {
      let userid = user.user_Id;

      let generatedPayslipIdToEmail = '';

      let payslipGenerated = 0;
      let email_to_user_status = 0;
      if (typeof this.props.all_users_latest_payslip !== 'undefined' && this.props.all_users_latest_payslip.length > 0) {
        let findUser = _.find(this.props.all_users_latest_payslip, {'user_Id': userid});
        if (typeof findUser !== 'undefined') {
          payslipGenerated = 1;
          if (typeof findUser.status !== 'undefined') {
            email_to_user_status = findUser.status;
          }

          if (typeof findUser.id !== 'undefined' && generatedPayslipIdToEmail == '') {
            generatedPayslipIdToEmail = findUser.id;
          }
        }
      }

      let selectedUserId = this.props.selectedUserId;
      let styles = _.cloneDeep(this.constructor.styles);
      let key = parseInt(userid);
      let profileImae = user.slack_profile.image_72;
      let backgroundClass = styles.cursorPointer;
      if (selectedUserId == userid) {
        backgroundClass = styles.selectedUser;
      }

      // ---
      let payslipGeneratedHtmlClass = styles.pendingStatus;
      let Payslip_Generated_text = 'Payslip Not Generated';
      if (payslipGenerated == 1) {
        payslipGeneratedHtmlClass = styles.doneStatus;
        Payslip_Generated_text = 'Payslip Generated';
      }

      let checkbox_send_email = <input type="checkbox" name="send_payslip_emails" value={generatedPayslipIdToEmail} style={{
        'verticalAlign': 'middle'
      }} onChange={this._select_payslips_to_email} />;
      let email_to_user_statusHtmlClass = styles.pendingStatus;
      if (email_to_user_status == 1) {
        email_to_user_statusHtmlClass = styles.doneStatus;
        // checkbox_send_email = ""
      }
      if (payslipGenerated == 0) {
        // if payslip is not generated then there is no option to send email
        checkbox_send_email = '';
      }
      // ---

      return (
        <li className="list-item b-b" key={keyval} style={backgroundClass}>
          <div className="list-left text-center">
            <span className="w-40 avatar" onClick={() => this.props.onUserClick(userid)}>
              <img src={profileImae} />
            </span>
            <br />
            <input type="checkbox" onChange={(e) => this.change(userid, e)} className="m-t" name="employee" value={userid || ''} />
          </div>
          <div className="list-body">
            <div onClick={() => this.props.onUserClick(userid)}>
              <div>{user.name}</div>
              <small className="text-muted text-ellipsis">{user.jobtitle}</small>
              <small className="text-muted text-ellipsis">
                <b>Emp Id : {userid}</b>
              </small>
            </div>

            <div className="text-muted" style={payslipGeneratedHtmlClass}>{Payslip_Generated_text}</div>
            <div className="text-muted" style={email_to_user_statusHtmlClass}>{checkbox_send_email}Email to Employee</div>

          </div>
        </li>
      );
    });

    let googleDriveEmailStatus = <span className="text-info">Google Drive Email - {this.props.google_drive_emailid}</span>;
    if (this.props.google_drive_emailid == '' || this.props.google_drive_emailid == false) {
      googleDriveEmailStatus = <span className="text-danger">Google drive token not found. Plz do login first!!</span>;
    }
    // ---
    let list = this.state.checked;
    let list_item = [];
    _.map(list, (val, i) => {
      list_item.push(<input key={i} type="hidden" name="user_id[]" value={val} />);
    });
    return (
      <div className="row">
        <div className="col-12">

          <div className="row" style={{
            'marginTop': 12
          }}>
            <div className="col-lg-12 col-md-12">
              <div style={{
                'marginBottom': 5
              }}>
                <b>{googleDriveEmailStatus}</b>
              </div>
              <RaisedButton label="Google Drive Login" onTouchTap={this.handleOpenIframe} />
            </div>
          </div>

          <div className="row" style={{
            'marginTop': 8
          }}>
            <div className="col-lg-6 col-md-6">
              <button className="md-btn md-raised m-b-sm indigo" onClick={() => (this.props.callEmailPayslips(this.state.email_paylsips_ids))}>Email Payslips</button>
            </div>
            <div className="col-lg-6 col-md-6">
              <form style={styles.form} action={CONFIG.transfer_link} method="POST" target='_blank' onSubmit={(e) => this.validate(e)}>
                {list_item}
                <input type="hidden" name="token" value={this.state.user_token} />
                <input type='submit' className="md-btn md-raised m-b-sm indigo m-l-sm-xs " name="submit" value="Transfer" />
              </form>
            </div>
          </div>

          <br />
          <Dialog title="Google authentication for drive" modal={false} open={this.state.openIframe} onRequestClose={this.handleCloseIframe} contentStyle={{
            'width': '80%'}}>
            <iframe ref="myIframe" src={CONFIG.google_login_btn_page_url} style={{
              'width':  '100%',
              'height': '300px'
            }}> </iframe>
          </Dialog>
          <br />

          <div className="box">
            <ul className="list no-border p-b">
              <li className="list-item b-b">
                <input type="checkbox" name="select_all" onChange={(e) => this.selectAll(e)} />
                Select All Users
              </li>
              {usersList}
            </ul>
          </div>
        </div>
        <Dialog title="Employee Account Transfer" open={this.state.openTransfer} onRequestClose={this.closeTrnsfer} contentStyle={{
          'width': '50%'
        }} autoScrollBodyContent>
          <ul className="list-group">
            <li className="list-group-item" style={styles.headTransfer}>
              <div className="col-md-12">Account No.&#09;Salary&#09;Name</div>
            </li>
            <li className="list-group-item" style={styles.bodyTransfer}>
              {Account_list}
            </li>
          </ul>

        </Dialog>
      </div>
    );
  }
}

ManagePayslipsUsersList.styles = {
  cursorPointer: {
    'cursor': 'pointer'
  },
  selectedUser: {
    'background': '#03a9f4',
    'color':      'white'
  },
  pendingStatus: {
    'background': 'red',
    'color':      'white',
    'padding':    '2px',
    'fontSize':   '12px'
  },
  doneStatus: {
    'background': 'green',
    'color':      'white',
    'padding':    '2px',
    'fontSize':   '12px'
  },
  headTransfer: {
    borderBottom: '1px solid gainsboro',
    overflow:     'hidden',
    fontWeight:   'bold'
  },
  bodyTransfer: {
    borderBottom: '1px solid gainsboro',
    overflow:     'hidden'
  },
  form: {
    width: '65%',
    float: 'right'
  }
};

export default ManagePayslipsUsersList;
