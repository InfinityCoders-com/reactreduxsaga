import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import { searchAlgo } from 'src/index.js';
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
      searchString: '',
      selectedAuthor: '',
      selectedDate: '',
      selectedSearchType: ''
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onAuthorchange = this.onAuthorchange.bind(this);
    this.onDatechange = this.onDatechange.bind(this);
    this.onSearchTypechange = this.onSearchTypechange.bind(this);
  }
  componentWillMount () {
    this.props.requestAllSearchResult();
  }
  componentWillReceiveProps (props) {
    this.setState({data: props.search.data});
  }
  onInputchange (e) {
    const { searchString, selectedAuthor, selectedDate, selectedSearchType } = this.state;
    const data = searchAlgo( e.target.value, selectedAuthor, selectedDate, selectedSearchType, this.props.search.data );
    this.setState({searchString: e.target.value, data: data});
  }
  onAuthorchange (e) {
    const { searchString, selectedAuthor, selectedDate, selectedSearchType } = this.state;
    const data = searchAlgo( searchString, e.target.value, selectedDate, selectedSearchType, this.props.search.data );
    this.setState({selectedAuthor: e.target.value, data: data});
  }
  onDatechange (e) {
    const { searchString, selectedAuthor, selectedDate, selectedSearchType } = this.state;
    const data = searchAlgo( searchString, selectedAuthor, e.target.value, selectedSearchType, this.props.search.data );
    this.setState({selectedDate: e.target.value, data: data});
  }
  onSearchTypechange (e) {
    const { searchString, selectedAuthor, selectedDate, selectedSearchType } = this.state;
    const data = searchAlgo( searchString, selectedAuthor, selectedDate, e.target.value, this.props.search.data );
    this.setState({selectedSearchType: e.target.value, data: data});
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
    console.log(this.state, '=======================')
    return (
      <div>
        {/* <Menu {...this.props} /> */}
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Search Issues'} showLoading={isLoading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <SearchEngine
                    onInputchange = {(e) => this.onInputchange(e)}
                    onAuthorchange = {(e) => this.onAuthorchange(e)}
                    onDatechange = {(e) => this.onDatechange(e)}
                    onSearchTypechange = {(e) => this.onSearchTypechange(e)}
                    author = {author}
                    date = {date}
                    type = {type}
                  />
                  {isSuccess ? <Result data={this.state.data} /> : null}
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
