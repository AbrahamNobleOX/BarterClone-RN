import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  API_URI,
  REG_LOADING,
  LOG_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
} from './types';
import { CLEAR_ERRORS } from './types';
import { returnErrors } from './errActions';

// If I read and understand this registeration comments I'll understand everything else
// newUser passed is gotten or dispatched from Signup.js
export const register = (newUser) => async (dispatch) => {

  // this call from reducers will set the initial state of corresponding variable, this sets registration loading to true
  dispatch({ type: REG_LOADING });

  // convert newUser array gotten from Signup.js file to json by stringifying
  const data = JSON.stringify(newUser);

  // Make a post request to add json data to database
  await axios({
    method: 'POST',
    url: `${API_URI}/api/users`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // Get token from json response
      const { token } = res.data;
      // store token inside app's local storage
      AsyncStorage.setItem('@token', token);

      // this call from reducers will set the initial state of corresponding variable, this sets loading to true
      dispatch({ type: CLEAR_ERRORS });
      // the payload here contains the json returned after succesful registeration i.e the res.data below
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      // this call from reducers will set the initial state of corresponding variable, this sets loading to true
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL',
        ),
      );
    });
};

export const login = ({ email, password }) => async (dispatch) => {
  // Start logging loading
  dispatch({ type: LOG_LOADING });
  // stringify data
  const data = JSON.stringify({ email, password });

  await axios({
    method: 'POST',
    url: `${API_URI}/api/auth`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // Get token and user from login response json
      const { token, user } = res.data;
      console.log(user.account_balance);

      // store token inside app's local storage
      AsyncStorage.setItem('@token', token);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      // Stop logging loading
      dispatch({ type: LOGIN_FAIL });
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'),
      );
    });
};

//** Amazon Load User */
export const loadUser = () => async (dispatch) => { };
