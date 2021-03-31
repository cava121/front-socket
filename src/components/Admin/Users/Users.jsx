import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import s from '../Admin.module.css';
import { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const Users = (props) => {
  const [user, setUser] = useState('');
  const selectUser = (id) => {
    let index = props.users.findIndex((user) => user.id === id);
    setUser(props.users[index]);
  };

  const usersSubmit = () => {
    const users = {
      email: user.email,
      name: user.name,
      admin: user.admin == true ? 1 : false,
      rooms: user.rooms,
      id: user.id,
    };
    props.saveDataUser(users);
  };

  const changeHandler = (e) => {
    let changeUser = { ...user };

    if (e.target.name == 'rooms') {
      let currentRooms = changeUser.rooms;
      if (e.target.checked) {
        let changeRooms = currentRooms == null ? [] : currentRooms.split(',');
        changeRooms.push(e.target.id);
        setUser({ ...changeUser, rooms: changeRooms.join(',') });
      } else {
        let changeRooms = currentRooms
          .split(',')
          .filter((room) => room != e.target.id);
        setUser({ ...changeUser, rooms: changeRooms.join(',') });
      }
    } else if (e.target.name == 'admin') {
      changeUser[e.target.name] = e.target.checked;
      setUser(changeUser);
    } else {
      changeUser[e.target.name] = e.target.value;
      setUser(changeUser);
    }
  };

  const deleteUser = (e) => {
    props.deleteUser(user.id);
  };

  return (
    <div className={s.table__wrapper}>
      <div className={s.table}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id пользователя</TableCell>
                <TableCell>Логин</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users
                .sort((a, b) => a.id - b.id)
                .map((user) => {
                  return (
                    <TableRow key={user.login + user.id}>
                      <TableCell onClick={() => selectUser(user.id)}>
                        {user.id}
                      </TableCell>
                      <TableCell onClick={() => selectUser(user.id)}>
                        {user.login}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={s.data_user}>
        {user && (
          <form onSubmit={usersSubmit} className={s.users__form}>
            <TextField
              fullWidth
              name="email"
              onChange={changeHandler}
              value={user.email}
              label="Email"
            />
            <TextField
              fullWidth
              value={user.name}
              onChange={changeHandler}
              name="name"
              label="Имя"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!user.admin}
                  onChange={changeHandler}
                  name="admin"
                  color="primary"
                />
              }
              label="Администратор"
            />
            {!user.admin && <h5>Список доступных комнат</h5>}
            {!user.admin &&
              props.rooms.map((room) => {
                return (
                  <FormControlLabel
                    key={room.name}
                    control={
                      <Checkbox
                        checked={
                          user.rooms == null
                            ? false
                            : user.rooms
                                .split(',')
                                .some((item) => item == room.id)
                        }
                        onChange={changeHandler}
                        name="rooms"
                        id={room.id.toString()}
                        color="primary"
                      />
                    }
                    label={room.name}
                  />
                );
              })}
            <Button
              style={{ marginTop: '1rem' }}
              onClick={usersSubmit}
              variant="contained"
              color="primary"
              className={s.button}
              fullWidth
              endIcon={<SaveIcon>Сохранить</SaveIcon>}
            >
              Сохранить
            </Button>
            <Button
              style={{ marginTop: '1rem' }}
              onClick={deleteUser}
              variant="contained"
              className={s.button}
              fullWidth
              endIcon={<DeleteIcon>Удалить пользователя</DeleteIcon>}
            >
              Удалить пользователя
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Users;
