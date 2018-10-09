import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loginUser,
  signUpUser,
  clearValidationErrors,
  clearErrors,
  logoutUser,
} from '../authAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const location = {};

describe('auth actions', () => {
  beforeEach(() => {
    jest.setTimeout(50000);
  });

  it('logs in a user successfully', async () => {
    const user = {
      email: 'innocent@test.com',
      password: 'password',
    };
    const expectedActions = 'LOGIN_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(loginUser(user, location))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('throws error on wrong password', async () => {
    const user = {
      email: 'innocent@test.com',
      password: 'password4',
    };
    const expectedActions = 'LOGIN_FAILED';
    const store = mockStore({});
    await store.dispatch(loginUser(user, location))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('throws validation errors', async () => {
    const user = {
      email: 'innocent@test',
      password: 'password4',
    };
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(loginUser(user, location))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
  it('signs up a new user successfully', async () => {
    const user = {
      firstName: 'Annabelle',
      lastName: 'Agada',
      email: `${Math.random().toString(36).substring(2, 10)}@test.com`,
      password: 'password',
      passwordConfirmation: 'password',
    };
    const expectedActions = 'SIGNUP_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(signUpUser(user, location))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('throws error on already registered email', async () => {
    const user = {
      firstName: 'Annabelle',
      lastName: 'Agada',
      email: 'innocent@test.com',
      password: 'password',
      passwordConfirmation: 'password',
    };
    const expectedActions = 'SIGNUP_FAILED';
    const store = mockStore({});
    await store.dispatch(signUpUser(user, location))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('clears validation errors', async () => {
    const expectedActions = 'CLEAR_VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(clearValidationErrors('email'))
      .then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(expectedActions);
      });
  });

  it('clears all errors', async () => {
    const expectedActions = 'CLEAR_ERROR';
    const store = mockStore({});
    await store.dispatch(clearErrors())
      .then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(expectedActions);
      });
  });
  it('logs out a user', async () => {
    const expectedActions = 'LOGOUT_USER';
    const store = mockStore({});
    await store.dispatch(logoutUser())
      .then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(expectedActions);
      });
  });
});
