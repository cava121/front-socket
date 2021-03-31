import { connect } from 'react-redux';
import Room from './Room';
import {
  getDataAPI,
  setUser,
  exitAccount,
  myNewMessage,
} from '../../redux/reducers/room-reducer';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currentRoom: state.auth.currentRoom,
    isConnect: state.auth.isConnect,
    users: state.room.users,
    messages: state.room.messages,
  };
};

const mapDispatchToProps = {
  getDataAPI,
  setUser,
  exitAccount,
  myNewMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
