import React from 'react';
import './App.scss';
import { Chat } from './components/Chat';

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
