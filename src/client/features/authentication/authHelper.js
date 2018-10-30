import toastr from 'toastr';

import fetchData from '../../shared/utilities/fetchData';
import {
  IS_LOADING,
  IS_COMPLETE,
} from '../../shared/constants/ActionTypes';
import history from '../../shared/utilities/history';
import errorHandler from '../../shared/utilities/errorHandler';

const handleSuccess = (payload) => {
  const {
    dispatch,
    action,
    response,
    location,
  } = payload;
  dispatch({ type: `${action}_SUCCESSFUL`, user: response.data.user });
  toastr.success(`You have ${action === 'LOGIN' ? 'logged in' : 'signed up'} successfully`);
  const from = location.state ? location.state.from : undefined;
  return from ? history.push(from) : history.push('/');
};

const handleFailure = (payload) => {
  const {
    dispatch,
    action,
    response,
  } = payload;
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    errors.email = errors.message;
    return dispatch({ type: `${action}_FAILED`, errors });
  }
  return errorHandler(dispatch, response);
};

export const handleInputChange = (event, state, props) => {
  const { clearValidation, errors } = props;
  const { type } = state[event.target.name];
  const { required, placeholder } = state[event.target.name];
  if (errors[event.target.name]) clearValidation(event.target.name);
  return {
    [event.target.name]: {
      type,
      placeholder,
      required,
      value: event.target.value,
    },
  };
};
const authenticate = async (dispatch, payload) => {
  const { user, action, location } = payload;
  const path = action.toLowerCase();
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: `/auth/${path}`,
    method: 'post',
    data: user,
  });
  dispatch({ type: IS_COMPLETE });
  const status = action === 'LOGIN' ? 200 : 201;
  if (response.status === status) {
    return handleSuccess({
      dispatch,
      response,
      action,
      location,
    });
  }
  return handleFailure({
    dispatch,
    response,
    action,
  });
};


export default authenticate;
