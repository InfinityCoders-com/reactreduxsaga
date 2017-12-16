import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ListLeaves = ({listItems, selectedLeave, selectLeave}) => {
  const toggleCollapse = (i) => {
    let height = $('#leaveDetails').height();
    if ($(window).width() > 767 && i) {
      $('#leavesList').addClass('in').css({height: height + 'px'});
      $('#leavesList .scroll-leave-list').css({height: height + 'px'});
    } else if ($(window).width() > 767) {
      $('#leavesList').addClass('in');
      $('#leavesList .scroll-leave-list').css({height: height + 'px'});
    } else {
      $('#leavesList').removeClass('in');
    }
  };
  $(document).ready(function () {
    $('#leavesList').on('show.bs.collapse', function () {
      $('.leave-list-collapse .expand-icon').text('expand_less');
    });
    $('#leavesList').on('hide.bs.collapse', function () {
      $('.leave-list-collapse .expand-icon').text('expand_more');
    });
    $(window).on('resize', function () {
      toggleCollapse(true);
    });
    toggleCollapse(false);
  });
  let LeavesList = _.map(listItems, (leave, key) => {
    let leaveStatusColor = '';
    let selectedDivClass = '';
    if (leave.status === 'Approved') {
      leaveStatusColor = 'green-A200';
    } else if (leave.status === 'Pending') {
      leaveStatusColor = 'blue';
    } else if (leave.status === 'Rejected') {
      leaveStatusColor = 'red-500';
    }
    if (leave.id === selectedLeave.id) {
      selectedDivClass = 'yellow';
    }
    return (
      <div key={key} className={`list-item pointer m-b b-l b-l-2x b-${leaveStatusColor} ${selectedDivClass}`} onClick={() => selectLeave(leave.id)}>
        <div className="list-left">
          <span className="w-40 avatar">
            <img src={leave.user_profile_image} className="img-circle" />
          </span>
        </div>
        <div className="list-body">
          {leave.user_profile_name}
          <small className="block">
            Applied on : {leave.applied_on}
          </small>
        </div>
      </div>
    );
  });
  return (
    <div className="row-col">
      <div className='text-center leave-list-collapse hidden-md hidden-sm hidden-lg' data-toggle="collapse" data-target="#leavesList">
        <h6>List Leaves</h6>
        <span className="material-icons expand-icon">expand_more</span>
      </div>
      <div id="leavesList" className="collapse">
        <div className="list inset scroll scroll-leave-list">
          {LeavesList}
        </div>
      </div>
    </div>
  );
};

ListLeaves.PropTypes = {
  listItems:     PropTypes.array.isRequired,
  selectedLeave: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  selectLeave: PropTypes.func.isRequired
};

export default ListLeaves;
