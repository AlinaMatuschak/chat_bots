import React, { memo, useEffect, useState } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { useSocket } from '../../contexts/SocketProvider';
import { ContactDetail } from '../ContactDetail';
import './Chat.scss';
import { ChatMessageList } from '../ChatMessageList/ChatMessageList';
import { ChatForm } from '../ChatForm/ChatForm';

export const Chat = memo(({ user }) => {
  const [messages, setMessages] = useState([]);
  const { socket, events: {
    EVENT_GET_MESSAGES,
    EVENT_GET_MESSAGE,
  } } = useSocket();
  const { selectedContact } = useContacts();

  useEffect(() => {
    socket.emit(EVENT_GET_MESSAGES, selectedContact);
  }, [selectedContact, EVENT_GET_MESSAGES]);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on(EVENT_GET_MESSAGES, (messagesFromServer) => {
      setMessages(messagesFromServer);
    });

    socket.on(EVENT_GET_MESSAGE, (newMessage) => {
      setMessages(currentMessages => [...currentMessages, newMessage]);
    });

    return () => socket.off(EVENT_GET_MESSAGES, EVENT_GET_MESSAGE);
  }, [socket, EVENT_GET_MESSAGES, EVENT_GET_MESSAGE]);

  return (
    <div className="chat">
      <div className="chat__detail">
        <ContactDetail />
      </div>

      <div className="chat__messages">
        <ChatMessageList user={user} messages={messages} />
      </div>

      <div className="chat__form">
        <ChatForm />
      </div>
    </div>
  );
});
