import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router';
import {DATA} from 'components/menu/menuObject';

const DisplayMenuList = ({rolePages, click}) => {
  const menuToggle = () => {
    $('#aside').modal('hide');
  };
  let groupIndex = _.groupBy(DATA, function (value) { return value.plabel; });
  let links = _.map(groupIndex, (subChildren, parentLabel) => {
    let linkList = _.map(subChildren, (subChild, k) => {
      let validPath = subChild.path.replace(/\//g, '');
      if (!_.isEmpty(_.find(rolePages, ['page_name', validPath]))) {
        return (
          <li key={k} className="hidden-folded" onClick={() => menuToggle()}>
            <span style={{'fontSize': 11, 'fontWeight': 600}}>
              <Link to={subChild.path}>{subChild.label}</Link>
            </span>
          </li>
        );
      }
    });
    let navMenuId = subChildren[0].path.replace(/\//g, '');
    let output = <li key={parentLabel} id={navMenuId} onClick={() => { click(navMenuId); }}>
      <a>
        <span className="nav-caret text-muted">
          <i className="fa fa-caret-down"></i>
        </span>
        <span className="nav-text">{parentLabel}</span>
      </a>
      <ul className="nav-sub">{linkList}</ul>
    </li>;
    let childLinksCount = _.size(_.pullAll(linkList, [undefined]));
    if (childLinksCount === 0) { output = null; }
    if (parentLabel === 'undefined' || childLinksCount === 1) { output = linkList; }
    return (output);
  });
  return (<ul className="nav">{links}</ul>);
};

export default DisplayMenuList;

DisplayMenuList.PropTypes = {
  rolePages: PropTypes.object.isRequired,
  click:     PropTypes.func.isRequired
};
