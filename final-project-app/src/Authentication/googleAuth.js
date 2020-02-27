import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Typography from '@material-ui/core/Typography';
import history from './history';

const successGoogle = (response) => {
  // check if user is admin or customer
  async function checkIfUserExist () {
    try {
      const user = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/user/check', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        }),
        mode: 'cors',
        body: JSON.stringify({ google_id: response.googleId })

      }).then(user => user.json());

      if (user.status === 200 && user.data !== null) {
        // update admin access token - only for admin API requests
        if (user.data.admin == true) {
          updateAdminAccessToken(response);
        }

        setSession(response, user.data);
        history.replace('/home');
      }

      // user not exist, signup with google account
      if (user.status === 200 && user.data === null) {
        history.replace('/signup');
      }
      if (user.status === 500) {
        history.replace('/error');
      }
    } catch (e) {
      history.replace('/error');
    }
  };

  checkIfUserExist();
};

const updateAdminAccessToken = async (response) => {
  const update = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/user/update', {
    method: 'PUT',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    }),
    body: JSON.stringify({
      google_id: response.googleId,
      access_token: response.uc.access_token
    })
  })
    .then(update => update.json());
  if (update.status == 500 || (update.status == 200 && update.data == false)) {
    history.replace('/error');
  }
};

const setSession = (response, userData) => {
  // session is available for 1h
  const expiresAt = JSON.stringify((response.tokenObj.expires_in * 1000) + new Date().getTime());
  sessionStorage.setItem('expires_at', expiresAt);
  sessionStorage.setItem('isAdmin', userData.admin);
  sessionStorage.setItem('user_name', response.Rt.Ad);
  sessionStorage.setItem('user_id', response.googleId);
  sessionStorage.setItem('profile_img', response.Rt.kL);
  sessionStorage.setItem('company_name', userData.company);
  sessionStorage.setItem('access_token', response.uc.access_token);
};

const logout = () => {
  sessionStorage.removeItem('expires_at');
  sessionStorage.removeItem('isAdmin');
  sessionStorage.removeItem('user_name');
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('profile_img');
  sessionStorage.removeItem('company_name');
  sessionStorage.removeItem('access_token');

  // navigate to the home route
  history.replace('/');
};

const isAuthenticated = () => {
  // Check whether the current time is past
  // access token's expiry time
  const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

const signupUser = (response) => {
  async function signup () {
    try {
      const res = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/user/create', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        }),
        mode: 'cors',
        body: JSON.stringify({ google_id: response.googleId })

      }).then(res => res.json());
      if (res.status == 200 && res.data !== null) {
        setSession(response, { admin: false, company: '' });
        history.replace('/home');
      } else {
        history.replace('/error');
      }
    } catch (e) {
      history.replace('/error');
    }
  }
  signup();
};

const failGoogle = (response) => {
  logout();
};

const GoogleAuth = (props) => {
  const { message } = props;
  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogin
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

const GoogleOut = (props) => {
  const { message } = props;
  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogout
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={failGoogle}
      >
      </GoogleLogout>
    </>
  );
};

const Here4uSignup = (props) => {
  const { message } = props;
  return (
    <>
      <Typography component="h5" variant="h6" style={{ marginBottom: '50px' }}>
        {message}
      </Typography>
      <GoogleLogin
        clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
        buttonText="Signin via Google"
        onSuccess={signupUser}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

export {
  GoogleAuth,
  successGoogle,
  isAuthenticated,
  logout,
  GoogleOut,
  Here4uSignup
};
