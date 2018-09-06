import { combineReducers } from 'redux';
import loginUser from '../features/authentication/authReducer';


const rootReducer = combineReducers({
  login: loginUser,
});

export default rootReducer;
