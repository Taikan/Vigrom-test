import { combine, declareAtom } from "@reatom/core";
import {
  setCurrentPath,
  setHistoryIndex,
  setHistoryIsWalk,
  setHistoryList
} from "./actions";

export const historyListAtom = declareAtom<string[]>(['historyListAtom'], [], on => [
  on(setHistoryList, (state, value) => value)
]);

export const historyIndexAtom = declareAtom<number>(['historyIndexAtom'], -1, on => [
  on(setHistoryIndex, (state, value) => value)
]);

export const historyIsWalkingAtom = declareAtom<boolean>(['historyIsWalkingAtom'], false, on => [
  on(setHistoryIsWalk, (state, value) => value)
]);

export const currentPathAtom = declareAtom<string | null>(['currentPathAtom'], null, on => [
  on(setCurrentPath, (state, value) => value)
]);

export const historyAtom = combine(['historyAtom'], {
  isWalking: historyIsWalkingAtom,
  list: historyListAtom,
  index: historyIndexAtom,
  path: currentPathAtom
});
