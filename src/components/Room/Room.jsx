import { Button, TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import socket from '../../socket/socket';
import s from './Room.module.css';
import User from './Users/User';
import Message from './Messages/Message';

const Room = (props) => {
  const textMessage = useRef('');
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollTo(0, 99999);
  }, [props.messages]);

  const sendMessage = () => {
    let obj = {
      text: textMessage.current.value,
      id_user: props.user.id.toString(),
      name_send: props.user.name,
      data_send: Math.round(new Date().getTime() / 1000).toString(),
      id_room: props.currentRoom.toString(),
    };
    if (!textMessage.current.value.trim().length) {
      alert('Ваше сообщение пустое');
      return;
    }
    socket.emit('NEW_MESSAGE', obj);
    textMessage.current.value = '';
    props.myNewMessage(obj);
  };

  useEffect(() => {
    socket.on('SET_USERS', (users) => {
      props.setUser(users);
    });
    socket.on('JOINED', () => {
      props.getDataAPI(props.currentRoom, props.user.id, props.user.name); // запрос на получение текущим данных в комнате
      socket.emit('SEND_ALL_JOIN', { roomId: props.currentRoom.toString() });
    });
    socket.on('NEW_MESSAGE', (message) => {
      props.myNewMessage(message);
    });
  });

  const usersId = props.users.map((item) => item.id);

  return (
    <div className={s.wrapper}>
      <div className={s.chat}>
        <div className={s.chat__wrapper}>
          <div className={s.users}>
            <p className={s.title}>
              Комната: <b>{props.currentRoom}</b>{' '}
            </p>
            <b></b>
            <hr />
            <p className={s.title}>
              Онлайн: <b>{props.users.length}</b>
            </p>
            <div>
              {props.users.map((item) => {
                return <User key={item.id} name={item.name} />;
              })}
            </div>
          </div>
          <div className={s.messages}>
            <div ref={messageRef} className={s.text}>
              {props.messages.map((item) => {
                let isOnline = false;
                if (usersId.includes(+item.id_user)) {
                  isOnline = true;
                }

                return (
                  <Message
                    key={item.data_send}
                    name={item.name_send}
                    data_send={item.data_send}
                    text={item.text}
                    user={props.user.id}
                    userMessage={item.id_user}
                    users={props.users}
                    isOnline={isOnline}
                  />
                );
              })}
            </div>
            <div className={s.send__wrapper}>
              <TextField
                id="outlined-textarea"
                label="Введите текст"
                multiline
                variant="outlined"
                fullWidth
                inputRef={textMessage}
              />
              <Button
                style={{ marginTop: '0.5rem' }}
                variant="contained"
                color="primary"
                onClick={sendMessage}
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
