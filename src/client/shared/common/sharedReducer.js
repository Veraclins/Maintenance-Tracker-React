import {
  VALIDATION_ERROR, CLEAR_VALIDATION_ERROR, CLEAR_ERROR, LOGOUT_USER,
} from '../constants/ActionTypes';

const sharedReducer = (state, initialState, action) => {
  const { type, errors } = action;
  switch (type) {
    case VALIDATION_ERROR:
      return {
        ...state,
        errors,
      };

    case CLEAR_VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.errorField]: undefined,
        },
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: {},
      };

    case LOGOUT_USER:
      return initialState;

    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};

export default sharedReducer;
