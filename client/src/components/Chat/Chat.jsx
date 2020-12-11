import React, { createRef, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';
import './Chat.scss';

export const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const { selectedContact } = useContacts();
  const lastMessage = createRef();

  useEffect(() => {
    socket.emit('get-messages', selectedContact);
  }, [selectedContact]);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('get-messages', (messagesFromServer) => {
      setMessages(messagesFromServer);
    });

    socket.on('receive-message', (newMessage) => {
      setMessages(currentMessages => [...currentMessages, newMessage]);
    });

    // eslint-disable-next-line consistent-return
    return () => socket.off('receive-message');
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [lastMessage]);

  const changeMessage = useCallback(({ target }) => {
    setMessage(target.value);
  }, [setMessage]);

  const handelSubmit = useCallback((event) => {
    event.preventDefault();

    socket.emit('send-message', {
      text: message,
      recipient: selectedContact,
    });

    setMessage('');
  }, [setMessages, message]);

  const getContactMessages = useCallback(() => messages
    .filter(userMessage => userMessage.recipient === selectedContact.id
      || userMessage.sender === selectedContact.id),
  [messages, selectedContact]);

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
        {getContactMessages().map((chatMessage, i, allMessages) => (
          <div
            ref={allMessages.length - 1 === i ? lastMessage : null}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={classNames('chat__message', 'message', {
              'message--from-me': chatMessage.sender === user.id,
            })}
          >
            <div className="message__head">
              <p className="message__sender">
                {chatMessage.sender === selectedContact.id
                  ? selectedContact.name
                  : user.name
                }
              </p>
              <span className="message__date">{chatMessage.date}</span>
            </div>
            <div className="message__text-wrp">
              <span className="message__text">{chatMessage.text}</span>
              <span
                className={classNames('message__poiter', {
                  'message__poiter--right': chatMessage.sender === user.id,
                })}
              />
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
