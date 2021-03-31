import { connect } from 'react-redux';
import Admin from './Admin';
import {
  getAllUsers,
  saveDataUser,
  deleteUser,
  createUser,
  deleteRoom,
  saveDataRoom,
  createRoom,
} from '../../redux/reducers/admin-reducer';

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    rooms: state.admin.rooms,
  };
};

const mapDispatchToProps = {
  getAllUsers,
  saveDataUser,
  deleteUser,
  createUser,
  deleteRoom,
  saveDataRoom,
  createRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
