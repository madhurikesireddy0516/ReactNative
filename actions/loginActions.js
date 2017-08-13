import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT } from '../constants/actionTypes/login';
import { push } from './navActions';

function userLoginSuccess(userEmail, userId) {
  return {
    type: USER_LOGIN_SUCCESS,
    userEmail,
    userId
  };
}

function userLoginError() {
  return { type: USER_LOGIN_ERROR };
}

export function userLogout() {
  return { type: USER_LOGOUT };
}

function authUserWithToken(userEmail, password, token, callback) {
  return (dispatch) => {
    const object = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YXBwdXNlcjpRdVwrXz1tdGRGImpTbkxu',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        title: [{
          value: 'User Authentication'
        }],
        type: [{
          target_id: 'article'
        }],
        field_user_name: [{
          value: userEmail
        }],
        field_user_unique_key: [{
          value: password
        }],

        body: [{
          value: 'User Authentication process'
        }]
      })
    };
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/api/custom/?_format=json', object)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.data.status === 'success') {
          dispatch(userLoginSuccess(userEmail, responseJson.data.user_id));
          dispatch(push({ key: 'Landing' }));
          callback();
        } else {
          dispatch(userLoginError());
          callback();
        }
      })
      .catch(() => {
        dispatch(userLoginError());
        callback();
      });
  };
}

export function authUser(userEmail, password, callback) {
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(authUserWithToken(userEmail, password, responseToken, callback));
      })
      .catch(() => {
        dispatch(userLoginError());
        callback();
      });
  };
}
