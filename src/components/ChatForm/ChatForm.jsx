import React, { memo, useCallback, useState } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';
import './ChatForm.scss';

export const ChatForm = memo(() => {
  const [message, setMessage] = useState('');
  const { socket, events: { EVENT_SEND_MESSAGE } } = useSocket();
  const { selectedContact } = useContacts();

  const changeMessage = useCallback(({ target }) => {
    setMessage(target.value);
  }, [setMessage]);

  const handelSubmit = useCallback((event) => {
    event.preventDefault();

    if (!message.trim().length) {
      return;
    }

    socket.emit(EVENT_SEND_MESSAGE, {
      text: message,
      recipient: selectedContact,
    });

    setMessage('');
  }, [setMessage, message, selectedContact, EVENT_SEND_MESSAGE]);

  return (

    <form
      className="form"
      onSubmit={handelSubmit}
    >
      <input
        type="text"
        placeholder="Start chatting!"
        className="form__input"
        value={message}
        onChange={changeMessage}
      />
      <button
        type="submit"
        className="form__button"
      />
    </form>
  );
});
