import history from '../../shared/utilities/history';
import fetchData from '../../shared/utilities/fetchData';
import { IS_LOADING, IS_COMPLETE } from '../../shared/constants/ActionTypes';
import errorHandler from '../../shared/utilities/errorHandler';

const queryApi = async (dispatch, payload) => {
  const {
    url, method, request, user,
  } = payload;
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url,
    method,
    data: request,
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  return response;
};

const handleFailure = (payload) => {
  const {
    dispatch,
    action,
    response,
  } = payload;
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({ type: `${action}_FAILED`, errors });
  }
  return errorHandler(dispatch, response);
};

export const create = async (dispatch, user, request) => {
  const response = await queryApi(dispatch, {
    url: '/users/requests',
    method: 'post',
    request,
    user,
  });
  if (response.status === 201) {
    dispatch({ type: 'USER_CREATE_REQUEST_SUCCESSFUL', request: response.data.request });
    return history.push('/requests');
  }
  return handleFailure({
    action: 'USER_CREATE_REQUEST',
    dispatch,
    response,
  });
};

export const update = async (dispatch, user, request, userType) => {
  const payload = {
    url: request.url,
    method: 'put',
    request,
    user,
  };
  const response = await queryApi(dispatch, payload);
  if (response.status === 200) {
    dispatch({ type: `${userType}_UPDATE_REQUEST_SUCCESSFUL`, request: response.data.request });
    return userType === 'USER' ? history.push(`/requests/${request.id}`) : true;
  }
  return handleFailure({
    action: `${userType}_UPDATE_REQUEST`,
    dispatch,
    response,
  });
};

export const getAll = async (dispatch, user, userType) => {
  const payload = {
    url: userType === 'ADMIN' ? '/requests' : '/users/requests',
    user,
  };
  const response = await queryApi(dispatch, payload);
  if (response.status === 200) {
    return dispatch({
      type: `${userType}_GET_ALL_REQUESTS_SUCCESSFUL`,
      requests: response.data.requests,
    });
  }
  return handleFailure({
    action: `${userType}_GET_ALL_REQUESTS`,
    dispatch,
    response,
  });
};

export const getOne = async (dispatch, user, requestId, userType) => {
  const payload = {
    url: userType === 'ADMIN' ? `/requests/${requestId}` : `/users/requests/${requestId}`,
    user,
  };
  const response = await queryApi(dispatch, payload);
  if (response.status === 200) {
    return dispatch({
      type: `${userType}_GET_REQUEST_SUCCESSFUL`,
      request: response.data.request,
    });
  }
  return handleFailure({
    action: `${userType}_GET_REQUEST`,
    dispatch,
    response,
  });
};
