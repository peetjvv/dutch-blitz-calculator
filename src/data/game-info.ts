import { Reducer } from 'react';
import { useStore } from '.';
import { Action, PayloadAction } from '../types/reducer';
import { throwIfNotNever } from '../util/typescript';

type PlayerInfo = { id: string; name?: string };

export type GameInfoState = {
  hasVisitedSettingsPage: boolean;
  targetScore: number;
  players: { [playerId: string]: PlayerInfo };
};

export type SetHasVisitedSettingsPageAction = PayloadAction<
  'GAME_INFO',
  'SET_HAS_VISITED_SETTINGS_PAGE',
  boolean
>;

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

export type ResetGameInfoStateAction = Action<'GAME_INFO', 'RESET'>;

export type GameInfoAction =
  | SetHasVisitedSettingsPageAction
  | SetTargetScoreAction
  | SetPlayerNameAction
  | ResetGameInfoStateAction;

export const defaultState: GameInfoState = {
  targetScore: 75,
  players: {},
  hasVisitedSettingsPage: false,
};

export const reducer: Reducer<GameInfoState, GameInfoAction> = (
  prevState,
  action
) => {
  switch (action.subType) {
    case 'SET_HAS_VISITED_SETTINGS_PAGE':
      return { ...prevState, hasVisitedSettingsPage: action.payload };

    case 'SET_TARGET_SCORE':
      return { ...prevState, targetScore: action.payload };

    case 'SET_PLAYER_NAME_ACTION': {
      const { playerId, name } = action.payload;

      return {
        ...prevState,
        players: {
          ...prevState.players,
          [playerId]: {
            id: playerId,
            name,
          },
        },
      };
    }

    case 'RESET':
      return defaultState;

    default:
      throwIfNotNever(action);
      return prevState;
  }
};

export const usePlayer = (playerId: string): PlayerInfo => {
  const { state } = useStore();

  return state.gameInfo.players[playerId] || { id: playerId };
};

export const usePlayers = (): { [playerId: string]: PlayerInfo } => {
  const { state } = useStore();

  return state.gameInfo.players;
};
