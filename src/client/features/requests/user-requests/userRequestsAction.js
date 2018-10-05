
import {
  IS_LOADING,
  USER_CREATE_REQUEST_SUCCESSFUL,
  USER_CREATE_REQUEST_FAILED,
  IS_COMPLETE,
  USER_GET_REQUEST_SUCCESSFUL,
  USER_GET_REQUEST_FAILED,
  USER_GET_ALL_REQUESTS_SUCCESSFUL,
  USER_GET_ALL_REQUESTS_FAILED,
  USER_UPDATE_REQUEST_SUCCESSFUL,
  USER_UPDATE_REQUEST_FAILED,
} from '../../../shared/constants/ActionTypes';
import fetchData from '../../../shared/utilities/fetchData';
import errorHandler from '../../../shared/utilities/errorHandler';
import history from '../../../shared/utilities/history';

export const createRequest = (request, user) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: '/users/requests',
    method: 'post',
    data: request,
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 201) {
    dispatch({ type: USER_CREATE_REQUEST_SUCCESSFUL, request: response.data.request });
    return history.push('/requests');
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    errors.title = errors.message;
    return dispatch({ type: USER_CREATE_REQUEST_FAILED, errors });
  }
  return errorHandler(dispatch, response);
};
export const updateRequest = (request, user) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: `/users/requests/${request.id}`,
    method: 'put',
    data: request,
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    dispatch({ type: USER_UPDATE_REQUEST_SUCCESSFUL, request: response.data.request });
    return history.push('/requests');
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    errors.title = errors.message;
    return dispatch({ type: USER_UPDATE_REQUEST_FAILED, errors });
  }
  return errorHandler(dispatch, response);
};

export const getAllRequests = user => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: '/users/requests',
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    return dispatch({
      type: USER_GET_ALL_REQUESTS_SUCCESSFUL,
      requests: response.data.requests,
    });
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({
      type: USER_GET_ALL_REQUESTS_FAILED,
      errors,
    });
  }
  return errorHandler(dispatch, response);
};

export const getSingleRequest = (user, requestId) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: `/users/requests/${requestId}`,
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    return dispatch({
      type: USER_GET_REQUEST_SUCCESSFUL,
      request: response.data.request,
    });
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({
      type: USER_GET_REQUEST_FAILED,
      errors,
    });
  }
  return errorHandler(dispatch, response);
};
