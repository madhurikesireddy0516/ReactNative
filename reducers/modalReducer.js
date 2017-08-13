import { MODAL_OPEN, MODAL_CLOSE } from '../constants/actionTypes/modal';

const initialState = {
  modalState: false,
  modalName: null
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalState: true,
        modalName: action.name
      };
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        modalState: false,
        modalName: action.name
      };
    }
    default:
      return state;
  }
}

export default modalReducer;
