import React, { createRef, memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { useContacts } from '../../contexts/ContactsProvider';
import { useUser } from '../../contexts/UserProvider';

import './ChatMessageList.scss';

export const ChatMessageList = memo(({ messages }) => {
  const { selectedContact } = useContacts();
  const lastMessage = createRef();
  const user = useUser();

  useEffect(() => {
    scrollToBottom();
  }, [lastMessage]);

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
    <>
      {getContactMessages().map((chatMessage, i, allMessages) => (
        <div
          ref={allMessages.length - 1 === i ? lastMessage : null}
          key={chatMessage.id}
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
    </>
  );
});
