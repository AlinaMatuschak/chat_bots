import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import { useContacts } from '../../contexts/ContactsProvider';
import { Contact } from '../Contact/Contact';
import './ContactList.scss';

export const ContactList = memo(({ contacts, hideSidebar }) => {
  const {
    selectContact,
    selectedContact,
  } = useContacts();

  const isActiveContact = useCallback(
    id => selectedContact && selectedContact.id === id,
    [selectedContact],
  );

  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <li
          key={contact.id}
          className={classNames('contact-list__item', {
            'contact-list__item--active': isActiveContact(contact.id),
          })}
          onClick={() => {
            selectContact(contact);
            hideSidebar();
          }}
          aria-hidden="true"
        >
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
});
