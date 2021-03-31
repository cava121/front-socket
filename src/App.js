import './App.css';
import AuthContainer from './components/Auth/AuthContainer';
import RoomContainer from './components/Room/RoomContainer';
import AdminContainder from './components/Admin/AdminContainer';
import socket from './socket/socket';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';

function App(props) {
  if (props.isConnect) {
    const obj = {
      roomId: props.currentRoom.toString(),
      name: props.user.name,
      userId: props.user.id,
    };
    props.joinRoom(props.currentRoom);
    setTimeout(() => {
      socket.emit('JOIN', obj);
    }, 0);
  }

  return (
    <div className="wrapper">
      <Router>
        {props.isConnect && <HeaderContainer isConnect={props.isConnect} />}
        <Switch>
          <Route exact path={['/', '/login']}>
            <AuthContainer />
          </Route>
          <Route path="/room" component={RoomContainer} />
          <Route path="/admin" component={AdminContainder} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
