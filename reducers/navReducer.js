import { NavigationExperimental } from 'react-native';
import { PUSH_ROUTE, POP_ROUTE } from '../constants/actionTypes/navigation';

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

function navReducer(state, action) {
  if (!state) {
    return {
      index: 0,
      routes: [{ key: 'Splash' }],
    };
  }

  switch (action.type) {
    case PUSH_ROUTE: {
      if (state.routes[state.index].key === (action.route && action.route.key)) return state;

      const index = state.routes.findIndex(route =>
        action.route.key === route.key && action.route.title === route.title
      );

      if (index > -1) {
        const clonedState = Object.assign({}, state);
        clonedState.routes.splice(index, 1);
        return NavigationStateUtils.push(clonedState, action.route);
      }
      return NavigationStateUtils.push(state, action.route);
    }
    case POP_ROUTE: {
      return NavigationStateUtils.pop(state);
    }
    default:
      return state;
  }
}

export default navReducer;
