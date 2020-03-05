import { History, Location } from "history";
import { match, Match } from "path-to-regexp";
import { createStore, declareAction, declareAtom } from "@reatom/core";
import { Store } from "@reatom/core/build/createStore";
import { ComponentConstructor } from "./Component";

const changeLocation = declareAction<Location>();
const locationAtom = declareAtom<Location | null>(null, on => [
  on(changeLocation, (state, value) => {
    return value;
  })
]);

export type RouteProps = {
  history: History;
  location: Location;
  match: Match;
};

export type RouteConstructor<
  P extends RouteProps = RouteProps
> = ComponentConstructor<P>;

export type RoutesMap = { [path: string]: RouteConstructor };

const matchPath = (pathname: string, path: string) => {
  const matcher = match(path);
  return matcher(pathname);
};

export class Router {
  protected store: Store;

  constructor(
    protected root: HTMLElement,
    protected history: History,
    protected routes: RoutesMap
  ) {
    const store = createStore(locationAtom);
    this.store = store;

    store.subscribe(locationAtom, () => {
      this.updater();
    });

    this.history.listen(location => {
      store.dispatch(changeLocation(location));
    });
    store.dispatch(changeLocation(this.history.location));
  }

  protected updater() {
    const location = this.store.getState(locationAtom);
    if (!location) {
      return;
    }
    let match: Match<object> = false;
    let MatchRoute: RouteConstructor | undefined;
    Object.entries(this.routes).forEach(([path, Route]) => {
      if (!MatchRoute) {
        match = matchPath(location.pathname, path);
        if (match) {
          MatchRoute = Route;
        }
      }
    });

    if (MatchRoute && match) {
      const page = new MatchRoute({ location, match, history: this.history });
      page.renderToDom(this.root);
    }
  }
}
