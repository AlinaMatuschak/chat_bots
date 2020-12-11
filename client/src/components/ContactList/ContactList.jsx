import React from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { Contact } from '../Contact/Contact';
import './ContactList.scss';

export const ContactList = ({ contacts }) => {
  const {
    selectContact,
    selectedContact,
  } = useContacts();

  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <li
          key={contact.id}
          className={`contact-list__item ${selectedContact
            && selectedContact.id === contact.id
            ? 'contact-list__item--active'
            : ''}`}
          onClick={() => {
            selectContact(contact);
          }}
          aria-hidden="true"
        >
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
