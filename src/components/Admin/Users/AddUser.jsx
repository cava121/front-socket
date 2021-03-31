import React, { useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import s from '../Admin.module.css';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddUser = (props) => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    admin: '',
    rooms: '',
    id: '',
  });

  const classes = useStyles();

  const usersSubmit = () => {
    props.createUser(user);
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
      changeUser[e.target.name] = e.target.checked ? 1 : 0;
      setUser(changeUser);
    } else {
      changeUser[e.target.name] = e.target.value;
      setUser(changeUser);
    }
  };

  //   debugger;

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
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.login}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={s.data_user}>
        {
          <ValidatorForm
            className={s.users__form + ' ' + classes.root}
            onSubmit={usersSubmit}
            autoComplete="off"
          >
            <TextValidator
              required
              fullWidth
              name="email"
              onChange={changeHandler}
              label="Email"
            />
            <TextValidator
              required
              fullWidth
              name="name"
              onChange={changeHandler}
              label="Имя"
              value={user.name}
            />
            <TextValidator
              required
              fullWidth
              name="login"
              onChange={changeHandler}
              label="Логин"
            />
            <TextValidator
              required
              fullWidth
              name="password"
              onChange={changeHandler}
              label="Пароль"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!user?.admin}
                  onChange={changeHandler}
                  name="admin"
                  color="primary"
                />
              }
              label="Администратор"
            />
            {!user?.admin && <h5>Список доступных комнат</h5>}
            {!user?.admin &&
              props.rooms.map((room) => {
                return (
                  <FormControlLabel
                    key={room.name}
                    control={
                      <Checkbox
                        checked={
                          user?.rooms == null
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
              variant="contained"
              color="primary"
              className={s.button}
              fullWidth
              type="submit"
              endIcon={<AddBoxIcon>Создать</AddBoxIcon>}
            >
              Создать
            </Button>
          </ValidatorForm>
        }
      </div>
    </div>
  );
};

export default AddUser;
