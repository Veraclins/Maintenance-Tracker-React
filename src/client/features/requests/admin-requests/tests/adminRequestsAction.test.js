import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  adminUpdateRequest, getAllAdminRequests, adminViewRequest,
} from '../adminRequestsAction';
import { loginUser } from '../../../authentication/authAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user request actions', () => {
  const user = {
    email: 'clinton@test.com',
    password: 'password',
  };
  const another = {
    email: 'innocent@test.com',
    password: 'password',
  };
  beforeAll(async () => {
    const store = mockStore({});
    await store.dispatch(loginUser(user, {}))
      .then(() => {
        const { user: loggedInUser } = store.getActions()[2];
        user.token = loggedInUser.token;
      });
  });
  beforeEach(() => {
    jest.setTimeout(50000);
  });

  it('updates a request with the given status', async () => {
    const request = {
      id: 12,
    };
    const expectedActions = 'ADMIN_UPDATE_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(adminUpdateRequest(request, 'approve', user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('updates a request with the given status', async () => {
    const request = {
      id: 12,
    };
    const expectedActions = 'ADMIN_UPDATE_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(adminUpdateRequest(request, 'disapprove', user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if the user is not authenticated', async () => {
    const request = {
      id: 2,
    };
    const expectedActions = 'ADMIN_UPDATE_REQUEST_FAILED';
    const store = mockStore({});
    await store.dispatch(adminUpdateRequest(request, 'disapprove', another))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if id is not an integer', async () => {
    const request = {
      id: 'love',
    };
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(adminUpdateRequest(request, 'disapprove', user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('gets all requests of the user', async () => {
    const expectedActions = 'ADMIN_GET_ALL_REQUESTS_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(getAllAdminRequests(user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
  it('fails to gets all requests of the user if not logged in', async () => {
    const expectedActions = 'ADMIN_GET_ALL_REQUESTS_FAILED';
    const store = mockStore({});
    await store.dispatch(getAllAdminRequests(another))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('gets a single request of the user', async () => {
    const expectedActions = 'ADMIN_GET_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(adminViewRequest(user, 2))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if id is not an integer', async () => {
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(adminViewRequest(user, 'love'))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails to gets a request of the user if not logged in', async () => {
    const expectedActions = 'ADMIN_GET_REQUEST_FAILED';
    const store = mockStore({});
    await store.dispatch(adminViewRequest(another, 2))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
});
