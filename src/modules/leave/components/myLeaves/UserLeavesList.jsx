import React from 'react';
import * as _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {notify} from 'src/services/notify';
import {getToken} from 'src/services/generic';
import {CONFIG} from 'src/config/index';
import MyLeavesList from 'components/leave/myLeaves/MyLeavesList';

class UserLeavesList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open:       false,
      id:         '',
      user_token: ''
    };
    this.cancelLeave = this.cancelLeave.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({user_token: getToken()});
  }

  cancelLeave (userId, from_date) {
    this.props.onCancelLeave(userId, from_date).then((data) => {
      notify(data);
    }).catch((err) => {
      notify(err);
    });
  }

  handleOpen (id) {
    this.setState({open: true, id: id});
  }
  handleClose () {
    this.setState({open: false});
  }

  callUpdateDocuments (e) {
    let docProof = this.refs.file.value;
    let stop = false;
    if (docProof === '') {
      stop = true;
      notify('Please select a file');
    }
    if (stop) {
      e.preventDefault();
    }
  }

  render () {
    let page_url = window.location.href;
    let leavesList = _.map(this.props.userLeaves.leaves, (leave, key) => {
      return <MyLeavesList key={key} leave={leave} handleOpen={this.handleOpen} cancelLeave={this.cancelLeave} />;
    });
    // className="dialog-content"
    return (
      <div className="row">
        <Dialog title="Upload Leave Document"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentClassName="dialog-content"
          autoScrollBodyContent>
          <div>
            <form action={CONFIG.upload_leave_url} method="POST" encType="multipart/form-data">
              <input type="hidden" name="token" value={this.state.user_token} />
              <input type="hidden" name="leaveid" value={this.state.id} />
              <input type="hidden" name="page_url" value={page_url} />
              <div className="form-group">
                <label>Attachment</label>
                <input type="file" className="form-control" ref="file" name="docProof" />
              </div>
              <div className="form-group">
                <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" onClick={(e) => {
                  this.callUpdateDocuments(e);
                }} />
              </div>
            </form>
          </div>
        </Dialog>
        <div className="row-col">
          <div className="list white">
            {leavesList}
          </div>
        </div>
      </div>
    );
  }
}

export default UserLeavesList;
