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
  const { socket, events: { EVENT_GET_CONTACTS } } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(EVENT_GET_CONTACTS, (socketContacts) => {
      setContacts(socketContacts);
    });

    return () => socket.off(EVENT_GET_CONTACTS);
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
