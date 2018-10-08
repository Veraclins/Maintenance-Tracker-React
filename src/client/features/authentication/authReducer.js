import loginReducer from './login/loginReducer';
import signUpReducer from './sign-up/signUpReducer';
import sharedReducer from '../../shared/common/sharedReducer';

const initialState = {
  user: {},
  errors: {},
  isAuthenticated: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  const { type } = action;
  const shared = type.startsWith('VALIDATION')
    || type.startsWith('CLEAR')
    || type.startsWith('LOGOUT_USER')
    || type.startsWith('@@router');
  switch (true) {
    case type.startsWith('LOGIN'):
      return loginReducer(state, action);

    case type.startsWith('SIGNUP'):
      return signUpReducer(state, action);

    case shared:
      return sharedReducer(state, initialState, action);

    default:
      return state;
  }
};

export default authReducer;
