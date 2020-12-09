import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { MessageForm } from '../MessageForm/MessageForm';
import { Sidebar } from '../Sidebar';
import './Chat.scss';

export const Chat = () => {
  const { selectedContactId } = useContacts();

  return (
    <div className="chat">
      <div className="chat-wrp">
        {selectedContactId && <MessageForm />}
      </div>
      <Sidebar />
    </div>
  );
};
