import {
  USER_CREATE_REQUEST_FAILED,
  USER_CREATE_REQUEST_SUCCESSFUL,
  USER_GET_REQUEST_SUCCESSFUL,
  USER_GET_REQUEST_FAILED,
  USER_GET_ALL_REQUESTS_SUCCESSFUL,
  USER_GET_ALL_REQUESTS_FAILED,
} from '../../../shared/constants/ActionTypes';

const userRequestsReducer = (state, action) => {
  const {
    type, request, errors, requests,
  } = action;
  switch (type) {
    case USER_CREATE_REQUEST_SUCCESSFUL:
      return {
        ...state,
        currentRequest: request,
      };
    case USER_CREATE_REQUEST_FAILED:
      return {
        ...state,
        errors,
      };
    case USER_GET_REQUEST_SUCCESSFUL:
      return {
        ...state,
        currentRequest: request,
      };
    case USER_GET_REQUEST_FAILED:
      return {
        ...state,
        errors,
      };
    case USER_GET_ALL_REQUESTS_SUCCESSFUL:
      return {
        ...state,
        requests,
      };
    case USER_GET_ALL_REQUESTS_FAILED:
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
};

export default userRequestsReducer;
