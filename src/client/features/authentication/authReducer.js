import loginReducer from './login/loginReducer';
import signUpReducer from './sign-up/signUpReducer';

const initialState = {
  user: {},
  errors: {},
  isAuthenticated: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  const { type, errors } = action;
  switch (true) {
    case type.startsWith('LOGIN'):
      return loginReducer(state, action);

    case type.startsWith('SIGNUP'):
      return signUpReducer(state, action);

    case type.startsWith('VALIDATION'):
      return {
        ...state,
        errors,
      };

    case type.startsWith('CLEAR'):
      return {
        ...state,
        errors: {
          ...state.errors,
          message: '',
          [action.errorField]: undefined,
        },
      };

    case type.startsWith('USER_LOGOUT'):
      return initialState;

    case type.startsWith('@@router'):
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};

export default authReducer;
