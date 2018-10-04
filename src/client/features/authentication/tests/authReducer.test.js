import authReducer from '../authReducer';
import {
  SIGNUP_SUCCESSFUL,
  LOGIN_SUCCESSFUL,
  PASSWORD_RESET_SUCCESSFUL,
  VALIDATION_ERROR,
  LOGIN_FAILED,
  CLEAR_VALIDATION_ERROR,
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
      errors: undefined,
    });
  });
  it('should return logged in user', () => {
    expect(authReducer({}, { type: LOGIN_SUCCESSFUL, user })).toEqual({
      user,
      isAuthenticated: true,
      errors: undefined,
    });
  });
  it('should send a password reset email', () => {
    expect(authReducer({}, { type: PASSWORD_RESET_SUCCESSFUL }))
      .toEqual({
        passwordResetToken: undefined,
        errors: undefined,
      });
  });
  it('should return validation errors', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(authReducer({}, { type: VALIDATION_ERROR, errors }))
      .toEqual({
        errors,
      });
  });
  it('should clear validation errors', () => {
    const errors = {
      email: ['email field is required'],
    };
    const errorField = 'email';
    expect(authReducer({}, {
      type: CLEAR_VALIDATION_ERROR,
      errors,
      errorField,
    }))
      .toEqual({
        errors: { email: undefined, message: '' },
        resetLinkError: undefined,
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
  it('should return default state if invalid type is sent', () => {
    expect(authReducer({}, { type: 'UNKNOWN' }))
      .toEqual({});
  });
});
