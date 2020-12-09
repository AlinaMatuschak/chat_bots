import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ user, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(
      'http://localhost:3000',
      { query: user },
    );

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  // useEffect(() => {
  //   socket.on('disconnect', (reason) => {
  //     setUser(currentUser => ({
  //       ...currentUser,
  //       isOnline: false,
  //     }));
  //   });
  // }, [socket, setUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
