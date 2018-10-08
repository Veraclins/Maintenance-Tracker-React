import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toastr from 'toastr';
import errorHandler from '../errorHandler';

const mockStore = configureMockStore([thunk]);

describe('errorhandler', () => {
  it('dispatches the network error', () => {
    const data = {
      status: 502,
    };
    const expectedActions = 'NETWORK_ERROR';
    const store = mockStore({});
    errorHandler(store.dispatch, data);
    const action = store.getActions();
    expect(action[0].type).toEqual(expectedActions);
  });
  it('dispatches the validation error', () => {
    const data = {
      status: 400,
      data: {
        errors: {},
      },
    };
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    errorHandler(store.dispatch, data);
    const action = store.getActions();
    expect(action[0].type).toEqual(expectedActions);
  });
  it('clears the logged in user from store if authentication fail', () => {
    const data = {
      status: 401,
      data: {
        errors: {},
      },
    };
    const expectedActions = 'LOGOUT_USER';
    const store = mockStore({});
    errorHandler(store.dispatch, data);
    const action = store.getActions();
    expect(action[0].type).toEqual(expectedActions);
  });
  it('displays not found errors', () => {
    const data = {
      status: 404,
      data: {
        message: 'resource not found',
      },
    };
    const error = toastr.error(data.data.message);
    const store = mockStore({});
    const returned = errorHandler(store.dispatch, data);
    expect(returned).toEqual(error);
  });
  it('displays other errors', () => {
    const data = {
      status: 403,
      data: {
        message: 'operation not allowed',
      },
    };
    const error = toastr.error(data.data.message);
    const store = mockStore({});
    const returned = errorHandler(store.dispatch, data);
    expect(returned).toEqual(error);
  });
});
