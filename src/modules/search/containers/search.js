import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {notify} from 'src/services/notify';
import * as actions from 'appRedux/actions';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import SearchEngine from '../components/SearchEngine';
import Result from '../components/Result';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
  }
  componentWillMount () {
    this.props.requestAllSearchResult();
  }
  componentWillReceiveProps (props) {
  }
  render () {
    console.log(this.props, 'render search =================');
    let {isLoading} = this.props.search;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Search Issues'} showLoading={isLoading} />
          <div className="app-footer">
          </div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  {/* <SearchEngine />
                  <Result /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:   state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    search:     state.search.allResult
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
