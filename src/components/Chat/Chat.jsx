import React, { memo, useEffect, useState } from 'react';

import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';

import { ContactDetail } from '../ContactDetail';
import { ChatMessageList } from '../ChatMessageList/ChatMessageList';
import { ChatForm } from '../ChatForm/ChatForm';

import './Chat.scss';

export const Chat = memo(() => {
  const [messages, setMessages] = useState([]);
  const {
    socket,
    events: {
      EVENT_GET_MESSAGES,
      EVENT_GET_MESSAGE,
    },
    requestGetMessages,
    socketListener,
  } = useSocket();
  const { selectedContact } = useContacts();

  useEffect(() => {
    requestGetMessages(selectedContact);
  }, [selectedContact]);

  useEffect(() => {
    socketListener(setMessages, EVENT_GET_MESSAGES);
    socketListener((newMessage) => {
      setMessages(currentMessages => [...currentMessages, newMessage]);
    }, EVENT_GET_MESSAGE);
  }, [socket, EVENT_GET_MESSAGES, EVENT_GET_MESSAGE, socketListener]);

  return (
    <div className="chat">
      <div className="chat__detail">
        <ContactDetail />
      </div>

      <div className="chat__messages">
        <ChatMessageList messages={messages} />
      </div>

      <div className="chat__form">
        <ChatForm />
      </div>
    </div>
  );
});
