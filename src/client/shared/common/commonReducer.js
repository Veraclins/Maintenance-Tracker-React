import {
  IS_LOADING,
  IS_COMPLETE,
  NETWORK_ERROR,
} from '../constants/ActionTypes';

const initialState = {
  errors: {},
  loading: false,
};

const commonReducer = (state = initialState, { type }) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case IS_COMPLETE:
      return {
        ...state,
        loading: false,
      };

    case NETWORK_ERROR:
      return {
        ...state,
        errors: {
          message: 'Oops! unable to connect to the Internet. Please check your connection and try again',
        },
      };
    default:
      return state;
  }
};

export default commonReducer;
