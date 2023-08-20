import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../data';
import { usePlayer } from '../../data/game-info';
import { usePlayerRoundScore } from '../../data/scores';

const PlayerRoundScore: React.FC = () => {
  const params = useParams();
  const { dispatch } = useStore();

  const { roundIdx, playerId } = params;
  if (roundIdx === undefined || !playerId) {
    // TODO: what if roundIdx param string is not only a number
    throw new Error(`One or more params not defined`);
  }

  const player = usePlayer(playerId);
  const roundScore = usePlayerRoundScore(+roundIdx, playerId);

  return (
    <div>
      <h1>
        {player.name || `Player: ${player.id}`} - Round {+roundIdx + 1}
      </h1>

      <label>
        Cards in blitz pile
        <input
          type="number"
          value={roundScore?.cardsInBlitzCount}
          onChange={e => {
            if (+e.target.value >= 0) {
              dispatch({
                type: 'SCORES',
                subType: 'SET_PLAYER_ROUND_CARDS_IN_BLITZ',
                payload: {
                  roundIdx: +roundIdx,
                  playerId,
                  cardsInBlitzCount: +e.target.value,
                },
              });
            }
          }}
        />
      </label>

      <label>
        Blitz score
        <input
          type="number"
          value={(roundScore?.cardsInBlitzCount || 0) * -2}
          onChange={e => {
            if (+e.target.value <= 0) {
              dispatch({
                type: 'SCORES',
                subType: 'SET_PLAYER_ROUND_CARDS_IN_BLITZ',
                payload: {
                  roundIdx: +roundIdx,
                  playerId,
                  // TODO: what if odd number is entered?
                  cardsInBlitzCount: +e.target.value / -2,
                },
              });
            }
          }}
        />
      </label>

      <label>
        Cards played
        <input
          type="number"
          value={roundScore?.cardsPlayedCount}
          onChange={e => {
            if (+e.target.value >= 0) {
              dispatch({
                type: 'SCORES',
                subType: 'SET_PLAYER_ROUND_CARDS_PLAYED',
                payload: {
                  roundIdx: +roundIdx,
                  playerId,
                  cardsPlayedCount: +e.target.value,
                },
              });
            }
          }}
        />
      </label>
    </div>
  );
};

export default PlayerRoundScore;
