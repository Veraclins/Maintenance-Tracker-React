import {
  CLEAR_ERROR,
  CLEAR_VALIDATION_ERROR,
} from '../../shared/constants/ActionTypes';

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR, errors: {} });
};

export const clearValidationErrors = errorField => async (dispatch) => {
  dispatch({
    type: CLEAR_VALIDATION_ERROR,
    errorField,
  });
};
