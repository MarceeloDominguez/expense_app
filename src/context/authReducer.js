import {TYPES} from './authAction';
import {authInitialState} from './AuthContext';

export const authReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SING_IN_POST:
      return {
        ...state,
        error: false,
      };

    case TYPES.SING_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        ...action.payload,
      };

    case TYPES.SING_IN_FAIL:
      return {
        ...state,
        error: true,
      };

    case TYPES.LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};
