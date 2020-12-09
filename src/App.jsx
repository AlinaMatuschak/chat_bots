import React from 'react';
import './App.scss';
import { Chat } from './components/Chat';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import { randomNameGenerator } from './helpers/randomNameGenerator';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App = () => {
  const [user] = useLocalStorage('user', {
    id: Date.now(),
    name: randomNameGenerator(),
  });

  return (
    <SocketProvider user={user}>
      <ContactsProvider>
        <div className="page">
          <div className="page__head">
            <h1 className="page__title">Chat bots 2.0</h1>
          </div>
          <div className="page__body">
            <Chat />
          </div>
        </div>
      </ContactsProvider>
    </SocketProvider>
  );
};
