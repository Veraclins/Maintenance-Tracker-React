import toastr from 'toastr';

import {
  CLEAR_ERROR,
  CLEAR_VALIDATION_ERROR,
  LOGOUT_USER,
} from '../../shared/constants/ActionTypes';
import { clearState } from '../../shared/utilities/persistState';
import history from '../../shared/utilities/history';

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR, errors: {} });
};

export const clearValidationErrors = errorField => async (dispatch) => {
  dispatch({
    type: CLEAR_VALIDATION_ERROR,
    errorField,
  });
};

export const logoutUser = () => async (dispatch) => {
  clearState();
  dispatch({
    type: LOGOUT_USER,
  });
  toastr.warning('You have logged out successfully');
  return history.push('/login');
};
