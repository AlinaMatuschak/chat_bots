import React, { createRef, useCallback, useEffect, useState } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';
import './Chat.scss';

export const Chat = ({ user, addMessage }) => {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const { selectedContact } = useContacts();
  const lastMessage = createRef();

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('receive-message', (newMessage) => {
      addMessage(newMessage);
    });

    // eslint-disable-next-line no-console
    console.log(user.messages);

    // eslint-disable-next-line consistent-return
    return () => socket.off('receive-message');
  }, [socket, addMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [lastMessage]);

  const changeMessage = useCallback(({ target }) => {
    setMessage(target.value);
  }, [setMessage]);

  const handelSubmit = useCallback((event) => {
    event.preventDefault();

    socket.emit('send-message', {
      text: message, recipient: selectedContact,
    });

    setMessage('');
  }, [addMessage, message]);

  const getContactMessages = useCallback(() => user
    .messages
    .filter(userMessage => userMessage.recipient === selectedContact.id
        || userMessage.sender === selectedContact.id),
  [user, selectedContact]);

  const scrollToBottom = useCallback(() => {
    if (!lastMessage.current) {
      return;
    }

    lastMessage.current.scrollIntoView({ behavior: 'smooth' });
  }, [lastMessage]);

  return (
    <div className="chat">
      <div className="chat__detail detail">
        <img
          src={selectedContact.img}
          alt="contact img"
          className="detail__img"
        />
        <div className="detail__inf">
          <h2 className="detail__name">{selectedContact.name}</h2>
          {selectedContact.description && (
            <p className="detail__description">
              {selectedContact.description}
            </p>
          )}
        </div>
      </div>
      <div className="chat__messages">
        {getContactMessages().map((chatMessage, i, messages) => (
          <div
            ref={messages.length - 1 === i ? lastMessage : null}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="chat__message message"
          >
            <div className="message__head">
              <p className="message__sender">{chatMessage.sender}</p>
              <span className="message__date">{chatMessage.date}</span>
            </div>
            <div className="message__text-wrp">
              <span className="message__text">{chatMessage.text}</span>
              <span className="message__poiter" />
            </div>
          </div>
        ))}
      </div>
      <form
        className="chat__form"
        onSubmit={handelSubmit}
      >
        <input
          type="text"
          placeholder="Start chatting!"
          className="chat__input"
          value={message}
          onChange={changeMessage}
        />
        <button
          type="submit"
          className="chat__button"
        >
          Send message
        </button>
      </form>
    </div>
  );
};
