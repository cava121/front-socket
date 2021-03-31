import React, { useRef, useState } from 'react';
import s from './auth.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Auth = (props) => {
  const login = useRef('');
  const password = useRef('');
  const room = useRef('');

  const classes = useStyles();
  const [formData, setFormData] = useState({
    user: {
      login: '',
      password: '',
      room: '',
    },
  });

  const handleChange = (e) => {
    const { user } = formData;
    user[e.target.name] = e.target.value;
    setFormData({ user });
  };

  const handlerSubmit = (e) => {
    let obj = {
      login: login.current.props.value,
      password: password.current.props.value,
      room: room.current.props.value,
    };
    props.checkUserDB(obj);
  };

  if (props.isConnect) {
    return <Redirect to="/room" />;
  }

  return (
    <div className={s.wrapper}>
      <div>
        <div className={s.title}>
          <div>
            <b>
              <h4>Войти в аккаунт</h4>
            </b>
          </div>
          <div className={s.subTitle}>
            <span>
              Пожалуйста войдите в свой аккаунт и выберите комнату для общения
            </span>
          </div>
        </div>
        <div>
          <ValidatorForm
            className={classes.root}
            onSubmit={handlerSubmit}
            autoComplete="off"
          >
            <TextValidator
              label="Логин"
              ref={login}
              type="text"
              name="login"
              variant="outlined"
              style={{ margin: '8px 0' }}
              fullWidth
              validators={['required']}
              onChange={handleChange}
              errorMessages={['Данная поле обязательное']}
              value={formData.user.login}
            />
            <TextValidator
              ref={password}
              label="Пароль"
              type="password"
              name="password"
              autoComplete="current-password"
              variant="outlined"
              style={{ margin: '8px 0' }}
              validators={['required']}
              onChange={handleChange}
              errorMessages={['Данная поле обязательное']}
              value={formData.user.password}
              fullWidth
            />
            <TextValidator
              style={{ margin: '8px 0' }}
              id="outlined-basic"
              ref={room}
              label="Комната"
              type="text"
              fullWidth
              name="room"
              variant="outlined"
              validators={['required']}
              onChange={handleChange}
              errorMessages={['Данная поле обязательное']}
              value={formData.user.room}
            />
            {props.error && <div style={{ color: 'red' }}>{props.error}</div>}
            <Button
              style={{ margin: '8px 0' }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Войти
            </Button>
          </ValidatorForm>
        </div>
      </div>
    </div>
  );
};

export default Auth;
