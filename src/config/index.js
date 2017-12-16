import config_development from './development';
import config_production from './production';

let CONFIG = config_development;

console.log('Environment :: ' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  CONFIG = config_production;
}

CONFIG['ADMIN'] = 'Admin';
CONFIG['HR'] = 'HR';
CONFIG['GUEST'] = 'Guest';
CONFIG['EMPLOYEE'] = 'Employee';
CONFIG['WORKING_DAY'] = 'WORKING_DAY';
CONFIG['LEAVE_DAY'] = 'LEAVE_DAY';
CONFIG['DEFAULT_PASSWORD'] = 'java@123';
CONFIG['jwt_secret_key'] = 'HR_APP';
CONFIG['PAGEROLES'] = [];
CONFIG['minimum_months_hr_salary_view'] = 8;

export {CONFIG};
