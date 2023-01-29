import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  auth: authReducer,
  err: errorReducer,
  trx: transactionReducer,
});
