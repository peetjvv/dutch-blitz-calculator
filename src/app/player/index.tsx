import * as React from 'react';
import { memo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../data';
import { usePlayer } from '../../data/game-info';
import { usePlayerCurrentScore } from '../../data/scores';
import { getNewId } from '../../util/random';

const Player: React.FC<{ creatingNewPlayer: boolean }> = props => {
  const { creatingNewPlayer } = props;
  const params = useParams();
  const { dispatch } = useStore();

  const playerIdRef = useRef(creatingNewPlayer ? getNewId() : params.playerId);
  const playerId = playerIdRef.current;
  if (!playerId) {
    throw new Error(`playerId is not defined`);
  }

  const player = usePlayer(playerId);
  const currentScore = usePlayerCurrentScore(playerId);

  return (
    <div>
      <h1>{creatingNewPlayer ? 'New Player' : 'Player'}</h1>
      <label>
        Name
        <input
          type="text"
          value={player.name ?? ''}
          onChange={e =>
            dispatch({
              type: 'GAME_INFO',
              subType: 'SET_PLAYER_NAME_ACTION',
              payload: { playerId, name: e.target.value },
            })
          }
        />
      </label>
      {JSON.stringify(player)} - {currentScore}
    </div>
  );
};

export default memo(Player);
