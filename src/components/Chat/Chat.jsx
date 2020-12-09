import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { MessageForm } from '../MessageForm/MessageForm';
import { Sidebar } from '../Sidebar';
import './Chat.scss';

export const Chat = ({ user, addMessage }) => {
  const { selectedContactId } = useContacts();

  return (
    <div className="chat">
      <div className="chat-wrp">
        {selectedContactId
          && <MessageForm user={user} addMessage={addMessage} />}
      </div>
      <Sidebar />
    </div>
  );
};
