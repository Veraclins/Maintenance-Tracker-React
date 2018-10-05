import {
  ADMIN_GET_REQUEST_SUCCESSFUL,
  ADMIN_GET_REQUEST_FAILED,
  ADMIN_UPDATE_REQUEST_SUCCESSFUL,
  ADMIN_UPDATE_REQUEST_FAILED,
  ADMIN_GET_ALL_REQUESTS_SUCCESSFUL,
  ADMIN_GET_ALL_REQUESTS_FAILED,
} from '../../../shared/constants/ActionTypes';

const userRequestsReducer = (state, action) => {
  const {
    type, request, errors, requests,
  } = action;
  switch (type) {
    case ADMIN_GET_REQUEST_SUCCESSFUL:
      return {
        ...state,
        currentRequest: request,
      };
    case ADMIN_GET_REQUEST_FAILED:
      return {
        ...state,
        errors,
        currentRequest: {},
      };
    case ADMIN_UPDATE_REQUEST_SUCCESSFUL:
      return {
        ...state,
        currentRequest: request,
      };
    case ADMIN_UPDATE_REQUEST_FAILED:
      return {
        ...state,
        errors,
      };
    case ADMIN_GET_ALL_REQUESTS_SUCCESSFUL:
      return {
        ...state,
        requests,
      };
    case ADMIN_GET_ALL_REQUESTS_FAILED:
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
};

export default userRequestsReducer;
