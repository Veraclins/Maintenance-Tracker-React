
import { LOGIN_USER, LOGOUT_USER } from '../../shared/constants/ActionTypes';


export const login = user => ({
  type: LOGIN_USER,
  payload: user,
});

export const logout = user => ({
  type: LOGOUT_USER,
  payload: user,
});
