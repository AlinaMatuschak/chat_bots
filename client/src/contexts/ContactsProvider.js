import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { useSocket } from './SocketProvider';

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('contacts', (socketContacts) => {
      setContacts(socketContacts);
    });

    socket.on('update-users', (socketContacts) => {
      setContacts(socketContacts);
    });

    // eslint-disable-next-line consistent-return
    return () => socket.off('contacts');
  }, [socket, setContacts]);

  const value = useMemo(() => ({
    contacts,
    selectContact: setSelectedContact,
    selectedContact,
  }), [contacts, setSelectedContact, selectedContact]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
