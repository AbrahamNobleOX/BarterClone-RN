import {
  LOG_LOADING,
  REG_LOADING,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  UPDATE_BALANCE,
  UPDATE_AMOUNT,
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  user: null,
  account_balance: 0.0,
  userEmail: null,
  userPhone: null,
  userRef: null,
  regLoading: false,
  logLoading: false,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REG_LOADING:
      return {
        ...state,
        regLoading: true,
      };
    case LOG_LOADING:
      return {
        ...state,
        logLoading: true,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        payload,
        regLoading: false,
        isAuthenticated: true,
        isLoading: false,
        logLoading: false,
        account_balance: payload.user.account_balance,
      };
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        regLoading: false,
        user: null,
        isAuthenticated: null,
        logLoading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        logLoading: false,
        account_balance: payload.account_balance,
      };
    case UPDATE_AMOUNT:
      return {
        ...state,
        account_balance: payload,
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        account_balance: payload,
      };
    default:
      return state;
  }
};
