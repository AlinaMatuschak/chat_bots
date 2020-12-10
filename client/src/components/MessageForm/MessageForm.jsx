import React, { useCallback, useEffect, useState } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';
import './MessageForm.scss';

export const MessageForm = ({ user, addMessage }) => {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const { selectedContactId } = useContacts();

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('receive-message', (newMessage) => {
      addMessage(newMessage);
    });

    // eslint-disable-next-line consistent-return
    return () => socket.off('receive-message');
  }, [socket, addMessage]);

  const changeMessage = useCallback(({ target }) => {
    setMessage(target.value);
  }, [setMessage]);

  const handelSubmit = useCallback((event) => {
    event.preventDefault();

    socket.emit('send-message', {
      message, recipient: selectedContactId,
    });

    addMessage({
      text: message,
      sender: user.id,
      recipient: selectedContactId,
    });

    setMessage('');
  }, [addMessage, message]);

  const getContactMessages = useCallback(() => user
    .messages
    .filter(userMessage => userMessage.recipient === selectedContactId
        || userMessage.sender === selectedContactId),
  [user, selectedContactId]);

  return (
    <div className="message-form">
      <div className="message-form__detail">
        {/* <img src="" alt="" srcset=""/> */}
        <h2>name</h2>
        <p>description</p>
      </div>
      <div className="message-form__messages">
        {getContactMessages().map((chatMessage, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i}>{chatMessage.text}</p>
        ))}
      </div>
      <form
        className="message-form__form"
        onSubmit={handelSubmit}
      >
        <input
          type="text"
          placeholder="Start chatting!"
          className="message-form__input"
          value={message}
          onChange={changeMessage}
        />
        <button
          type="submit"
          className="message-form__button"
        >
          Send message
        </button>
      </form>
    </div>
  );
};
