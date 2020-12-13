import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ user, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => () => {
    socket.removeAllListeners();
  }, []);

  useEffect(() => {
    const newSocket = io(
      'https://chat-bots-server.herokuapp.com/',
      { query: user },
    );

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  const events = useMemo(() => ({
    EVENT_GET_CONTACTS: 'contacts',
    EVENT_GET_MESSAGES: 'get-messages',
    EVENT_SEND_MESSAGE: 'send-message',
    EVENT_GET_MESSAGE: 'receive-message',
  }), []);

  const socketListener = useCallback((callBack, event) => {
    if (!socket) {
      return;
    }

    socket.on(event, (respons) => {
      callBack(respons);
    });
  }, [socket]);

  const requestGetMessages = useCallback((selectedContact) => {
    socket.emit(events.EVENT_GET_MESSAGES, selectedContact);
  }, [socket]);

  const postMessage = useCallback((text, recipient) => {
    socket.emit(events.EVENT_SEND_MESSAGE, {
      text,
      recipient,
    });
  }, [socket]);

  const value = useMemo(() => ({
    socket,
    events,
    requestGetMessages,
    socketListener,
    postMessage,
  }), [socket, events]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
