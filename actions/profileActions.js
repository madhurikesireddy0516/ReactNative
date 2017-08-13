import { PROFILE_SELECTED, MY_PROFILE, CLEAR_MY_PROFILE } from '../constants/actionTypes/profile';

export function profileSelected(team) {
  return {
    type: PROFILE_SELECTED,
    res: team
  };
}

export function getMyProfileSuccess(res) {
  return {
    type: MY_PROFILE,
    res
  };
}

export function clearMyProfile() {
  return {
    type: CLEAR_MY_PROFILE
  };
}

export function getMyProfile(userIdno) {
  return (dispatch) => {
    fetch(`http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/my_profile/${userIdno}`)
      .then(response =>
        response.json()
      )
      .then((responseJson) => {
        dispatch(getMyProfileSuccess(responseJson));
      })
      .catch(() => {
      });
  };
}
