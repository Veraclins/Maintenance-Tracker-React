import { LOGIN_USER } from '../../shared/constants/ActionTypes';

const loginUser = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        message: 'You have logged in successfully',
        name: payload.email.split('@')[0],
        email: payload.email,
      };
    default:
      return state;
  }
};

export default loginUser;
