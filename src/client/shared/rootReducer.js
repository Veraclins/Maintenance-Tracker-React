import { combineReducers } from 'redux';
import authReducer from '../features/authentication/authReducer';
import requestsReducer from '../features/requests/requestsReducer';
import commonReducer from './common/commonReducer';


export const appReducer = combineReducers({
  auth: authReducer,
  requests: requestsReducer,
  common: commonReducer,
});

export default appReducer;
