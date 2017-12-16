import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';

const EmployeeLifeCycle = ({employee_life_cycle, handleChangeSteps}) => {
  $(document).ready(function () {
    $('#empLifeCycle').on('show.bs.collapse', function () {
      $('.emp-life-cycle .expand-icon').text('expand_less');
    });
    $('#empLifeCycle').on('hide.bs.collapse', function () {
      $('.emp-life-cycle .expand-icon').text('expand_more');
    });
  });
  let display = _.map(employee_life_cycle, (stage, key) => {
    let steps = _.map(stage.steps, (step, k) => {
      return (
        <div className="steps" key={k}>
            {step.text}
          <span className="step-toggle-button">
            <ToggleButton
              inactiveLabel={<span className="material-icons">close</span>}
              activeLabel={<span className="material-icons">check</span>}
              value={!!step.status}
              onToggle={() => {
                handleChangeSteps(step.id);
              }}
            />
          </span>
        </div>
      );
    });
    return (
      <div className="col-xs-4 life-cycle-category" key={key}>
        <div className="col-xs-12 life-cycle-header">
          {stage.text}
          <hr className="m-t-0" />
        </div>
        <div className="col-xs-12">
          {steps}
        </div>
      </div>
    );
  });
  return (
    <div className="col-xs-12 employee-life-cycle">
      <div className="text-center emp-life-cycle" data-toggle="collapse" data-target="#empLifeCycle">
        <h6>Employee Life Cycle</h6>
        <span className="material-icons expand-icon">expand_more</span>
      </div>
      <div className="collapse" id="empLifeCycle">
        <hr className="m-t-0" />
        <div className="rowflex">
          {display}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLifeCycle;

EmployeeLifeCycle.PropTypes = {
  data: PropTypes.shape({
    employee_life_cycle: PropTypes.object.isRequired
  }).isRequired,
  handleChangeSteps: PropTypes.func.isRequired
};
