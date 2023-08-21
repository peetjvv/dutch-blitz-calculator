import * as React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../data';
import { usePlayersCurrentScores } from '../../data/scores';

const Players: React.FC = () => {
  const { state } = useStore();

  const playerScores = usePlayersCurrentScores();

  return (
    <main>
      <h1>Players</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Current score</th>
          </tr>
        </thead>

        <tbody>
          {/* TODO: sort alphabetically by name */}
          {Object.values(state.gameInfo.players).map((player, idx) => (
            <tr key={idx}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{playerScores[player.id] ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <NavLink type="button" to="/players/new">
        Create new player
      </NavLink>
    </main>
  );
};

export default memo(Players);
