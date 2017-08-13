import { PUSH_ROUTE, POP_ROUTE } from '../constants/actionTypes/navigation';

export function push(route) {
  return {
    type: PUSH_ROUTE,
    route
  };
}

export function pop() {
  return {
    type: POP_ROUTE
  };
}
