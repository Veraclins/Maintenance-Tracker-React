import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createRequest, updateRequest, getAllRequests, getSingleRequest,
} from '../userRequestsAction';
import { loginUser } from '../../../authentication/authAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user request actions', () => {
  const user = {
    email: 'innocent@test.com',
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

  it('creates a request successfully', async () => {
    const request = {
      title: 'A simple test Request',
      device: 'Smartphone',
      description: "Since we just updated our component to point to a different address, it's reasonable to expect changes in the snapshot for this component.",
    };
    const expectedActions = 'USER_CREATE_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(createRequest(request, user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if there a validation errors', async () => {
    const request = {
      title: 'A',
      device: 'Smartphone',
      description: "Since we just updated our component to point to a different address, it's reasonable to expect changes in the snapshot for this component.",
    };
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(createRequest(request, user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if the user is not authenticated', async () => {
    const request = {
      title: 'A simple test Request',
      device: 'Smartphone',
      description: "Since we just updated our component to point to a different address, it's reasonable to expect changes in the snapshot for this component.",
    };
    const expectedActions = 'USER_CREATE_REQUEST_FAILED';
    const store = mockStore({});
    await store.dispatch(createRequest(request, another))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('updates a request successfully', async () => {
    const request = {
      id: 2,
      title: 'A simple test Request',
      device: 'Smartphone',
      description: "Since we just updated our component to point to a different address, it's reasonable to expect changes in the snapshot for this component.",
    };
    const expectedActions = 'USER_UPDATE_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(updateRequest(request, user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if there are validation errors', async () => {
    const request = {
      id: 2,
      title: 'A simple test Request',
      device: 'Smartphone',
      description: 'Since we',
    };
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(updateRequest(request, user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if the user is not authenticated', async () => {
    const request = {
      id: 2,
      title: 'A simple test Request',
      device: 'Smartphone',
      description: "Since we just updated our component to point to a different address, it's reasonable to expect changes in the snapshot for this component.",
    };
    const expectedActions = 'USER_UPDATE_REQUEST_FAILED';
    const store = mockStore({});
    await store.dispatch(updateRequest(request, another))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('gets all requests of the user', async () => {
    const expectedActions = 'USER_GET_ALL_REQUESTS_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(getAllRequests(user))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
  it('fails to gets all requests of the user if not logged in', async () => {
    const expectedActions = 'USER_GET_ALL_REQUESTS_FAILED';
    const store = mockStore({});
    await store.dispatch(getAllRequests(another))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('gets a single request of the user', async () => {
    const expectedActions = 'USER_GET_REQUEST_SUCCESSFUL';
    const store = mockStore({});
    await store.dispatch(getSingleRequest(user, 2))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });

  it('fails if id is not an integer', async () => {
    const expectedActions = 'VALIDATION_ERROR';
    const store = mockStore({});
    await store.dispatch(getSingleRequest(user, 'love'))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
  it('fails to gets a request of the user if not logged in', async () => {
    const expectedActions = 'USER_GET_REQUEST_FAILED';
    const store = mockStore({});
    await store.dispatch(getSingleRequest(another, 2))
      .then(() => {
        const action = store.getActions();
        expect(action[2].type).toEqual(expectedActions);
      });
  });
});
