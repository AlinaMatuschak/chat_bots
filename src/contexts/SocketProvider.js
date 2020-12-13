import React, { useContext, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ user, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(
      'https://chat-bots-server.herokuapp.com/',
      { query: user },
    );

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  const events = useMemo(() => ({
    EVENT_CONECT: 'connection',
    EVENT_GET_CONTACTS: 'contacts',
    EVENT_GET_MESSAGES: 'get-messages',
    EVENT_SEND_MESSAGE: 'send-message',
    EVENT_GET_MESSAGE: 'receive-message',
    EVENT_DISCONNECT: 'disconnect',
  }), []);

  const value = useMemo(() => ({
    socket,
    events,
  }), [socket, events]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
