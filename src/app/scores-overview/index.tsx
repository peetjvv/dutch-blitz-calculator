import * as React from 'react';
import { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../data';
import { usePlayers } from '../../data/game-info';
import { usePlayersCurrentScores } from '../../data/scores';

const ScoresOverview: React.FC = () => {
  const { state } = useStore();

  const playersById = usePlayers();
  const scoresPerPlayer = usePlayersCurrentScores();

  const players = useMemo(
    () =>
      Object.values(playersById).sort((a, b) =>
        (a.name || a.id) < (b.name || b.id) ? -1 : 1
      ),
    [playersById]
  );

  return (
    <div>
      <h1>Scores</h1>

      <table>
        <thead>
          <tr>
            <th>Player</th>
            {players.map((player, idx) => (
              <th key={idx}>{player.name || <em>{player.id}</em>}</th>
            ))}
          </tr>
          <tr>
            <th>Total</th>
            {players.map((player, idx) => (
              <th key={idx}>{scoresPerPlayer[player.id]}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {state.scores.map((roundScores, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td>Round {idx + 1}</td>
              </tr>
              <tr>
                <td>Blitz pile</td>
                {players.map((player, idx2) => (
                  <td key={idx2}>
                    {roundScores[player.id]?.cardsInBlitzCount !== undefined
                      ? `${roundScores[player.id].cardsInBlitzCount} (${
                          roundScores[player.id].cardsInBlitzCount! * -2
                        })`
                      : null}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Played</td>
                {players.map((player, idx2) => (
                  <td key={idx2}>
                    {roundScores[player.id]?.cardsPlayedCount || null}
                  </td>
                ))}
              </tr>
              <tr>
                <td />
                {players.map((player, idx2) => (
                  <td key={idx2}>
                    <NavLink to={`/scores/${idx}/${player.id}`}>Edit</NavLink>
                  </td>
                ))}
              </tr>

              {/* empty row after each round */}
              <tr />
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {!!players.length ? (
        <NavLink to={`/scores/${state.scores.length}/${players[0].id}`}>
          Add round
        </NavLink>
      ) : null}
    </div>
  );
};

export default memo(ScoresOverview);
