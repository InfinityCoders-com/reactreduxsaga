import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import DocumentsList from 'modules/policyDocuments/components/DocumentsList';
import * as actions from 'appRedux/actions';

class PolicyDocumentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
  }
  componentWillMount () {
    this.props.requestUserPolicyDocument();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status && isNotValid.redirectTo !== '/policy_documents') {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Policy Documents'} showLoading={this.props.policyDocuments.isLoading} />
          <DocumentsList policyDocuments={this.props.policyDocuments} onUpdateReadStatus={this.props.requestUpdateReadStatus} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PolicyDocumentContainer));
