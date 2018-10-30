
import userRequestsReducer from './user-requests/userRequestsReducer';
import adminRequestsReducer from './admin-requests/adminRequestsReducer';
import sharedReducer from '../../shared/common/sharedReducer';

const initialState = {
  requests: [],
  errors: {},
  currentRequest: {},
};

const requestsReducer = (state = initialState, action) => {
  const { type } = action;
  switch (true) {
    case type.startsWith('USER'):
      return userRequestsReducer(state, action);

    case type.startsWith('ADMIN'):
      return adminRequestsReducer(state, action);

    default:
      return sharedReducer(state, initialState, action);
  }
};

export default requestsReducer;
