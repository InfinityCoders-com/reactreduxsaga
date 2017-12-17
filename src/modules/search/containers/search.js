import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
// import {notify} from 'src/services/notify';
import * as actions from 'appRedux/actions';
// import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import SearchEngine from '../components/SearchEngine';
import Result from '../components/Result';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data:         null,
      searchString: ''
    };
    this.onchange = this.onchange.bind(this);
  }
  componentWillMount () {
    this.props.requestAllSearchResult();
  }
  componentWillReceiveProps (props) {
  }
  onchange (e) {
    this.setState({searchString: e.target.value});
  }
  render () {
    let {isLoading, isSuccess, data} = this.props.search;
    let author = [];
    let date = [];
    let type = [];
    if (isSuccess) {
      author = data.map(item => item.author).filter((value, index, self) => self.indexOf(value) === index);
      date = data.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
      type = data.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index);
    }
    return (
      <div>
        {/* <Menu {...this.props} /> */}
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Search Issues'} showLoading={isLoading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <SearchEngine onchange={(e) => this.onchange(e)} author={author} date={date} type={type} />
                  {isSuccess ? <Result data={data} /> : null}
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
