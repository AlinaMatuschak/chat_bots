import React, { memo, useCallback, useState } from 'react';

import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';

import './ChatForm.scss';

export const ChatForm = memo(() => {
  const [message, setMessage] = useState('');
  const { postMessage } = useSocket();
  const { selectedContact } = useContacts();

  const changeMessage = useCallback(({ target }) => {
    setMessage(target.value);
  }, [setMessage]);

  const handelSubmit = useCallback((event) => {
    event.preventDefault();

    if (!message.trim().length) {
      return;
    }

    postMessage(message, selectedContact);
    setMessage('');
  }, [setMessage, message, selectedContact, postMessage]);

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
