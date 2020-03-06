import { declareAction } from "@reatom/core";
import { HistoryWalkType } from "../enums";
import {
  setCurrentPath,
  setHistoryIndex,
  setHistoryIsWalk,
  setHistoryList
} from "./actions";
import {
  historyIndexAtom,
  historyIsWalkingAtom,
  historyListAtom
} from "./atoms";
import { addSlash, setHashPath, replaceHashPath } from "../utils";
import { MAX_HISTORY_LENGTH } from "../config";

export const historyWalk = declareAction<HistoryWalkType>(
  (type, { dispatch, getState }) => {
    let newIndex = getState(historyIndexAtom);

    if (type === HistoryWalkType.PREV) {
      newIndex--;
    } else {
      newIndex++;
    }

    let list = getState(historyListAtom);
    if (list[newIndex]) {
      dispatch(setHistoryIsWalk(true));
      dispatch(setHistoryIndex(newIndex));
      setHashPath(list[newIndex]);
    }
  }
);

export const hashChange = declareAction<string>(
  (path, { dispatch, getState }) => {
    const normalizePath = addSlash(path);

    if (path !== normalizePath) {
      replaceHashPath(normalizePath);
      return;
    }

    if (getState(historyIsWalkingAtom)) {
      dispatch(setHistoryIsWalk(false));
      dispatch(setCurrentPath(path));
      return;
    }

    let index = getState(historyIndexAtom);
    let list = getState(historyListAtom);
    const newList = [...list.slice(0, index + 1), path];

    dispatch(
      setHistoryList(
        newList.length > MAX_HISTORY_LENGTH
          ? newList.slice(-MAX_HISTORY_LENGTH)
          : newList
      )
    );
    dispatch(
      setHistoryIndex(
        index < MAX_HISTORY_LENGTH - 1 ? index + 1 : MAX_HISTORY_LENGTH - 1
      )
    );
    dispatch(setCurrentPath(path));
  }
);
