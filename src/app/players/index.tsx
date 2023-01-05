import * as React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../data';

const Players: React.FC = () => {
  const { state } = useStore();

  return (
    <div>
      <h1>Players</h1>
      {JSON.stringify(state.gameInfo.players)}
      <NavLink to="/players/new">Create new player</NavLink>
    </div>
  );
};

export default memo(Players);
