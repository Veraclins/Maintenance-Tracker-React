import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
} from '../../../shared/constants/ActionTypes';

const loginReducer = (state, { type, user, errors }) => {
  switch (type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        user,
        isAdmin: user.role === 'Admin',
        isAuthenticated: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
};

export default loginReducer;
