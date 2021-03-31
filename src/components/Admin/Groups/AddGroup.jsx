import React, { useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Button,
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

const AddGroup = (props) => {
  const [name, setName] = useState('');

  const roomSubmit = () => {
    props.createRoom(name);
    setName('');
  };

  const changeHandler = (e) => {
    setName(e.target.value);
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
                      <TableCell>{room.id}</TableCell>
                      <TableCell>{room.name}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={s.data_user}>
        <form onSubmit={roomSubmit} className={s.users__form}>
          <TextField
            fullWidth
            name="name"
            value={name}
            onChange={changeHandler}
            label="Название комнаты"
          />
          <Button
            style={{ marginTop: '1rem' }}
            onClick={roomSubmit}
            variant="contained"
            color="primary"
            className={s.button}
            fullWidth
            endIcon={<SaveIcon>Создать комнату</SaveIcon>}
          >
            Создать комнату
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
