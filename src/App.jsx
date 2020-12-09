import React, { useCallback } from 'react';
import './App.scss';
import { Messager } from './components/Messager/Messager';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import { randomNameGenerator } from './helpers/randomNameGenerator';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App = () => {
  const [user, setUser] = useLocalStorage('user', {
    id: Date.now(),
    name: randomNameGenerator(),
    img: 'https://img.icons8.com/dusk/64/000000/change-user-male.png',
    messages: [],
  });

  const addMessage = useCallback((message) => {
    setUser(currentUser => ({
      ...currentUser,
      messages: [...currentUser.messages, message],
    }));
  }, [setUser]);

  return (
    <SocketProvider user={user}>
      <ContactsProvider>
        <div className="page">
          <div className="page__head">
            <h1 className="page__title">Chat bots 2.0</h1>
          </div>
          <div className="page__body">
            <Messager user={user} addMessage={addMessage} />
          </div>
        </div>
      </ContactsProvider>
    </SocketProvider>
  );
};
