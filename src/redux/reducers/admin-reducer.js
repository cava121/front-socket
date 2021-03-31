import axios from 'axios';
import { getAllUsersAC, getAllRoomsAC } from '../actions/admin-action';
const host = require('../../constants');

let initialState = {
  users: [],
  rooms: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_ROOMS':
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return (dispatch) => {
    updateTableUser(dispatch);
    updateTableRoom(dispatch);
  };
};

export const saveDataUser = (data) => {
  return (dispatch) => {
    axios.post(host.host + '/users', data).then(() => {
      updateTableUser(dispatch);
    });
  };
};

export const saveDataRoom = (data) => {
  return (dispatch) => {
    axios.post(host.host + '/data_room', data).then(() => {
      updateTableRoom(dispatch);
    });
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    axios.post(host.host + '/delete_users', { userId }).then(() => {
      updateTableUser(dispatch);
    });
  };
};

export const deleteRoom = (roomId) => {
  return (dispatch) => {
    axios.post(host.host + '/delete_room', { roomId }).then(() => {
      updateTableRoom(dispatch);
    });
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    axios.post(host.host + '/create_user', user).then(() => {
      updateTableUser(dispatch);
    });
  };
};

export const createRoom = (name) => {
  return (dispatch) => {
    axios.post(host.host + '/create_room', { name }).then(() => {
      updateTableRoom(dispatch);
    });
  };
};

const updateTableUser = (dispatch) => {
  axios.get(host.host + '/users').then((users) => {
    dispatch(getAllUsersAC(users.data));
  });
};

const updateTableRoom = (dispatch) => {
  axios.get(host.host + '/rooms').then((rooms) => {
    dispatch(getAllRoomsAC(rooms.data));
  });
};

export default adminReducer;
