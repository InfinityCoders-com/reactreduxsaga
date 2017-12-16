import React from 'react';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {getToken} from 'src/services/generic';
import {ButtonRaised, ButtonFlat} from 'components/generic/buttons';

class ViewLeave extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      messagetouser:     '',
      notifyMsg:         'Document Required Notification Sent',
      document_required: true,
      messageByHr:       '',
      edit:              false,
      editedComment:     ''
    };
    this.handleNotify = this.handleNotify.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleExtraDay = this.handleExtraDay.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({messagetouser: '', edit: false});
  }
  handleSave (data) {
    this.props.onAddDescription(this.props.selectedLeave.id, this.state.messageByHr, data);
    this.setState({
      edit:        false,
      messageByHr: ''
    });
  }

  handleUpdate (data) {
    this.props.onAddDescription(this.props.selectedLeave.id, this.state.editedComment, data);
    this.setState({
      edit:          false,
      editedComment: ''
    });
  }

  handleExtraDay (day) {
    this.props.onAddExtraDay(this.props.selectedLeave.id, getToken(), day);
  }
  handleNotify () {
    this.props.onDocRequired(this.props.selectedLeave.id, '1', '');
  }
  handleComment () {
    this.props.onDocRequired(this.props.selectedLeave.id, '', this.state.messagetouser);
  }
  handleEdit () {
    let comments = this.props.selectedLeave.hr_comment;
    this.setState({
      edit:          true,
      editedComment: comments
    });
  }

  changeStatus (leaveid, newstatus) {
    this.props.doLeaveStatusChange(leaveid, newstatus, this.state.messagetouser);
  }

  _getChangeStatusButtons (leaveid, status) {
    let statusList = [ 'Approved', 'Pending', 'Rejected' ];
    let HRDisplay = '';
    if (this.props.loggedUser.data.role === CONFIG.HR) {
      HRDisplay = 'none';
    }
    if (this.props.selectedLeave.status === 'Approved') {
      HRDisplay = 'none';
    }
    if (this.props.selectedLeave.status === 'Rejected') {
      HRDisplay = 'none';
    }
    let soptions = _.map(statusList, (s, k) => {
      let leaveStatusColor = '';

      if (s == status) {

      } else if (s === 'Approved') {
        return <ButtonRaised key={k} style={{display: HRDisplay}} className="indigo" onClick={() => this.changeStatus(leaveid, s)} label="Approve" />;
      } else if (s === 'Pending') {
        return <ButtonRaised key={k} style={{display: HRDisplay}} className="blue" onClick={() => this.changeStatus(leaveid, s)} label="Mark Pending" />;
      } else if (s === 'Rejected') {
        return <ButtonFlat key={k} style={{display: HRDisplay}} className="m-b-sm text-danger" onClick={() => this.changeStatus(leaveid, s)} label="Reject" />;
      }
    });

    return soptions;
  }

  _getLastAppliedLeaves (dd) {
    let prev_leaves = _.map(dd, (d, k) => {
      return (
        <div className="sl-item b-info" key={k}>
          <div className="sl-content">
            <div className="sl-date text-muted">  Applied On  : {d.applied_on}</div>
            <div className="sl-date text-muted">{d.from_date} to {d.to_date} / No of Days : {d.no_of_days}</div>
            <div>
              {d.status} - {d.reason}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="box-body">
        <div className="streamline b-l m-l">
          {prev_leaves}
        </div>
      </div>
    );
  }
  _notify () {
    if (!_.isUndefined(this.props.selectedLeave.doc_require) && this.props.selectedLeave.doc_require != '0') {
      return (
        <div className="text-left" style={{marginTop: '10px', border: '1px dotted green', width: '56%', padding: '11px 5px 5px', background: '#c8e4c8', color: '#0d7b2a', borderRadius: '7px'}}>
          <label style={{fontWeight: '500'}}>{this.state.notifyMsg}</label>
        </div>
      );
    }
  }

  render () {
    let styles = _.cloneDeep(this.constructor.styles);
    let notify = this._notify();
    let changeStatusButton = this._getChangeStatusButtons(this.props.selectedLeave.id, this.props.selectedLeave.status);
    let key = parseInt(this.props.keyval);

      // previoud leaves
    let last_applied_leaves = this.props.selectedLeave.last_applied_leaves;
    let last_applied_leaves_html = '';
    if (typeof last_applied_leaves !== 'undefined' && last_applied_leaves.length > 0) {
      let aa = this._getLastAppliedLeaves(this.props.selectedLeave.last_applied_leaves);
      last_applied_leaves_html = <div><hr /><h5>Leave history</h5>{aa}</div>;
    }
    let display = '';
    if (this.props.loggedUser.data.role === CONFIG.ADMIN && this.props.selectedLeave.hr_comment === '') {
      display = 'none';
    }
    let HRDisplay = '';
    if (this.props.loggedUser.data.role === CONFIG.ADMIN) {
      HRDisplay = 'none';
    }
    let adminDisplay = '';
    if (this.props.loggedUser.data.role === CONFIG.HR) {
      adminDisplay = 'none';
    }
    let status = this.props.selectedLeave.status;
    if (this.props.selectedLeave.status === 'Pending' && this.props.selectedLeave.hr_approved === '1') {
      status = 'Approved By HR';
    }

    return (
      <div className="item">
        <div className="item-bg">
        </div>
        <div className="p-a-md">
          <div className="row m-t">
            <div className="col-xs-12 col-sm-4 leave-profile">
              <a href="" className="pull-left m-r-md">
                <span className="avatar w-96">
                  <img src={this.props.selectedLeave.user_profile_image} />
                </span>
              </a>
              <div className="clear m-b">
                <h6 className="m-a-0 m-b-xs">{this.props.selectedLeave.user_profile_name}</h6>
                <div>{this.props.selectedLeave.user_profile_jobtitle}</div>
              </div>
              <hr className="col-xs-12 hidden-sm hidden-md hidden-lg" />
            </div>
            <div className="col-xs-12 col-sm-8 leave-details">
              <div>Status - <i><b>{status}</b></i></div>
              <div>Applied On <i><b>{this.props.selectedLeave.applied_on}</b></i></div>
              <div><b>{this.props.selectedLeave.from_date} To {this.props.selectedLeave.to_date}</b></div>
              <div>No. of Days - <i><b>{this.props.selectedLeave.no_of_days}</b></i></div>
              {this.props.selectedLeave.day_status === '' ? '' : <div>Leave apply for - <i><b>{this.props.selectedLeave.day_status === '1' ? 'First Half' : 'Second Half'}</b></i></div>}
              <div>Reason - <i><b>{this.props.selectedLeave.reason}</b></i></div>
              {
                this.props.selectedLeave.leave_type !== ''
                ? <div>Leave Type - <i><b>{this.props.selectedLeave.leave_type}</b></i></div> : null
              }
              {
                this.props.selectedLeave.late_reason !== ''
                ? <div>Reason For Late Applying - <i><b>{this.props.selectedLeave.late_reason}</b></i></div> : null
              }

              {
                this.props.selectedLeave.extra_day !== '0'
                ? <div>Extra Day Added - <i><b>{this.props.selectedLeave.extra_day}</b></i></div> : null
              }
            {/* {
              this.state.document_required ?
              <div className="text-left" style={{marginTop:'10px'}}>
                <button className="md-btn md-raised indigo" onTouchTap={this.handleNotify}>ent Required</button>
              </div>:<div className="text-left" style={{marginTop:'10px',border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:'#c8e4c8',color:'#0d7b2a',borderRadius:"7px"}}>
                  <label style={{fontWeight:"500"}}>{this.state.notifyMsg}</label>
                  </div>
            } */}
              {
                this.props.selectedLeave.doc_require === '0' && this.props.selectedLeave.hr_approved !== '2' && this.props.selectedLeave.status !== 'Approved'
                ? <div className="text-left" style={{marginTop: '10px', display: HRDisplay}}>
                  <ButtonRaised className="indigo" onClick={this.handleNotify} label="Notify Document Required" />
                </div> : null
              }
              {
                this.props.selectedLeave.hr_approved === '0' && this.props.selectedLeave.hr_comment !== ''
                ? <div className="text-left" style={{marginTop: '10px', display: HRDisplay}}>
                  <ButtonRaised className="indigo" onClick={() => { this.handleSave('1'); }} label="HR Approval" />
                  <ButtonRaised className="indigo" style={{marginLeft: '3px'}} onClick={() => { this.handleSave('2'); }} label="HR Rejected" />

                </div> : null
              }
              {
                this.props.selectedLeave.hr_approved !== '0' && this.props.selectedLeave.hr_approved !== '2'
                ? <div className="text-left" style={{marginTop: '10px', border: '1px dotted green', width: '56%', padding: '11px 5px 5px', background: '#c8e4c8', color: '#0d7b2a', borderRadius: '7px'}}>
                  <label style={{fontWeight: '500'}}>Approved By HR</label>
                </div> : null
              }

              {
                this.props.selectedLeave.hr_approved !== '0' && this.props.selectedLeave.hr_approved !== '1'
                ? <div className="text-left" style={{marginTop: '10px', border: '1px dotted green', width: '56%', padding: '11px 5px 5px', background: '#c8e4c8', color: '#0d7b2a', borderRadius: '7px'}}>
                  <label style={{fontWeight: '500'}}>Rejected By HR</label>
                </div> : null
              }
              {
                this.props.selectedLeave.doc_link === '' && this.props.selectedLeave.doc_require === '1'
                  ? notify : null
              }
              {
                this.props.selectedLeave.doc_link !== ''
                ? <form method="get" target="_blank" action={this.props.selectedLeave.doc_link}>
                  <div className=" text-left" style={{marginTop: '10px'}}>
                    <ButtonRaised className="indigo" label="View Document" />
                  </div>
                </form> : null
              }

              {
                this.props.selectedLeave.late_reason === '' && this.props.selectedLeave !== 'Rejected' ? null
                : <div className='row m-0' style={{display: adminDisplay}}>
                  <div className='col-sm-3 p-0 pt-5'>
                    <div className=" text-left" style={{marginTop: '10px'}}>
                      <ButtonRaised className="indigo" onClick={() => { this.handleExtraDay('0.5'); }} label="Add Half Day" />
                    </div>
                  </div>
                  <div className='col-sm-3 p-0'>
                    <div className="text-left" style={{marginTop: '10px'}}>
                      <ButtonRaised className="indigo" onClick={() => { this.handleExtraDay('1'); }} label="Add Full Day" />
                    </div>
                  </div>
                  {
                    this.props.selectedLeave.extra_day === '0' ? null
                    : <div className='col-sm-4 p-0'>
                      <div className="text-left" style={{marginTop: '10px'}}>
                        <ButtonRaised className="red" onClick={() => { this.handleExtraDay('0'); }} label="Remove Extra Day" />
                      </div>
                    </div>
                  }
                </div>
              }
            {/* {
              this.props.selectedLeave.doc_require === '0' ? null : <div className="text-left" style={{marginTop:'10px',border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:'#c8e4c8',color:'#0d7b2a',borderRadius:"7px"}}>
                  <label style={{fontWeight:"500"}}>{this.state.notifyMsg}</label>
                  </div>
            } */}
              <br />
              {
                this.props.selectedLeave.comment === ''
                ? <div style={{display: adminDisplay}}>
                  <input type="text" className="md-input" placeholder="Enter message for employee" onChange={(e) => this.setState({messagetouser: e.target.value})} value={this.state.messagetouser} />
                  <div className="text-right" style={{marginTop: '10px'}}>
                    <ButtonRaised className="indigo" onClick={this.handleComment} label="Comment" />
                  </div>
                </div> : <div>
                  <b>Comment</b><br />
                  <div className="text-left" style={{marginTop: '10px', border: '1px dotted #514eff', width: '56%', padding: '11px 5px 5px', background: 'rgb(191, 195, 245)', color: 'rgb(64, 78, 247)', borderRadius: '7px'}}>
                    <label style={{fontWeight: '500'}}>{this.props.selectedLeave.comment}</label>
                  </div>
                </div>
              }
              {
                this.props.selectedLeave.hr_comment === '' && this.props.loggedUser.data.role === CONFIG.HR
                ? <div>
                  <b>Write Entire Leave Details After Talking To Employee</b><br />
                  <input type="text" className="md-input"
                    onChange={(e) => this.setState({messageByHr: e.target.value})}
                    value={this.state.messageByHr} />
                  <div className="text-right" style={{marginTop: '10px'}}>
                    <ButtonRaised className="indigo" onClick={() => { this.handleSave(''); }} label="Save" />
                  </div>
                </div> : null
             }
              <div>
                <div>
                 {this.props.loggedUser.data.role === CONFIG.HR && this.props.selectedLeave.hr_comment === ''
                   ? null : <div style={{display: display}}>
                     <b>Description By HR</b><br />
                     <div className="text-left" style={{marginTop: '10px', border: '1px dotted #514eff', width: '56%', padding: '11px 5px 5px', background: 'rgb(191, 195, 245)', color: 'rgb(64, 78, 247)', borderRadius: '7px'}}>
                       <label style={{fontWeight: '500'}}>{this.props.selectedLeave.hr_comment}</label>
                     </div>
                   </div>
                  }
                 {
                   this.state.edit && this.props.loggedUser.data.role === CONFIG.HR
                   ? <div>
                     <input type="text" className="md-input"
                       onChange={(e) => this.setState({editedComment: e.target.value})}
                       value={this.state.editedComment} />
                     <div className="text-right" style={{marginTop: '10px'}}>
                     </div>
                   </div>
                   : null
                 }
                 {
                    this.props.selectedLeave.hr_comment !== ''
                 ? <div className='row m-0' style={{display: HRDisplay}}>
                   <div className='col-sm-3 p-0'>
                     {
                       this.state.edit
                       ? <div className="text-left" style={{marginTop: '10px'}}>
                         <ButtonRaised className="indigo" onClick={() => { this.handleUpdate(''); }} label="Save" />
                       </div>
                       : <div className=" text-left" style={{marginTop: '10px'}}>
                         <ButtonRaised className="indigo" onClick={() => { this.handleEdit(); }} label="Edit" />
                       </div>
                     }
                   </div>
                 </div> : null
               }
                </div>
              </div>
              <br />
              <br />
              {changeStatusButton}
              {last_applied_leaves_html}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewLeave.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
};

export default ViewLeave;
