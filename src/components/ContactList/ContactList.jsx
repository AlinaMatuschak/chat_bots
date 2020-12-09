import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import './ContactList.scss';

export const ContactList = () => {
  const {
    contacts,
    selectContactId,
    selectedContactId,
  } = useContacts();

  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <li
          key={contact.id}
          className={`contact-list__item ${selectedContactId === contact.id
            ? 'contact-list__item--active'
            : ''}`}
          onClick={() => {
            selectContactId(contact.id);
          }}
          aria-hidden="true"
        >
          {contact.name}
        </li>
      ))}
    </ul>
  );
};
