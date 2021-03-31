import React from 'react';
import User from '../Room/Users/User';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = (props) => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const menuOpen = (event) => {
    setMenu(event.currentTarget);
  };

  const exitAccount = () => {
    props.exitAccount();
    history.push('/login');
  };

  const menuClose = (event) => {
    setMenu(null);
  };

  const pcAccount = () => {
    history.push('/admin');
  };

  let showPageAdmin = false;

  const path = history.location.pathname;
  if (path.indexOf('admin') === -1) {
    showPageAdmin = true;
  }

  return (
    <AppBar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={menuOpen}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={menuClose}
        >
          {!!props.user.admin && showPageAdmin && (
            <MenuItem onClose={menuClose} onClick={pcAccount}>
              Панель управления
            </MenuItem>
          )}
          {!showPageAdmin && (
            <MenuItem onClose={menuClose} onClick={() => history.push('/room')}>
              Комната {props.currentRoom}
            </MenuItem>
          )}
          <MenuItem onClose={menuClose} onClick={exitAccount}>
            Выйти
          </MenuItem>
        </Menu>
        <IconButton edge="end" color="inherit">
          <User name={props.user.name} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
