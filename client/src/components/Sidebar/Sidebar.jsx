import React from 'react';
import { ContactList } from '../ContactList';
import './Sidebar.scss';

export const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__controlers">
      <button
        type="button"
        className="sidebar__button sidebar__button--active"
      >
        Online
      </button>
      <button
        type="button"
        className="sidebar__button"
      >
        All
      </button>
    </div>

    <div className="sidebar__chats">
      <ContactList />
    </div>

    <input
      type="text"
      className="sidebar__search"
      placeholder="Search..."
    />
  </div>
);
