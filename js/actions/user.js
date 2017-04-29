import {Actions} from 'react-native-router-flux';
import * as types from './types';
import userApi from '../api/UserApi';

export function message(message, level) {
  return {
    type: types.ADD_NOTIFICATION,
    message: message,
    level: level
  }
}

/* Get all users */
export function allUsers(jwt) {
  return function (dispatch) {
    return userApi.getAllUsers(jwt).then(response => {
      dispatch({
        type: types.GET_ALL_USERS,
        users: response.body
      });
    }).catch(error => {
      throw(error);
    });
  };
}


/* Registration user */
export function addUser(paramsUser) {
  return (dispatch) => {
    return userApi.createUser(paramsUser).then(response => {
      Actions.signin();
      dispatch(message(response.message.text, response.message.type));
    }).catch(error => {
      throw(error);
    });
  };
}