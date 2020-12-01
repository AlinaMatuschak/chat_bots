import React from 'react';
import { ChatList } from '../ChatList/ChatList';
import { MessageForm } from '../MessageForm/MessageForm';
import './Chat.scss';

export const Chat = () => (
  <div className="chat">
    <MessageForm />
    <ChatList />
  </div>
);
