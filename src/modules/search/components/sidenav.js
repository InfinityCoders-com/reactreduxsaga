import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/generic/input/checkbox';
import GoogleLogin, {GoogleLogout} from 'react-google-login';


const SideNav = ({searchWithin, searchWithinValue}) => {
  return (
    <div className="well">
      <h3> Advanced Search </h3>
      <ul className='sideNav'>
        <li><Checkbox onchange={searchWithin} value={searchWithinValue} label='Search Within Results' /></li>
      </ul>
      <div>
        <div>
          <GoogleLogin
            clientId="738838019990-6m0er1meljtdrua2i132tj3ml8q8e6ne.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(e)=>{console.log(e,'asdasd');
            }}
            onFailure={(e)=>{console.log(e,'fail');
            }}
          />
        </div>
        <div>
          {/* <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={()=>{console.log( 'logout')}}
          /> */}
        </div>
      </div>
    </div>
  );
};

SideNav.PropTypes = {};

export default SideNav;
