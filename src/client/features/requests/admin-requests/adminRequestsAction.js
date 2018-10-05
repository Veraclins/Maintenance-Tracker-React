
import {
  IS_LOADING,
  IS_COMPLETE,
  ADMIN_GET_REQUEST_SUCCESSFUL,
  ADMIN_GET_REQUEST_FAILED,
  ADMIN_GET_ALL_REQUESTS_SUCCESSFUL,
  ADMIN_GET_ALL_REQUESTS_FAILED,
  ADMIN_UPDATE_REQUEST_SUCCESSFUL,
  ADMIN_UPDATE_REQUEST_FAILED,
} from '../../../shared/constants/ActionTypes';
import fetchData from '../../../shared/utilities/fetchData';
import errorHandler from '../../../shared/utilities/errorHandler';

export const adminUpdateRequest = (request, status, user) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: `/requests/${request.id}/${status}`,
    method: 'put',
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    return dispatch({ type: ADMIN_UPDATE_REQUEST_SUCCESSFUL, request: response.data.request });
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({ type: ADMIN_UPDATE_REQUEST_FAILED, errors });
  }
  return errorHandler(dispatch, response);
};

export const getAllAdminRequests = user => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: '/requests',
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    return dispatch({
      type: ADMIN_GET_ALL_REQUESTS_SUCCESSFUL,
      requests: response.data.requests,
    });
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({
      type: ADMIN_GET_ALL_REQUESTS_FAILED,
      errors,
    });
  }
  return errorHandler(dispatch, response);
};

export const adminViewRequest = (user, requestId) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  const response = await fetchData({
    url: `/requests/${requestId}`,
    headers: {
      'x-access-token': user.token,
    },
  });
  dispatch({ type: IS_COMPLETE });
  if (response.status === 200) {
    return dispatch({
      type: ADMIN_GET_REQUEST_SUCCESSFUL,
      request: response.data.request,
    });
  }
  if (response.status > 400 && response.status < 500) {
    const errors = response.data;
    return dispatch({
      type: ADMIN_GET_REQUEST_FAILED,
      errors,
    });
  }
  return errorHandler(dispatch, response);
};
