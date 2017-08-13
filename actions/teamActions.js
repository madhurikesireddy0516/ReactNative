import {
  TEAM_SELECTED,
  LOCATION_SELECTED,
  TEAM_MEMBER_LIST,
  TEAM_LIST,
  LOCATION_LIST,
  SEARCH_TEAM_LIST,
  SEARCH_TEAM_MEMBER_LIST,
  SEARCH_LOCATION_LIST } from '../constants/actionTypes/team';

export function teamSelected(team) {
  return {
    type: TEAM_SELECTED,
    team
  };
}

export function locationSelected(location) {
  return {
    type: LOCATION_SELECTED,
    location
  };
}

export function searchByLocation(searchText) {
  return {
    type: SEARCH_LOCATION_LIST,
    searchText
  };
}

export function searchByTeamName(searchText) {
  return {
    type: SEARCH_TEAM_LIST,
    searchText
  };
}

export function searchByTeamMemberName(searchText) {
  return {
    type: SEARCH_TEAM_MEMBER_LIST,
    searchText
  };
}

export function getTeamMemberListSuccess(res) {
  return {
    type: TEAM_MEMBER_LIST,
    res
  };
}

export function getTeamList(teams) {
  return {
    type: TEAM_LIST,
    teams
  };
}

export function getLocationList(locations) {
  return {
    type: LOCATION_LIST,
    locations
  };
}

export function getTeamMemberList() {
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/mobile_app_users_list')
      .then(response =>
        response.json()
      )
      .then((responseJson) => {
        dispatch(getTeamMemberListSuccess(responseJson));
      })
      .catch(() => {
      });
  };
}
