import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import './SidebarControlers.scss';

export const SidebarControlers = memo(({ visibleValue, onClick }) => {
  const handleClick = useCallback(({ target }) => {
    onClick(target.value);
  }, [onClick]);

  return (
    <div className="sidebar-controlers">
      <button
        type="button"
        value="online"
        className={classNames('sidebar-controlers__button', {
          'sidebar-controlers__button--active': visibleValue === 'online',
        })}
        onClick={handleClick}
      >
        Online
      </button>
      <button
        type="button"
        value="all"
        className={classNames('sidebar-controlers__button', {
          'sidebar-controlers__button--active': visibleValue === 'all',
        })}
        onClick={handleClick}
      >
        All
      </button>
    </div>
  );
});
