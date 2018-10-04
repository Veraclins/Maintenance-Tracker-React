import {
  IS_LOADING,
  NETWORK_ERROR,
  IS_COMPLETE,
} from '../constants/ActionTypes';

export const loading = () => ({
  type: IS_LOADING,
});

export const complete = () => ({
  type: IS_COMPLETE,
});

export const networkError = () => ({
  type: NETWORK_ERROR,
});
