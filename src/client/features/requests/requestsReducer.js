
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
  const shared = type.startsWith('VALIDATION')
    || type.startsWith('CLEAR')
    || type.startsWith('LOGOUT_USER')
    || type.startsWith('@@router');
  switch (true) {
    case type.startsWith('USER'):
      return userRequestsReducer(state, action);

    case type.startsWith('ADMIN'):
      return adminRequestsReducer(state, action);

    case shared:
      return sharedReducer(state, initialState, action);

    default:
      return state;
  }
};

export default requestsReducer;
