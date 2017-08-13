import {
  POST_QUESTION_SUCCESS,
  POST_QUESTION_ERROR,
  DISPLAY_USER_MESSAGE,
  DISPLAY_IMAGE } from '../constants/actionTypes/reach';

const initialState = {
  postSuccessful: null,
  isUserMessageVisible: false
};

function reachReducer(state = initialState, action) {
  switch (action.type) {
    case POST_QUESTION_SUCCESS : {
      return {
        ...state,
        postSuccessful: true,
        isUserMessageVisible: true
      };
    }
    case POST_QUESTION_ERROR: {
      return {
        ...state,
        postSuccessful: false,
        isUserMessageVisible: true
      };
    }
    case DISPLAY_USER_MESSAGE: {
      return {
        ...state,
        isUserMessageVisible: action.visibility
      };
    }
    case DISPLAY_IMAGE: {
      return {
        ...state,
        isImageVisible: action.visibility
      };
    }
    default:
      return state;
  }
}

export default reachReducer;
