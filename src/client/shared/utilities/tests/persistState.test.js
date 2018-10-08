import { saveState, loadState } from '../persistState';

describe('persistState', () => {
  it('saves the current value of the state', async () => {
    const state = {
      auth: {
        user: {},
        isAdmin: false,
      },
      requests: {},
      common: {},
    };
    await saveState(state);
    state.common = {
      loading: false,
    };
    const savedState = await loadState();
    expect(savedState).toEqual(state);
  });
});
