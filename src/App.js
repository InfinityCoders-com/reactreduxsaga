import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from 'appRedux/actions';

class APP extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
  }
  componentWillMount () {
    console.log('componentWillMount this.props', this.props);
  }
  componentWillReceiveProps (props) {
    console.log('componentWillReceiveProps ======', props);
  }
  render () {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:    state.frontend.toJS(),
    logged_user: state.logged_user.userLogin
  };
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(APP));
