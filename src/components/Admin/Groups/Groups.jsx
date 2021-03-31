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

const Groups = (props) => {
  const [room, setRoom] = useState('');
  const selectRoom = (id) => {
    let index = props.rooms.findIndex((room) => room.id === id);
    setRoom(props.rooms[index]);
  };

  const roomSubmit = () => {
    const rooms = {
      name: room.name,
      id: room.id,
    };
    props.saveDataRoom(rooms);
  };

  const changeHandler = (e) => {
    setRoom({
      name: e.target.value,
      id: e.target.id,
    });
  };

  const deleteRoom = () => {
    props.deleteRoom(room.id);
  };

  return (
    <div className={s.table__wrapper}>
      <div className={s.table}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id пользователя</TableCell>
                <TableCell>Название комнаты</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rooms
                .sort((a, b) => a.id - b.id)
                .map((room) => {
                  return (
                    <TableRow key={room.id}>
                      <TableCell onClick={() => selectRoom(room.id)}>
                        {room.id}
                      </TableCell>
                      <TableCell onClick={() => selectRoom(room.id)}>
                        {room.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={s.data_user}>
        {room && (
          <form onSubmit={roomSubmit} className={s.users__form}>
            <TextField
              fullWidth
              name="name"
              onChange={changeHandler}
              value={room.name}
              label="name"
              id={room.id.toString()}
            />
            <Button
              style={{ marginTop: '1rem' }}
              onClick={roomSubmit}
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
              onClick={deleteRoom}
              variant="contained"
              className={s.button}
              fullWidth
              endIcon={<DeleteIcon>Удалить пользователя</DeleteIcon>}
            >
              Удалить комнату
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Groups;
