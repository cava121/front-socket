import React from 'react';
import { Avatar, Badge, withStyles } from '@material-ui/core';
import s from '../Room.module.css';
import ru from 'date-fns/locale/ru';
import { fromUnixTime } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Message = (props) => {
  const getData = (time) => {
    var result = formatDistanceToNow(fromUnixTime(time), {
      addSuffix: true,
      locale: ru,
    });
    return result;
  };

  const avatar = (isOnline, name) => {
    if (isOnline) {
      return (
        <StyledBadge
          style={{ width: '100%' }}
          className={s.avatar__circle}
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={s.avatar__icon} alt={name} />
        </StyledBadge>
      );
    } else {
      return <Avatar className={s.avatar__icon} alt={name} />;
    }
  };

  if (props.user.toString() === props.userMessage.toString()) {
    return (
      <div className={s.message__right}>
        <div className={s.message_data}>
          <small>{getData(props.data_send)}</small>
        </div>
        <div style={{ justifyContent: 'flex-end' }} className={s.message}>
          <div style={{ marginRight: '10px' }}>
            <p>{props.text}</p>
          </div>
          <div className={s.message__avatar}>
            {avatar(props.isOnline, props.name)}
            <small>{props.name}</small>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={s.message__left}>
        <div className={s.message_data}>
          <small>{getData(props.data_send)}</small>
        </div>
        <div className={s.message}>
          <div className={s.message__avatar}>
            {avatar(props.isOnline, props.name)}
            <small>{props.name}</small>
          </div>
          <div>
            <p>{props.text}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
