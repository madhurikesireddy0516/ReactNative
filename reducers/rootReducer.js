import { combineReducers } from 'redux';
import navState from './navReducer';
import socialFeedsReducer from './socialFeedsReducer';
import modalReducer from './modalReducer';
import teamReducer from './teamReducer';
import reachReducer from './reachReducer';
import profileReducer from './profileReducer';
import feedbackReducer from './feedbackReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  navState,
  socialFeedsReducer,
  modalReducer,
  teamReducer,
  reachReducer,
  profileReducer,
  feedbackReducer,
  loginReducer
});

export default rootReducer;
