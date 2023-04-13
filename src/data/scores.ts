import { Reducer, useMemo } from 'react';
import { useStore } from '.';
import { Action, PayloadAction } from '../types/reducer';
import { throwIfNotNever } from '../util/typescript';

type RoundScores = {
  [playerId: string]: {
    cardsInBlitzCount?: number;
    cardsPlayedCount?: number;
  };
};
export type ScoresState = RoundScores[];

export type SetPlayerRoundCardsInBlitzCountAction = PayloadAction<
  'SCORES',
  'SET_PLAYER_ROUND_CARDS_IN_BLITZ',
  {
    roundIdx: number;
    playerId: string;
    cardsInBlitzCount: number;
  }
>;

export type SetPlayerRoundCardsPlayedCountAction = PayloadAction<
  'SCORES',
  'SET_PLAYER_ROUND_CARDS_PLAYED',
  {
    roundIdx: number;
    playerId: string;
    cardsPlayedCount: number;
  }
>;

export type ResetScoresStateAction = Action<'SCORES', 'RESET'>;

export type ScoresAction =
  | SetPlayerRoundCardsInBlitzCountAction
  | SetPlayerRoundCardsPlayedCountAction
  | ResetScoresStateAction;

export const defaultState: ScoresState = [];

export const reducer: Reducer<ScoresState, ScoresAction> = (
  prevState,
  action
) => {
  switch (action.subType) {
    case 'SET_PLAYER_ROUND_CARDS_IN_BLITZ': {
      const { playerId, roundIdx, cardsInBlitzCount } = action.payload;

      if (roundIdx < 0) {
        throw Error(
          `Expected non-negative roundIdx, but received '${roundIdx}'`
        );
      }
      if (cardsInBlitzCount < 0) {
        throw Error(
          `Expected non-negative cardsInBlitzCount, but received '${cardsInBlitzCount}'`
        );
      }

      const nextState: ScoresState = prevState.reduce((agg, curr, idx) => {
        if (idx === roundIdx) {
          if (!agg[roundIdx]) {
            agg[roundIdx] = {};
          }
          if (!agg[roundIdx][playerId]) {
            agg[roundIdx][playerId] = {};
          }
          agg[roundIdx][playerId] = {
            ...agg[roundIdx][playerId],
            cardsInBlitzCount,
          };
        }
        return agg;
      }, prevState);

      return nextState;
    }

    case 'SET_PLAYER_ROUND_CARDS_PLAYED': {
      const { playerId, roundIdx, cardsPlayedCount } = action.payload;

      if (roundIdx < 0) {
        throw Error(
          `Expected non-negative roundIdx, but received '${roundIdx}'`
        );
      }
      if (cardsPlayedCount < 0) {
        throw Error(
          `Expected non-negative cardsPlayedCount, but received '${cardsPlayedCount}'`
        );
      }

      const nextState: ScoresState = prevState.reduce((agg, curr, idx) => {
        if (idx === roundIdx) {
          if (!agg[roundIdx]) {
            agg[roundIdx] = {};
          }
          if (!agg[roundIdx][playerId]) {
            agg[roundIdx][playerId] = {};
          }
          agg[roundIdx][playerId] = {
            ...agg[roundIdx][playerId],
            cardsPlayedCount,
          };
        }
        return agg;
      }, prevState);

      return nextState;
    }

    case 'RESET':
      return defaultState;

    default:
      throwIfNotNever(action);
      return prevState;
  }
};

export const usePlayerCurrentScore = (playerId: string) => {
  const { state } = useStore();

  const scoreForPlayer = useMemo(
    () =>
      state.scores.reduce((agg, curr) => {
        agg += (curr[playerId]?.cardsInBlitzCount ?? 0) * -2;
        agg += curr[playerId]?.cardsPlayedCount ?? 0;
        return agg;
      }, 0),
    [state.scores]
  );

  return scoreForPlayer;
};

export const usePlayersCurrentScores = () => {
  const { state } = useStore();

  const scoresPerPlayer = useMemo(
    () =>
      state.scores.reduce<{ [playerId: string]: number }>((agg, curr) => {
        Object.entries(curr).forEach(([playerId, cards]) => {
          if (!agg[playerId]) {
            agg[playerId] = 0;
          }
          agg[playerId] += (cards.cardsInBlitzCount ?? 0) * -2;
          agg[playerId] += cards.cardsPlayedCount ?? 0;
        });

        return agg;
      }, {}),
    [state.scores]
  );

  return scoresPerPlayer;
};
