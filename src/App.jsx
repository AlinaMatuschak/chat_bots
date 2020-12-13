import React from 'react';

import './App.scss';

import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';

import { Messager } from './components/Messager/Messager';
import { UserProvider } from './contexts/UserProvider';

export const App = () => (
  <UserProvider>
    <SocketProvider>
      <ContactsProvider>
        <div className="page">
          <div className="page__head">
            <h1 className="page__title">Chat bots 2.0</h1>
          </div>
          <div className="page__body">
            <Messager />
          </div>
        </div>
      </ContactsProvider>
    </SocketProvider>
  </UserProvider>
);
