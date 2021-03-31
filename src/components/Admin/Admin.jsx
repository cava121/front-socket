import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import s from './Admin.module.css';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import Users from './Users/Users';
import AddUser from './Users/AddUser';
import Groups from './Groups/Groups';
import AddGroup from './Groups/AddGroup';

const Admin = (props) => {
  useEffect(() => {
    props.getAllUsers();
  }, []);

  const [show, setShow] = useState({
    users: true,
    groups: false,
    addUser: false,
    addGroup: false,
  });

  const getUsers = () => {
    setShow({
      users: true,
      groups: false,
      addUser: false,
      addGroup: false,
    });
    props.getAllUsers();
  };

  const addUsers = () => {
    setShow({
      users: false,
      groups: false,
      addUser: true,
      addGroup: false,
    });
    props.getAllUsers();
  };

  const getGroup = () => {
    setShow({
      users: false,
      groups: true,
      addUser: false,
      addGroup: false,
    });
    props.getAllUsers();
  };

  const addGroup = () => {
    setShow({
      users: false,
      groups: false,
      addUser: false,
      addGroup: true,
    });
    props.getAllUsers();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.panel}>
        <div className={s.panel__header}>
          <Button
            onClick={getUsers}
            variant="contained"
            color="primary"
            className={s.button}
            endIcon={
              <SupervisorAccountIcon>Все пользователи</SupervisorAccountIcon>
            }
          >
            Все пользователи
          </Button>
          <Button
            onClick={getGroup}
            variant="contained"
            color="primary"
            className={s.button}
            endIcon={<QuestionAnswerIcon>Все комнаты</QuestionAnswerIcon>}
          >
            Все комнаты
          </Button>
          <Button
            onClick={addUsers}
            variant="contained"
            color="primary"
            className={s.button}
            endIcon={<AddIcon>Создать пользователя</AddIcon>}
          >
            Создать пользователя
          </Button>
          <Button
            onClick={addGroup}
            variant="contained"
            color="primary"
            className={s.button}
            endIcon={<PlaylistAddIcon>Создать комнату</PlaylistAddIcon>}
          >
            Создать комнату
          </Button>
        </div>
        <div className={s.panel__content}>
          {show.users && (
            <Users
              saveDataUser={props.saveDataUser}
              rooms={props.rooms}
              users={props.users}
              deleteUser={props.deleteUser}
              getAllUsers={props.getAllUsers}
            />
          )}
          {show.addUser && (
            <AddUser
              users={props.users}
              rooms={props.rooms}
              createUser={props.createUser}
            />
          )}
          {show.groups && (
            <Groups
              deleteRoom={props.deleteRoom}
              saveDataRoom={props.saveDataRoom}
              rooms={props.rooms}
            />
          )}
          {show.addGroup && (
            <AddGroup createRoom={props.createRoom} rooms={props.rooms} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
