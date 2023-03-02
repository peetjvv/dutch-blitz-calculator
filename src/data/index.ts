import { debounce } from 'lodash';
import { createContext, Reducer, useContext } from 'react';
import { isState } from '../types/reducer';
import { throwIfNotNever } from '../util/typescript';
import {
  defaultState as GameInfoDefaultState,
  GameInfoAction,
  GameInfoState,
  reducer as GameInfoReducer,
} from './game-info';
import {
  defaultState as ScoresDefaultState,
  reducer as ScoresReducer,
  ScoresAction,
  ScoresState,
} from './scores';

const LOCAL_STORAGE_KEY = 'persistedState';

export type State = {
  gameInfo: GameInfoState;
  scores: ScoresState;
};

const defaultState: State = {
  gameInfo: GameInfoDefaultState,
  scores: ScoresDefaultState,
};

export const getInitialState = (): State => {
  // check localStorage
  const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!!localStorageValue) {
    const parsedLocalStorage = JSON.parse(localStorageValue);

    if (isState(parsedLocalStorage)) {
      return parsedLocalStorage;
    }
  }

  // fallback to default state
  return defaultState;
};

export type AllActions = GameInfoAction | ScoresAction;

export type Dispatch = React.Dispatch<AllActions>;

export type Store = { state: State; dispatch: Dispatch };

export const combinedReducer: Reducer<State, AllActions> = (state, action) => {
  let nextState: State;
  switch (action.type) {
    case 'GAME_INFO':
      nextState = {
        ...state,
        gameInfo: GameInfoReducer(state.gameInfo, action),
      };
      break;

    case 'SCORES':
      nextState = {
        ...state,
        scores: ScoresReducer(state.scores, action),
      };
      break;

    default:
      throwIfNotNever(action);
      return state;
  }

  debounce(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
  }, 1000)();

  return nextState;
};

export const reducerContext = createContext<Store>({
  state: defaultState,
  dispatch: () => null,
});

const createStoreHook = () => () => useContext(reducerContext);
export const useStore: () => Store = createStoreHook();

const createDispatchHook = () => () => useStore().dispatch;
export const useDispatch: () => Dispatch = createDispatchHook();
