import React, { useState, useMemo, useCallback, memo } from 'react';

import { useContacts } from '../../contexts/ContactsProvider';

import { ContactList } from '../ContactList';
import { SidebarControlers } from '../SidebarControlers/SidebarControlers';
import { isIncludeSubstring } from '../../helpers/isIncludeSubstring';

import './Sidebar.scss';

export const Sidebar = memo(({ hideSidebar }) => {
  const [visibleValue, setVisibleValue] = useState('online');
  const [searchValue, setSearchValue] = useState('');
  const { contacts } = useContacts();

  const showContacts = useMemo(() => {
    if (visibleValue === 'all') {
      return contacts
        .filter(({ name }) => isIncludeSubstring(name, searchValue));
    }

    return contacts.filter(({ name, isOnline }) => isOnline
      && isIncludeSubstring(name, searchValue));
  }, [visibleValue, contacts, isIncludeSubstring, searchValue]);

  const handleChange = useCallback(({ target }) => {
    setSearchValue(target.value);
  }, [setSearchValue]);

  return (
    <div className="sidebar">
      <div className="sidebar__controlers">
        <SidebarControlers
          visibleValue={visibleValue}
          onClick={setVisibleValue}
        />
      </div>

      <div className="sidebar__chats">
        <ContactList
          contacts={showContacts}
          hideSidebar={hideSidebar}
        />
      </div>

      <input
        type="text"
        className="sidebar__search"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
});
