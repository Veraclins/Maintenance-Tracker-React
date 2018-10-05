import userRequestsReducer from './user-requests/userRequestsReducer';
import adminRequestsReducer from './admin-requests/adminRequestsReducer';

const initialState = {
  requests: [],
  errors: {},
  currentRequest: {},
};

const requestsReducer = (state = initialState, action) => {
  const { type, errors } = action;
  switch (true) {
    case type.startsWith('USER'):
      return userRequestsReducer(state, action);

    case type.startsWith('ADMIN'):
      return adminRequestsReducer(state, action);

    case type.startsWith('VALIDATION'):
      return {
        ...state,
        errors,
      };

    case type.startsWith('CLEAR'):
      return {
        ...state,
        errors: {
          ...state.errors,
          message: '',
          [action.errorField]: undefined,
        },
      };

    case type.startsWith('@@router'):
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};

export default requestsReducer;
