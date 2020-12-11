import React, { useState, useMemo, useCallback } from 'react';
import { useContacts } from '../../contexts/ContactsProvider';
import { isIncludeSubstring } from '../../helpers/isIncludeSubstring';
import { ContactList } from '../ContactList';
import { SidebarControlers } from '../SidebarControlers/SidebarControlers';
import './Sidebar.scss';

export const Sidebar = () => {
  const [visibleValue, setVisibleValue] = useState('online');
  const [searchValue, setSearchValue] = useState('');
  const { contacts } = useContacts();
  const showContacts = useMemo(() => {
    if (visibleValue === 'all') {
      return contacts
        .filter(({ name, description }) => isIncludeSubstring(name, searchValue)
          || isIncludeSubstring(description || '', searchValue));
    }

    return contacts.filter(({ name, description, isOnline }) => isOnline && (
      isIncludeSubstring(name, searchValue)
      || isIncludeSubstring(description || '', searchValue)
    ));
  }, [visibleValue, contacts, isIncludeSubstring, searchValue]);

  const handleChange = useCallback(({ target }) => {
    setSearchValue(target.value);
  }, [setSearchValue]);

  return (
    <div className="sidebar">
      <SidebarControlers
        visibleValue={visibleValue}
        onClick={setVisibleValue}
      />

      <div className="sidebar__chats">
        <ContactList contacts={showContacts} />
      </div>

      <input
        type="text"
        className="sidebar__search"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
};
