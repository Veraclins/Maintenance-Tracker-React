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
  switch (true) {
    case type.startsWith('LOGIN'):
      return loginReducer(state, action);

    case type.startsWith('SIGNUP'):
      return signUpReducer(state, action);

    default:
      return sharedReducer(state, initialState, action);
  }
};

export default authReducer;
