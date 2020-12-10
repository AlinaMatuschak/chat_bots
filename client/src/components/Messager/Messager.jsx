import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { MessageForm } from '../MessageForm/MessageForm';
import { Sidebar } from '../Sidebar';
import './Messager.scss';

export const Messager = ({ user, addMessage }) => {
  const { selectedContactId } = useContacts();

  return (
    <div className="messager">
      <div className="messager__chat-wrp">
        {selectedContactId
          && <MessageForm user={user} addMessage={addMessage} />}
      </div>
      <Sidebar />
    </div>
  );
};
