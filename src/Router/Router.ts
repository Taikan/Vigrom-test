import { Match } from "path-to-regexp";
import { createStore } from "@reatom/core";
import { connectReduxDevtools } from "@reatom/debug";
import { Store } from "@reatom/core/build/createStore";
import { ComponentConstructor } from "../View/Component";
import { currentPathAtom, historyAtom, historyListAtom } from "./duck/atoms";
import { getHashPath, matchPath } from "./utils";
import { hashChange, historyWalk } from "./duck/effects";
import { HistoryWalkType } from "./enums";

export type RouteProps = {
  match: Match;
  back: () => void;
  forward: () => void;
};

export type RouteConstructor<
  P extends RouteProps = RouteProps
> = ComponentConstructor<P>;

export type RoutesMap = { [path: string]: RouteConstructor };

export type DebugProps = {
  list: string[];
  index: number;
  path: string | null;
  back: () => void;
  forward: () => void;
};

export class Router {
  protected store: Store;

  protected debug?: {
    root: HTMLElement;
    component: ComponentConstructor<DebugProps>;
  };

  constructor(protected root: HTMLElement, protected routes: RoutesMap) {
    const store = createStore(historyAtom);
    this.store = store;
    connectReduxDevtools(store);

    window.addEventListener("hashchange", () => {
      store.dispatch(hashChange(getHashPath()));
    });

    store.subscribe(currentPathAtom, () => {
      this.updater();
    });
    store.subscribe(historyAtom, () => {
      this.debugRender();
    });

    store.dispatch(hashChange(getHashPath()));

    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
  }

  public setDebugComponent(root, component) {
    this.debug = { root, component };
    this.debugRender();
  }

  public back() {
    this.store.dispatch(historyWalk(HistoryWalkType.PREV));
  }

  public forward() {
    this.store.dispatch(historyWalk(HistoryWalkType.NEXT));
  }

  protected updater() {
    const pathname = this.store.getState(currentPathAtom);
    if (!pathname) {
      return;
    }

    let match: Match<object> = false;
    let MatchRoute: RouteConstructor | undefined;

    Object.entries(this.routes).forEach(([path, Route]) => {
      if (!MatchRoute) {
        match = matchPath(pathname, path);
        if (match) {
          MatchRoute = Route;
        }
      }
    });

    if (MatchRoute && match) {
      const page = new MatchRoute({
        match,
        back: this.back,
        forward: this.forward
      });
      page.renderToDom(this.root);
    }
  }

  protected debugRender() {
    if (this.debug) {
      const debug = new this.debug.component({
        ...this.store.getState(historyAtom),
        back: this.back,
        forward: this.forward
      });
      debug.renderToDom(this.debug.root);
    }
  }
}
