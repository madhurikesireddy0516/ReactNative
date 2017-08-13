import { MODAL_OPEN, MODAL_CLOSE } from '../constants/actionTypes/modal';

export function modalOpen(modal) {
  return {
    type: MODAL_OPEN,
    name: modal
  };
}

export function modalClose(modal) {
  return {
    type: MODAL_CLOSE,
    name: modal
  };
}
