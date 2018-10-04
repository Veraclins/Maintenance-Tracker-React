import toastr from 'toastr';
import {
  VALIDATION_ERROR,
  NETWORK_ERROR,
  USER_LOGOUT,
} from '../constants/ActionTypes';
import history from './history';

const errorHandler = (dispatch, data) => {
  if (data.status >= 500) {
    dispatch({ type: NETWORK_ERROR });
    return toastr.error('Oops! unable to connect to the Internet. Please check your connection and try again');
  }
  if (data.status === 400) {
    const { errors } = data.data;
    return dispatch({ type: VALIDATION_ERROR, errors });
  }
  if (data.status === 404) {
    history.push('/404');
    return toastr.error(data.data.message);
  }
  if (data.status === 401) {
    const errors = data.data;
    dispatch({ type: USER_LOGOUT });
    history.push('/login', { from: data.pathname });
    return toastr.error(errors.message);
  }
  return toastr.error(data.data.message);
};
export default errorHandler;
