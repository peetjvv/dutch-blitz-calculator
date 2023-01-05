import { Reducer } from 'react';
import { PayloadAction } from '../types/reducer';
import { throwIfNotNever } from '../util/typescript';

type PlayerInfo = { id: string; name?: string };

export type GameInfoState = {
  targetScore: number;
  players: { [playerId: string]: PlayerInfo };
};

export type SetTargetScoreAction = PayloadAction<
  'GAME_INFO',
  'SET_TARGET_SCORE',
  number
>;

export type SetPlayerNameAction = PayloadAction<
  'GAME_INFO',
  'SET_PLAYER_NAME_ACTION',
  { playerId: string; name: string }
>;

export type GameInfoAction = SetTargetScoreAction | SetPlayerNameAction;

export const defaultState: GameInfoState = { targetScore: 75, players: {} };

export const reducer: Reducer<GameInfoState, GameInfoAction> = (
  prevState,
  action
) => {
  switch (action.subType) {
    case 'SET_TARGET_SCORE':
      return { ...prevState, targetScore: action.payload };

    case 'SET_PLAYER_NAME_ACTION': {
      const { playerId, name } = action.payload;

      return {
        ...prevState,
        players: {
          ...prevState.players,
          [playerId]: {
            ...(prevState.players[playerId] || { playerId }),
            name,
          },
        },
      };
    }

    default:
      throwIfNotNever(action);
      return prevState;
  }
};
