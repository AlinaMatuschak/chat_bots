import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { Chat } from '../Chat/Chat';
import { Sidebar } from '../Sidebar';
import './Messager.scss';

export const Messager = ({ user, addMessage }) => {
  const { selectedContact } = useContacts();

  return (
    <div className="messager">
      <div className="messager__chat-wrp">
        {selectedContact
          && <Chat user={user} addMessage={addMessage} />}
      </div>
      <div className="messager__sidebar-wrp">
        <Sidebar />
      </div>
    </div>
  );
};
