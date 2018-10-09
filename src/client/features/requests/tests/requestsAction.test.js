import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  clearValidationErrors,
  clearErrors,
} from '../requestsAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
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
});
