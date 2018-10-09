import authReducer from '../authReducer';
import {
  SIGNUP_SUCCESSFUL,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  SIGNUP_FAILED,
} from '../../../shared/constants/ActionTypes';

const user = {
  name: 'John Doe',
  email: 'johndoe@test.com',
};

describe('Tests auth reducer', () => {
  it('should return signed up user', () => {
    expect(authReducer({}, { type: SIGNUP_SUCCESSFUL, user })).toEqual({
      user,
      isAuthenticated: true,
      isAdmin: false,
    });
  });
  it('should return logged in user', () => {
    expect(authReducer({}, { type: LOGIN_SUCCESSFUL, user })).toEqual({
      user,
      isAuthenticated: true,
      isAdmin: false,
    });
  });
  it('should display login failed errors', () => {
    const errors = {
      email: 'No user with the supplied email found',
    };
    expect(authReducer({}, { type: LOGIN_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return default login state if invalid type is sent', () => {
    expect(authReducer({}, { type: 'LOGIN_UNKNOWN' }))
      .toEqual({});
  });
  it('should display signup failed errors', () => {
    const errors = {
      email: 'No user with the supplied email found',
    };
    expect(authReducer({}, { type: SIGNUP_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return default signup state if invalid type is sent', () => {
    expect(authReducer({}, { type: 'SIGNUP_UNKNOWN' }))
      .toEqual({});
  });
  it('should clear errors on location change', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(authReducer({ many: 'things in the state' }, {
      type: '@@router/LOCATION_CHANGE',
      errors,
    }))
      .toEqual({
        many: 'things in the state',
        errors: {},
      });
  });
  it('should return default state if invalid type is sent', () => {
    expect(authReducer({}, { type: 'UNKNOWN' }))
      .toEqual({});
  });
});
