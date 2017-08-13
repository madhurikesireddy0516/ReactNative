import filter from 'lodash/filter';
import some from 'lodash/some';
import {
  TEAM_SELECTED,
  LOCATION_SELECTED,
  TEAM_MEMBER_LIST,
  TEAM_LIST,
  LOCATION_LIST,
  SEARCH_TEAM_LIST,
  SEARCH_TEAM_MEMBER_LIST,
  SEARCH_LOCATION_LIST } from '../constants/actionTypes/team';

const initialState = {
  teamMemberList: null,
  teamMemberListAll: null,
  teamMemberListFiltered: null,
  teamList: null,
  teamListAll: null,
  teamSelected: null,
  locationList: null,
  locationListAll: null,
  locationSelected: null
};

function teamReducer(state = initialState, action) {
  switch (action.type) {
    case TEAM_MEMBER_LIST : {
      return {
        ...state,
        teamMemberList: action.res,
        teamMemberListFiltered: action.res,
        teamMemberListAll: action.res
      };
    }
    case TEAM_LIST : {
      return {
        ...state,
        teamList: action.teams,
        teamListAll: action.teams
      };
    }
    case LOCATION_LIST : {
      return {
        ...state,
        locationList: action.locations,
        locationListAll: action.locations
      };
    }
    case SEARCH_TEAM_LIST : {
      const searchMatch = filter(state.teamListAll, item =>
          some(item, obj =>
              (obj.name.toLowerCase()).indexOf(action.searchText.toLowerCase()) > -1
          )
      );
      const teamListFiltered = {};
      let tempArray = [];
      let letterKey = null;
      searchMatch.map((item) => { // eslint-disable-line array-callback-return
        item.map((subItem) => { // eslint-disable-line array-callback-return
          letterKey = subItem.name.charAt(0).toUpperCase();
          if (teamListFiltered[letterKey] !== undefined) {
            teamListFiltered[letterKey].map((i) => { // eslint-disable-line array-callback-return
              if (i.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1) {
                tempArray.push(i);
              }
            });
            if (subItem.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1) {
              tempArray.push(subItem);
            }
            teamListFiltered[letterKey] = tempArray;
          } else {
            tempArray.push(subItem);
            teamListFiltered[letterKey] = tempArray;
          }
          tempArray = [];
        });
      });
      return {
        ...state,
        teamList: teamListFiltered
      };
    }
    case SEARCH_LOCATION_LIST : {
      const searchMatch = filter(state.locationListAll, item =>
          some(item, obj =>
              (obj.name.toLowerCase()).indexOf(action.searchText.toLowerCase()) > -1
          )
      );
      const locationListFiltered = {};
      let tempArray = [];
      let letterKey = null;
      searchMatch.map((item) => { // eslint-disable-line array-callback-return
        item.map((subItem) => { // eslint-disable-line array-callback-return
          letterKey = subItem.name.charAt(0).toUpperCase();
          if (locationListFiltered[letterKey] !== undefined) {
            locationListFiltered[letterKey]
                .map((i) => { // eslint-disable-line array-callback-return
                  if (i.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1) {
                    tempArray.push(i);
                  }
                });
            if (subItem.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1) {
              tempArray.push(subItem);
            }
            locationListFiltered[letterKey] = tempArray;
          } else {
            tempArray.push(subItem);
            locationListFiltered[letterKey] = tempArray;
          }
          tempArray = [];
        });
      });
      return {
        ...state,
        locationList: locationListFiltered
      };
    }
    case SEARCH_TEAM_MEMBER_LIST : {
      let teamMemberListFiltered = filter(state.teamMemberListFiltered, item =>
          some(item, () => {
            const name = `${item.field_first_name} ${item.field_last_name}`;
            return (name.toLowerCase()).indexOf(action.searchText.toLowerCase()) > -1;
          })
      );
      if (action.searchText === '') {
        teamMemberListFiltered = state.teamMemberListAll;
      }
      return {
        ...state,
        teamMemberList: teamMemberListFiltered
      };
    }
    case TEAM_SELECTED : {
      let teamMemberListFiltered = filter(state.teamMemberListAll, item =>
          some(item, () =>
              (item.field_user_team.toLowerCase()).indexOf(action.team.toLowerCase()) > -1
          )
      );
      if (action.team === 'All Teams') {
        teamMemberListFiltered = state.teamMemberListAll;
      }
      // remove all team members filtered by the Location selected
      if (state.locationSelected && state.locationSelected !== 'All Locations') {
        teamMemberListFiltered = filter(teamMemberListFiltered, item =>
            some(item, () =>
                (item.field_user_location.toLowerCase()).indexOf(
                    state.locationSelected.toLowerCase()) > -1
            )
        );
      }
      return {
        ...state,
        teamSelected: action.team,
        teamMemberList: teamMemberListFiltered,
        teamMemberListFiltered
      };
    }
    case LOCATION_SELECTED: {
      let teamMemberListFiltered = filter(state.teamMemberListAll, item =>
          some(item, () =>
              (item.field_user_location.toLowerCase()).indexOf(
                  action.location.toLowerCase()) > -1
          )
      );
      if (action.location === 'All Locations') {
        teamMemberListFiltered = state.teamMemberListAll;
      }
      // remove all team members filtered by the Team selected
      if (state.teamSelected && state.teamSelected !== 'All Teams') {
        teamMemberListFiltered = filter(teamMemberListFiltered, item =>
            some(item, () =>
                (item.field_user_team.toLowerCase()).indexOf(
                    state.teamSelected.toLowerCase()) > -1
            )
        );
      }
      return {
        ...state,
        locationSelected: action.location,
        teamMemberList: teamMemberListFiltered,
        teamMemberListFiltered
      };
    }
    default:
      return state;
  }
}

export default teamReducer;
