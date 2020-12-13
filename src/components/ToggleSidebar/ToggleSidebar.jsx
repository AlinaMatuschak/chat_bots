import React, { memo } from 'react';
import './ToggleSidebar.scss';

export const ToggleSidebar = memo(({ isVisibleSideble, handleClick }) => (
  <button
    className="toggle-sidebar"
    type="button"
    onClick={handleClick}
  >
    {!isVisibleSideble && (
      <img
        src="https://img.icons8.com/color/48/4a90e2/menu--v5.png"
        alt="menu icon"
        className="toggle-sidebar__img"
      />
    )
    }
  </button>
));
