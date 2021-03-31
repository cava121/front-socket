import axios from 'axios';
import { checkUserAC } from '../actions/auth-action';
const host = require('../../constants');

let initialState = {
  isConnect: JSON.parse(localStorage.getItem('user')) ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  currentRoom: JSON.parse(localStorage.getItem('room')) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'checkUser':
      return {
        ...state,
        error: action.payload[0].error,
        user: action.payload[0].user,
        isConnect: action.payload[0].error ? false : true,
        currentRoom: action.payload[1],
      };
    case 'EXIT_ACCOUNT':
      return {
        ...state,
        user: null,
        error: null,
        currentRoom: null,
        isConnect: false,
      };
    default:
      return state;
  }
};

export const checkUserDB = (data) => {
  return (dispatch) => {
    axios.post(host.host + '/check_user', data).then((response) => {
      if (!response.data.error) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('room', data.room);
      }
      dispatch(checkUserAC([response.data, data.room]));
    });
  };
};

export default authReducer;
