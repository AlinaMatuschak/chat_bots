import React, { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { useContacts } from '../../contexts/ContactsProvider';
import { Chat } from '../Chat/Chat';
import { Sidebar } from '../Sidebar';
import { ToggleSidebar } from '../ToggleSidebar/ToggleSidebar';
import './Messager.scss';

export const Messager = memo(({ user }) => {
  const { selectedContact } = useContacts();
  const [isVisibleSideble, setIsVisibleSideble] = useState(true);

  const handleClick = useCallback(() => {
    setIsVisibleSideble(currentValue => !currentValue);
  }, [setIsVisibleSideble]);

  return (
    <div className="messager">
      {selectedContact && (
        <div className="messager__toggle-sidebar">
          <ToggleSidebar
            isVisibleSideble={isVisibleSideble}
            handleClick={handleClick}
          />
        </div>
      )}

      <div className="messager__chat-wrp">
        {selectedContact
          && <Chat user={user} />}
      </div>

      <div
        className={classNames('messager__sidebar-wrp', {
          'messager__sidebar-wrp--visible': isVisibleSideble,
        })}
      >
        <Sidebar hideSidebar={handleClick} />
      </div>
    </div>
  );
});
