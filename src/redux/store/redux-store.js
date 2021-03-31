import { combineReducers } from 'redux';
import authReducer from '../reducers/auth-reducer';
import roomReducers from '../reducers/room-reducer';
import adminReducer from '../reducers/admin-reducer';

const reducers = combineReducers({
  auth: authReducer,
  room: roomReducers,
  admin: adminReducer,
});

export default reducers;
