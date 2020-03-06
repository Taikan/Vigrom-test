import { declareAction } from "@reatom/core";

export const setCurrentPath = declareAction<string>();
export const setHistoryList = declareAction<string[]>();
export const setHistoryIndex = declareAction<number>();
export const setHistoryIsWalk = declareAction<boolean>();
