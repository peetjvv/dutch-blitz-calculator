import * as React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<{ direction: 'vertical' | 'horizontal' }> = props => {
  const { direction } = props;

  return (
    <div>
      <div>
        <NavLink to="/scores-overview">Scores</NavLink>
      </div>
      <div>
        <NavLink to="/players">Players</NavLink>
      </div>
      <div>
        <NavLink to="/settings">Settings</NavLink>
      </div>
    </div>
  );
};

export default memo(NavBar);
