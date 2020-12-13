import React, { memo } from 'react';
import { getFirstSymbols } from '../../helpers/getFirstSymbols';
import './Contact.scss';

export const Contact = memo(({ contact }) => {
  const { name, img, description, isOnline } = contact;

  return (
    <div className="contact">
      <div className="contact__img-wrp">
        <img
          src={img}
          alt="user icon"
          className="contact__img"
        />
        {isOnline && <span className="contact__online" />}
      </div>

      <div className="contact__inf">
        <p className="contact__name">{name}</p>
        {description && (
          <span className="contact__description">
            {getFirstSymbols(description)}
          </span>
        )}
      </div>
    </div>
  );
});
