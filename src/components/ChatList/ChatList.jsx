import React from 'react';
import './ChatList.scss';

export const ChatList = () => (
  <div className="chat-list">
    <div className="chat-list__controlers">
      <button
        type="button"
        className="chat-list__button chat-list__button--active"
      >
        Online
      </button>
      <button
        type="button"
        className="chat-list__button"
      >
        All
      </button>
    </div>

    <div className="chat-list__chats">
      chat
    </div>

    <input
      type="text"
      className="chat-list__search"
      placeholder="Search..."
    />
  </div>
);
