import React from 'react';
import * as _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {notify} from 'src/services/notify';
import {getToken} from 'src/services/generic';
import {CONFIG} from 'src/config/index';
import 'react-date-picker/index.css';

class UpdateEmployeeDocument extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id:    '',
      open:       false,
      doc_type:   '',
      user_token: ''
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentWillReceiveProps (props) {
    this.setState({user_token: getToken()});
    if (typeof props.user_id !== 'undefined' && props.user_id !== null) {
      this.setState({user_id: props.user_id});
    }
  }
  handleOpen () {
    this.setState({open: true});
  }
  handleClose () {
    this.setState({open: false});
  }
  callUpdateDocuments (e) {
    let type = this.state.doc_type;
    let link1 = this.refs.file.value;
    let stop = false;
    if (this.state.user_id === '') {
      stop = true;
      notify('User not selected');
    } else if (type === '') {
      stop = true;
      notify('Please select document type');
    } else if (link1 === '') {
      stop = true;
      notify('Please select a file');
    } else if (this.refs.declear.checked !== true) {
      stop = true;
      notify('Mark declearation before submit');
    }
    if (stop) {
      e.preventDefault();
    }
  }
  deleteDocument (docId) {
    this.props.onDeleteDocument(docId).then((msg) => {
      this.props.onGetUserDocument(this.state.user_id);
      notify(msg.toString());
    }).catch((err) => {
      notify(err.toString());
    });
  }
  render () {
    let pageUrl = window.location.href;
    let userDoc = [];
    _.map(this.props.user_documents, (doc, key) => {
      userDoc.push(
        <li key={key} className="list-group-item">
          <div className="clear b-t p-t">
            <div className="_500 block">
              {doc.document_type}
              <span className="glyphicon glyphicon-remove-circle pull-right pointer" onClick={() => { this.deleteDocument(doc.id); }}></span>
            </div>
            {typeof doc.link_1 === 'undefined' ? '' : <span className="text-muted"><div dangerouslySetInnerHTML={{__html: doc.link_1}}></div><br /></span>}
          </div>
        </li>
      );
    });
    return (
      <div>
        <h6 className="text-center">Uploaded Documents</h6>
        <br />
        <div>
          <ul className="list-group m-b">
            {userDoc.length === 0 ? <li className="list-group-item"><span>No document uploaded</span></li> : userDoc}
          </ul>
        </div>
        <div className="text-center">
          {this.props.disabled ? '' : <button className="btn info" onTouchTap={this.handleOpen}>Upload New Documents</button>}
        </div>
        <Dialog
          title="Upload Employee Documents"
          contentClassName="upload-doc-dialog"
          titleClassName="title"
          bodyClassName="body"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div>
            <form action={CONFIG.upload_url} method="POST" encType="multipart/form-data">
              <div className="form-group">
                <label>Document Type</label>
                <select
                  className="form-control" ref="doc_type"
                  onChange={() => this.setState({doc_type: this.refs.doc_type.value})}
                  value={this.state.doc_type}>
                  <option value="">---select doc type----</option>
                  <option value="CV">CV</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Address Proof">Address Proof</option>
                  <option value="Photo">Photo</option>
                  <option value="Offer Letter">Offer Letter</option>
                  <option value="Appointment Letter">Appointment Letter</option>
                  <option value="Previous Company Experiance Letter">Previous Company Experiance Letter</option>
                  <option value="Previous Company Offer Letter">Previous Company Offer Letter</option>
                  <option value="Previous Company Salary Slip">Previous Company Salary Slip</option>
                  <option value="Previous Company Other Documents">Previous Company Other Documents</option>
                  <option value="Qualification Certificate">Qualification Certificate</option>
                  <option value="Other Documents">Other Documents</option>
                </select>
              </div>
              <input type="hidden" name="token" value={this.state.user_token} />
              <input type="hidden" name="user_id" value={this.state.user_id} />
              <input type="hidden" name="document_type" value={this.state.doc_type} />
              <input type="hidden" name="page_url" value={pageUrl} />
              <div className="form-group">
                <label>Attachment</label>
                <input type="file" className="form-control" ref="file" name="link_1" />
              </div>
              <div className="form-group">
                <input className="vertical-middle" type="checkbox" ref="declear" />
                <span className="declaration"><b>*IMPORTANT:</b>By uploading this document you certify that these document are true and all information is correct</span>
              </div>
              <div className="form-group">
                <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" onClick={(e) => { this.callUpdateDocuments(e); }} />
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default UpdateEmployeeDocument;
