import * as React from 'react';
import { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../data';

const Settings: React.FC = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    if (!state.gameInfo.hasVisitedSettingsPage) {
      dispatch({
        type: 'GAME_INFO',
        subType: 'SET_HAS_VISITED_SETTINGS_PAGE',
        payload: true,
      });
    }
  }, []);

  return (
    <div>
      <h1>Settings</h1>

      <label>
        Target score
        <input
          type="number"
          min={0}
          step={1}
          value={state.gameInfo.targetScore}
          onChange={e =>
            dispatch({
              type: 'GAME_INFO',
              subType: 'SET_TARGET_SCORE',
              payload: Number(e.target.value),
            })
          }
        />
      </label>

      <NavLink to="/players">Edit players</NavLink>
      <NavLink to="/players/new">Create new player</NavLink>
    </div>
  );
};

export default memo(Settings);
