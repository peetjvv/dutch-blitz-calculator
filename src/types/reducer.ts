import { State } from '../data';

export type Action<T extends string, ST extends string> = {
  type: T;
  subType: ST;
};

export type PayloadAction<T extends string, ST extends string, P> = Action<
  T,
  ST
> & { payload: Readonly<P> };

export const isState = (v: unknown): v is State =>
  !!v && typeof v === 'object' && 'gameInfo' in v && 'scores' in v;
