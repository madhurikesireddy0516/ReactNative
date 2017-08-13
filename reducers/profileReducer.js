import { PROFILE_SELECTED, MY_PROFILE, CLEAR_MY_PROFILE } from '../constants/actionTypes/profile';

const initialState = {
  team: null
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SELECTED : {
      return {
        ...state,
        team: action.res
      };
    }
    case MY_PROFILE : {
      return {
        ...state,
        team: action.res[0]
      };
    }
    case CLEAR_MY_PROFILE : {
      return {
        ...state,
        team: null
      };
    }
    default:
      return state;
  }
}

export default profileReducer;
