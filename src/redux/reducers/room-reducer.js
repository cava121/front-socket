import axios from 'axios';
import { set_DataAC, set_UserAC, myNewMessageAC } from '../actions/room-action';
import { exitAccountAC } from '../actions/auth-action';
const host = require('../../constants');

let initialState = {
  users: [],
  messages: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        users: uniq(action.payload.users),
        messages: action.payload.messages,
      };

    case 'SET_USER':
      return {
        ...state,
        users: uniq(action.payload),
      };
    case 'MY_NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export const getDataAPI = (roomId, userId) => {
  return (dispatch) => {
    axios
      .post(host.host + '/data_room/' + roomId, {
        userId: userId,
      })
      .then((response) => {
        dispatch(set_DataAC(response.data));
      });
  };
};

export const exitAccount = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('room');
    dispatch(exitAccountAC());
  };
};

export const joinRoom = (roomId) => {
  return (dispatch) => {
    axios.post(host.host + '/room/' + roomId);
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(set_UserAC(user));
  };
};

export const myNewMessage = (message) => {
  return (dispatch) => {
    dispatch(myNewMessageAC(message));
  };
};

// уникальный объект в массиве
const uniq = function (xs) {
  var seen = {};
  return xs.filter(function (x) {
    var key = JSON.stringify(x);
    return !(key in seen) && (seen[key] = x);
  });
};

export default roomReducer;
