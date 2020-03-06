import { combine, declareAtom } from "@reatom/core";
import {
  setCurrentPath,
  setHistoryIndex,
  setHistoryIsWalk,
  setHistoryList
} from "./actions";

export const historyListAtom = declareAtom<string[]>([], on => [
  on(setHistoryList, (state, value) => value)
]);

export const historyIndexAtom = declareAtom<number>(-1, on => [
  on(setHistoryIndex, (state, value) => value)
]);

export const historyIsWalkingAtom = declareAtom<boolean>(false, on => [
  on(setHistoryIsWalk, (state, value) => value)
]);

export const currentPathAtom = declareAtom<string | null>(null, on => [
  on(setCurrentPath, (state, value) => {
    return value;
  })
]);

export const historyAtom = combine({
  isWalking: historyIsWalkingAtom,
  list: historyListAtom,
  index: historyIndexAtom,
  path: currentPathAtom
});
