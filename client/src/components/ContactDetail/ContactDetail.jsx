import React, { memo } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import './ContactDetail.scss';

export const ContactDetail = memo(() => {
  const { selectedContact } = useContacts();

  return (
    <div className="detail">
      <img
        src={selectedContact.img}
        alt="contact img"
        className="detail__img"
      />
      <div className="detail__inf">
        <h2 className="detail__name">{selectedContact.name}</h2>
        {selectedContact.description && (
          <p className="detail__description">
            {selectedContact.description}
          </p>
        )}
      </div>
    </div>
  );
});
