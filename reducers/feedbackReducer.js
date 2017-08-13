import { POST_FEEDBACK_SUCCESS, POST_FEEDBACK_ERROR } from '../constants/actionTypes/feedback';

const initialState = {
  postSuccessful: null
};

function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case POST_FEEDBACK_SUCCESS : {
      return {
        ...state,
        postSuccessful: true
      };
    }
    case POST_FEEDBACK_ERROR: {
      return {
        ...state,
        postSuccessful: false
      };
    }
    default:
      return state;
  }
}

export default feedbackReducer;
