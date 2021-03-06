import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomNameGenerator } from '../helpers/randomNameGenerator';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user] = useLocalStorage('user', {
    id: uuidv4(),
    name: randomNameGenerator(),
    img: 'https://img.icons8.com/dusk/64/000000/change-user-male.png',
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
