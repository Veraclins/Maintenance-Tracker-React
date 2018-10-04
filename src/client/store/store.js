import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from '../shared/rootReducer';
import { saveState, loadState } from '../shared/utilities/persistState';
import history from '../shared/utilities/history';


const configureStore = () => {
  const persistedState = loadState();


  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    connectRouter(history)(rootReducer),
    persistedState,
    composeEnhancer(applyMiddleware(ReduxThunk, routerMiddleware(history))),
  );
  store.subscribe(throttle(() => saveState(store.getState()), 1000));
  return store;
};

export default configureStore;
