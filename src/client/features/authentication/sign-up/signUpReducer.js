import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
} from '../../../shared/constants/ActionTypes';

const signUpReducer = (state, { type, user, errors }) => {
  switch (type) {
    case SIGNUP_SUCCESSFUL:
      return {
        ...state,
        user,
        isAdmin: false,
        isAuthenticated: true,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
};

export default signUpReducer;
