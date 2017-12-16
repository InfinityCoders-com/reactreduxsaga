import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {bindActionCreators} from 'redux';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import Message from 'components/generic/Message';
import FormUploadPolicyDocument from 'modules/policyDocuments/components/formUploadPolicyDocument';
import ListAllPolicyDocument from 'components/policyDocuments/ListAllPolicyDocument';
import * as actions from 'appRedux/actions';

class UploadPolicyDocumentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      docs:     [],
      errClass: 'hidden',
      errMsg:   ''
    };
    this.submitDocs = this.submitDocs.bind(this);
    this.hideError = this.hideError.bind(this);
    this.submitNewListofDocs = this.submitNewListofDocs.bind(this);
  }
  componentWillMount () {
    this.props.requestUserPolicyDocument();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      docs: props.policyDocuments.data
    });
    let {isSuccess, isError, message} = props.policyDocuments;
    if (isSuccess && message !== '') {
      notify('Success!', message, 'success');
    } else if (isError) {
      notify('Error!', message, 'error');
    }
  }
  hideError (e) {
    e.preventDefault();
    this.setState({
      errClass: 'hidden',
      errMsg:   ''
    });
  }
  submitNewListofDocs (newList) {
    this.props.requestSubmitDocs(newList);
  }
  submitDocs (docs) {
    this.props.requestSubmitDocs(docs);
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Upload Policy Documents'} showLoading={this.props.policyDocuments.isLoading} />
          <div className="app-body" id="view">
            <div className="row">
              <Message className={this.state.errClass} message={this.state.errMsg} onClick={this.hideError} />
            </div>

              <div className="col-sm-6 col-xs-12 col-md-6 m-t-md m-b-md">
                <FormUploadPolicyDocument submitDocs={this.submitDocs} docs={this.state.docs} {...this.props} />
              </div>
              <br />
              <div className="col-sm-6 col-xs-12 col-md-6">
                <ListAllPolicyDocument policyDocuments={this.state.docs} submitNewListofDocs={this.submitNewListofDocs} />
              </div>

          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    loggedUser:      state.logged_user.userLogin,
    policyDocuments: state.policyDocuments.policyDocument
  };
}

const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadPolicyDocumentContainer));
