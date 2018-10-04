/**
 * @description Loads the state from localStorage. If no state is found,
 * return undefined so that reducers can instantiate the state.
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null || serializedState === 'undefined') return undefined;
    const state = JSON.parse(serializedState);
    state.common.loading = false;
    return state;
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Saves a copy of the state to the browser's localStorage
 * @param {object} state The state object
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem('state', serializedState);
  } catch (error) {
    return null;
  }
};

/**
 * @description clears everything in the localStorage
 */
export const clearState = () => {
  localStorage.clear();
};
