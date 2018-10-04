import toastr from 'toastr';

import {
  IS_LOADING,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  IS_COMPLETE,
} from '../../../shared/constants/ActionTypes';
import fetchData from '../../../shared/utilities/fetchData';
import errorHandler from '../../../shared/utilities/errorHandler';
import history from '../../../shared/utilities/history';

const loginUser = (user, location) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: '/auth/signup',
    method: 'post',
    data: user,
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 201) {
    dispatch({ type: SIGNUP_SUCCESSFUL, user: response.data.user });
    toastr.success('Your account has been created successfully');
    const from = location.state ? location.state.from : undefined;
    if (from) {
      return history.push(from);
    }
    return history.push('/');
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    errors.email = errors.message;
    return dispatch({ type: SIGNUP_FAILED, errors });
  }
  return errorHandler(dispatch, response);
};

export default loginUser;