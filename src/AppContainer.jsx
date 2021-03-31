import { connect } from 'react-redux';
import App from './App';
import { getDataAPI, joinRoom } from './redux/reducers/room-reducer';

const mapStateToProps = (state) => {
  return {
    currentRoom: state.auth.currentRoom,
    user: state.auth.user,
    isConnect: state.auth.isConnect,
  };
};

const mapDispatchToProps = {
  getDataAPI,
  joinRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
