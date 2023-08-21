import * as React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/scores-overview">Scores</NavLink>

      <NavLink to="/players">Players</NavLink>

      <NavLink to="/settings">Settings</NavLink>
    </div>
  );
};

export default memo(NavBar);
