import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT } from '../constants/actionTypes/login';

const initialState = {
  userAuth: null,
  userEmail: null,
  userId: null
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS : {
      return {
        ...state,
        userAuth: true,
        userEmail: action.userEmail,
        userId: action.userId
      };
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        userAuth: false,
        userEmail: null,
        userId: null
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        userAuth: null,
        userEmail: null,
        userId: null
      };
    }
    default:
      return state;
  }
}

export default loginReducer;
