import * as React from 'react';
import { memo } from 'react';
import { useStore } from '../../data';
import { usePlayersCurrentScores } from '../../data/scores';

const ScoresOverview: React.FC = () => {
  const { state } = useStore();

  const scoresPerPlayer = usePlayersCurrentScores();

  return (
    <div>
      ScoresOverview: {JSON.stringify(state.scores)},{' '}
      {JSON.stringify(scoresPerPlayer)}
    </div>
  );
};

export default memo(ScoresOverview);
