import React from 'react';
import './App.scss';
import io from 'socket.io-client';
import { Chat } from './components/Chat';

// eslint-disable-next-line no-unused-vars
const socket = io('http://localhost:3000', {
  withCredentials: true,
  extraHeaders: {
    key: 'chat',
  },
});

export const App = () => (
  <div className="page">
    <div className="page__head">
      <h1 className="page__title">Chat bots 2.0</h1>
    </div>
    <div className="page__body">
      <Chat />
    </div>
  </div>
);
