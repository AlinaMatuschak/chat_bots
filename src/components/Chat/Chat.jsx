import React from 'react';
import io from 'socket.io-client';
import { ChatList } from '../ChatList/ChatList';
import { MessageForm } from '../MessageForm/MessageForm';
import './Chat.scss';

// eslint-disable-next-line no-unused-vars
const socket = io('http://localhost:3000', {
  withCredentials: true,
  extraHeaders: {
    key: 'chat',
  },
});

export const Chat = () => (
  <div className="chat">
    <MessageForm />
    <ChatList />
  </div>
);
