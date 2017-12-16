import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Message from 'components/generic/Message';

class DocumentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      errClass: 'hidden',
      errMsg:   ''
    };
    this.hideError = this.hideError.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
  }
  hideError (e) {
    e.preventDefault();
    this.setState({
      errClass: 'hidden',
      errMsg:   ''
    });
  }
  updateReadStatus (doc, e) {
    let updateDoc = [];
    _.map(this.props.policyDocuments.data, (document, i) => {
      if (document.read !== 0) {
        updateDoc.push(document.name);
      }
    });
    updateDoc.push(doc.name);
    this.props.onUpdateReadStatus(updateDoc);
  }
  render () {
    let documentsList = _.map(this.props.policyDocuments.data, (doc, i) => {
      let isReadStrip = doc.read ? ' is-read-document' : ' is-not-read-document';
      return (
        <div key={i} className={'m-y-sm policyDocumentsList clear' + isReadStrip}>
          <h5>{doc.name}</h5>
          <a href={doc.link} target="_blank" onClick={() => this.updateReadStatus(doc)}>{doc.link}</a>
        </div>
      );
    });
    return (
      <div className="app-body" id="view">
        <div className='col-sm-12'>
          <Message className={this.state.errClass} message={this.state.errMsg} onClick={this.hideError} />
        </div>
        <div className="col-xs-12">
          <div className="policyDocumentsList m-t-md clear">
            <h4>Policy Documents List</h4>
            <small className="text-danger"><i>(Please read & accept all the policy documents to get access to this site. Incase of issues contact HR)</i></small>
          </div>
          {documentsList}
        </div>
      </div>
    );
  }
}

DocumentsList.PropTypes = {
  policyDocuments:    PropTypes.array.isRequired,
  onUpdateReadStatus: PropTypes.func.isRequired
};

export default DocumentsList;
