import { connect } from 'react-redux';
import Header from './Header';
import { exitAccount } from '../../redux/reducers/room-reducer';

const mapStateToProps = (state) => {
  return {
    isConnect: state.auth.isConnect,
    user: state.auth.user,
    currentRoom: state.auth.currentRoom,
  };
};

const mapDispatchToProps = {
  exitAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
