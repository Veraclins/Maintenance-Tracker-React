import sharedReducer from '../sharedReducer';
import {
  VALIDATION_ERROR,
  CLEAR_VALIDATION_ERROR,
  LOGOUT_USER,
  CLEAR_ERROR,
} from '../../constants/ActionTypes';

describe('Tests auth reducer', () => {
  it('should return validation errors', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(sharedReducer({}, {}, { type: VALIDATION_ERROR, errors }))
      .toEqual({
        errors,
      });
  });
  it('should clear validation errors', () => {
    const errors = {
      email: ['email field is required'],
    };
    const errorField = 'email';
    expect(sharedReducer({}, {}, {
      type: CLEAR_VALIDATION_ERROR,
      errors,
      errorField,
    }))
      .toEqual({
        errors: { email: undefined },
      });
  });
  it('should clear all errors', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(sharedReducer({}, {}, {
      type: CLEAR_ERROR,
      errors,
    }))
      .toEqual({ errors: {} });
  });
  it('should clear errors on location change', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(sharedReducer({ many: 'things in the state' }, {}, {
      type: '@@router/LOCATION_CHANGE',
      errors,
    }))
      .toEqual({
        many: 'things in the state',
        errors: {},
      });
  });
  it('should return initial state on logout', () => {
    expect(sharedReducer({}, { empty: 'state' }, {
      type: LOGOUT_USER,
    }))
      .toEqual({ empty: 'state' });
  });
  it('should return default state if invalid type is sent', () => {
    expect(sharedReducer({}, {}, { type: 'UNKNOWN' }))
      .toEqual({});
  });
});
