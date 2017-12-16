import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import * as actions from 'appRedux/actions';
import * as actions_templates from 'appRedux/templates/actions/templates';
import Variables from '../components/Variable';

class VariablesContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
  }
  componentWillMount () {
    this.props.onFetchVariables();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Template Variable'} showLoading={this.props.frontend.show_loading} />
          <Variables {...this.props} />
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    frontend:   state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    variable:   state.template.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onFetchVariables: () => {
      return dispatch(actions_templates.get_variable());
    },
    onSaveVariable: (id, variable) => {
      return dispatch(actions_templates.saveVariable(id, variable));
    },
    onDeleteVariable: (id) => {
      return dispatch(actions_templates.deleteVariable(id));
    }
  };
};

const VisibleVariablesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariablesContainer);

const RouterVisibleVariablesContainer = withRouter(VisibleVariablesContainer);

export default RouterVisibleVariablesContainer;
