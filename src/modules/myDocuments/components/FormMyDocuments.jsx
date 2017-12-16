import React from 'react';
import {CONFIG} from 'src/config/index';
import {notify} from 'src/services/notify';
import {getToken} from 'src/services/generic';
import ListDocuments from 'components/myDocuments/ListDocuments';

class FormMyDocuments extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      doc_type:   '',
      user_token: ''
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  componentDidMount () {
    this.toggleCollapse();
    window.addEventListener('resize', this.toggleCollapse);
  }
  componentWillReceiveProps (props) {
    this.setState({
      user_token: getToken()
    });
  }
  callUpdateDocuments (e) {
    let type = this.state.doc_type;
    let link1 = this.refs.file.value;
    let stop = false;
    if (type === '') {
      stop = true;
      notify('Warning!', 'Please select document type.', 'warning');
    } else if (link1 === '') {
      stop = true;
      notify('Warning!', 'Please select a file', 'warning');
    } else if (this.refs.declear.checked !== true) {
      stop = true;
      notify('Warning!', 'Mark declearation before submit', 'warning');
    }
    if (stop) {
      e.preventDefault();
    }
  }
  deleteDocument (docId) {
    this.props.onDeleteDocument(docId).then((msg) => {
      this.props.onGetMydocuments();
      notify('Success!', msg.toString(), 'success');
    }).catch((err) => {
      notify('Error!', err.toString(), 'error');
    });
  }
  toggleCollapse () {
    if ($(window).width() > 767) {
      $('#uploadDoc').addClass('in');
      $('#uploadMyDoc').removeClass('md-btn md-raised indigo auto-width-center');
    } else {
      $('#uploadDoc').removeClass('in');
      $('#uploadMyDoc').addClass('md-btn md-raised indigo auto-width-center');
    }
  }
  render () {
    let userId = this.props.user_id;
    let pageUrl = window.location.href;
    return (
      <div className="row p-t-md">
        <div className="col-sm-6 p-x-md">
          <h6 id="uploadMyDoc" className="text-center pointer" data-toggle="collapse" data-target="#uploadDoc">Upload New Documents</h6>
          <div className="row box p-a-md m-b-lg collapse" id="uploadDoc">
            <form action={CONFIG.upload_url} method="POST" encType="multipart/form-data">
              <div className="form-group">
                <label className="col-sm-12">Document Type</label>
                <select className="form-control" ref="doc_type" onChange={() => this.setState({doc_type: this.refs.doc_type.value})} value={this.state.doc_type} >
                  <option value="">--- Select Doc Type ---</option>
                  <option value="CV">CV</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Address Proof">Address Proof</option>
                  <option value="Photo">Photo</option>
                  <option value="Offer Letter">Offer Letter</option>
                  <option value="Appointment Letter">Appointment Letter</option>
                  <option value="Previous Company Experience Letter">Previous Company Experience Letter</option>
                  <option value="Previous Company Offer Letter">Previous Company Offer Letter</option>
                  <option value="Previous Company Salary Slip">Previous Company Salary Slip</option>
                  <option value="Previous Company Other Documents">Previous Company Other Documents</option>
                  <option value="Qualification Certificate">Qualification Certificate</option>
                  <option value="Other Documents">Other Documents</option>
                </select>
              </div>
              <input type="hidden" name="token" value={this.state.user_token} />
              <input type="hidden" name="user_id" value={userId} />
              <input type="hidden" name="document_type" value={this.state.doc_type} />
              <input type="hidden" name="page_url" value={pageUrl} />
              <div className="form-group">
                <label className="col-sm-12">Attachment </label>
                <input type="file" className="form-control" ref="file" name="link_1" />
              </div>
              <div className="form-group col-sm-12">
                <input type="checkbox" ref="declear" className="vertical-middle" />
                <span className="declaration"><b>*IMPORTANT: </b>&nbsp;By uploading this document you certify that these document are true and all information is correct</span>
              </div>
              <div className="form-group col-sm-12">
                <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" onClick={(e) => { this.callUpdateDocuments(e); }} />
              </div>
            </form>
          </div>
        </div>
        <ListDocuments myDocuments={this.props.my_documents} deleteDocument={this.deleteDocument} />
      </div>
    );
  }
}

export default FormMyDocuments;
