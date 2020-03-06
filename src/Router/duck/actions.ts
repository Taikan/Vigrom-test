import { declareAction } from "@reatom/core";

export const setCurrentPath = declareAction<string, 'setCurrentPath'>(['setCurrentPath']);
export const setHistoryList = declareAction<string[], 'setHistoryList'>(['setHistoryList']);
export const setHistoryIndex = declareAction<number, 'setHistoryIndex'>(['setHistoryIndex']);
export const setHistoryIsWalk = declareAction<boolean, 'setHistoryIsWalk'>(['setHistoryIsWalk']);
